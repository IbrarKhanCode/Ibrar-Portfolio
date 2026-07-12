import Image from "next/image";

export default function Hero() {
  return (
    <section id="home" className="hero-panel" aria-label="Introduction">

      {/* ── Mobile portrait (hidden on desktop via CSS) ── */}
      <div className="hero-portrait-mobile-wrap">
        <div className="hero-portrait-mobile">
          <Image
            src="/ibrar.png"
            alt="Portrait of Muhammad Ibrar"
            width={132}
            height={132}
            sizes="132px"
            loading="eager"
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
      </div>

      {/* ── Heading row with desktop portrait + name ── */}
      <div className="hero-heading-row">
        {/* Desktop portrait card (hidden on mobile via CSS) */}
        <div className="hero-portrait-card" style={{ position: "relative" }}>
          <div style={{ borderRadius: "999px", overflow: "hidden", width: "100%", height: "100%", position: "relative" }}>
            <Image
              src="/ibrar.png"
              alt="Muhammad Ibrar"
              fill
              sizes="(max-width: 1023px) 0px, 132px"
              className="hero-portrait-image"
              loading="eager"
            />
          </div>
        </div>

        <div className="hero-heading-copy">
          <p className="hero-kicker">
            Hi, my name is
          </p>
          <h1 className="hero-title">
            Muhammad Ibrar
          </h1>
        </div>
      </div>

      <p className="hero-subtitle">
        Flutter Developer building real-time, production-grade mobile apps.
      </p>

      <p className="hero-summary">
        I build performant Flutter apps with real-time features, clean architecture, and
        production-ready delivery. Alongside mobile, I build the backend and systems layer
        when a project needs it — from Node.js multiplayer game servers to FastAPI ML services.
      </p>

      <div className="hero-actions">
        <a
          href="/CV/Muhammad%20Ibrar%20Flutter.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-accent"
        >
          View Resume
        </a>
        <a href="#contact" className="btn-outline">
          Get In Touch
        </a>
      </div>


    </section>
  );
}
