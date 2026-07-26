/**
 * Full-screen WebGL nebula + starfield backdrop.
 *
 * All motion is computed on the GPU as a function of a single `u_time`
 * uniform — the JS side just ticks a clock and issues one draw call per
 * frame, so this stays cheap and fully decoupled from React state/re-renders
 * elsewhere on the page.
 */

const VERTEX_SRC = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

// GLSL source is kept comment-free and ASCII-only: some shader compilers
// mishandle multi-byte characters even inside "//" comments, which silently
// corrupted rendering here without throwing a JS-visible error. Structure:
// hash21/valueNoise/fbm build layered cloud noise; main() paints a near-black
// base, adds two faint drifting nebula tints masked to fade in only toward
// the edges/corners (so the readable center stays clean), then composites a
// dense, uniformly-sized, independently-twinkling starfield on top via
// max() (so stars never get dimmed by cloud density).
const FRAGMENT_SRC = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    sum += amp * valueNoise(p);
    p *= 2.02;
    amp *= 0.5;
  }
  return sum;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / u_resolution.y;

  vec2 p = uv - 0.5;
  p.x *= aspect;
  p += 0.5;

  vec3 color = vec3(0.02, 0.031, 0.086);

  vec2 vUv = uv - 0.5;
  vUv.x *= aspect;
  float edgeMask = mix(0.35, 1.0, smoothstep(0.05, 0.85, length(vUv)));

  vec2 driftA = p * 1.5 + vec2(u_time * 0.012, -u_time * 0.006);
  float nA = fbm(driftA);
  vec3 cyan = vec3(0.369, 0.918, 0.831) * nA;

  vec2 driftB = p * 1.8 + vec2(-u_time * 0.008, u_time * 0.01) + 47.0;
  float nB = fbm(driftB);
  vec3 purple = vec3(0.545, 0.361, 0.965) * nB;

  color += (cyan * 0.15 + purple * 0.13) * edgeMask;

  vec2 fragPx = gl_FragCoord.xy;
  float cell = 14.0;
  vec2 gridId = floor(fragPx / cell);
  vec2 gridUv = fract(fragPx / cell);

  float starChance = step(0.85, hash21(gridId));
  vec2 starPos = vec2(hash21(gridId + 11.13), hash21(gridId + 91.71));
  float dist = length(gridUv - starPos);
  float starSize = 0.13;

  float speed = mix(1.2, 4.6, hash21(gridId + 5.53));
  float phase = hash21(gridId + 7.77) * 6.2832;
  float twinkle = 0.5 + 0.5 * sin(u_time * speed + phase);
  float brightness = mix(0.28, 0.92, twinkle);

  float core = smoothstep(starSize, 0.0, dist) * starChance * brightness;
  float glow = smoothstep(starSize * 1.8, 0.0, dist) * starChance * brightness * 0.2;
  vec3 starTint = mix(vec3(0.5, 0.78, 0.98), vec3(0.78, 0.93, 1.0), hash21(gridId + 2.21));
  vec3 stars = starTint * (core + glow);

  color = max(color, stars);

  gl_FragColor = vec4(color, 1.0);
}
`;

export interface SpaceBackgroundOptions {
  /** Render one still frame and skip the animation loop (prefers-reduced-motion). */
  staticFrame?: boolean;
  /** Cap devicePixelRatio to keep the fragment shader cost bounded on hi-DPI screens. */
  maxDpr?: number;
}

export class SpaceBackgroundEngine {
  private gl: WebGLRenderingContext;
  private canvas: HTMLCanvasElement;
  private program: WebGLProgram;
  private buffer: WebGLBuffer;
  private resLoc: WebGLUniformLocation | null;
  private timeLoc: WebGLUniformLocation | null;
  private raf = 0;
  private dpr: number;
  private staticFrame: boolean;
  private handleResize = () => this.resize();

  constructor(canvas: HTMLCanvasElement, opts: SpaceBackgroundOptions = {}) {
    this.canvas = canvas;
    this.staticFrame = opts.staticFrame ?? false;
    this.dpr = Math.min(opts.maxDpr ?? 1.75, window.devicePixelRatio || 1);

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    }) as WebGLRenderingContext | null;
    if (!gl) throw new Error("WebGL unavailable");
    this.gl = gl;

    const vs = this.compile(gl.VERTEX_SHADER, VERTEX_SRC);
    const fs = this.compile(gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    const program = gl.createProgram();
    if (!program) throw new Error("Failed to create WebGL program");
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      throw new Error(info ?? "WebGL program link failed");
    }
    gl.useProgram(program);
    this.program = program;

    // A single triangle that overshoots the clip box covers the full
    // viewport with no extra vertices/index buffer.
    const buffer = gl.createBuffer();
    if (!buffer) throw new Error("Failed to create WebGL buffer");
    this.buffer = buffer;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    this.resLoc = gl.getUniformLocation(program, "u_resolution");
    this.timeLoc = gl.getUniformLocation(program, "u_time");

    window.addEventListener("resize", this.handleResize, { passive: true });
    this.resize();
  }

  private compile(type: number, source: string): WebGLShader {
    const gl = this.gl;
    const shader = gl.createShader(type);
    if (!shader) throw new Error("Failed to create WebGL shader");
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(info ?? "WebGL shader compile failed");
    }
    return shader;
  }

  private resize() {
    const w = Math.max(1, Math.round(window.innerWidth * this.dpr));
    const h = Math.max(1, Math.round(window.innerHeight * this.dpr));
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
      this.gl.viewport(0, 0, w, h);
    }
  }

  private draw(t: number) {
    const gl = this.gl;
    gl.uniform2f(this.resLoc, this.canvas.width, this.canvas.height);
    gl.uniform1f(this.timeLoc, t);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  start() {
    if (this.staticFrame) {
      this.draw(0);
      return;
    }
    const startedAt = performance.now();
    const loop = (now: number) => {
      this.draw((now - startedAt) / 1000);
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.handleResize);
    const gl = this.gl;
    gl.deleteBuffer(this.buffer);
    gl.deleteProgram(this.program);
  }
}
