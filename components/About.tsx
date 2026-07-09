import SectionHeading from "@/components/SectionHeading";

const coreTech = [
  "Flutter",
  "Dart",
  "Riverpod",
  "Firebase",
  "Kotlin",
  "Jetpack Compose",
  "Hilt",
  "Room",
  "REST APIs",
  "WebSockets",
  "Node.js",
  "Socket.IO",
  "FastAPI",
  "Machine Learning",
  "Flame",
  "Supabase",
  "NLP Workflows",
  "Docker",
];

export default function About() {
  return (
    <section id="about" className="content-section section-content-inset">
      <SectionHeading
        index="01"
        title="About Me"
        eyebrow="A quick introduction"
        description="Flutter developer focused on clean interfaces, reliable delivery, and production-ready mobile experiences across mobile, backend, and data-driven product work."
      />

      <p className="reveal" style={{ animationDelay: "0.04s" }}>
        I&apos;m a Flutter developer with 2+ years of experience shipping production mobile
        apps — covering booking platforms, fintech, and real-time social features. I also
        build backend and real-time infrastructure when a project calls for it: Node.js game
        servers, FastAPI machine learning services, and WebSocket-based systems.
      </p>

      <p className="reveal" style={{ marginTop: 14, animationDelay: "0.1s" }}>
        I care about clean architecture, maintainable code, and the small interaction details
        that make an app feel finished.
      </p>

      <p className="reveal" style={{ marginTop: 14, animationDelay: "0.16s" }}>
        Here are a few technologies and tools I work with frequently:
      </p>

      <ul
        className="reveal"
        style={{
          listStyle: "none",
          marginTop: 18,
          animationDelay: "0.22s",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
          gap: "10px",
        }}
      >
        {coreTech.map((tech) => (
          <li key={tech} className="mono" style={{ fontSize: 13, color: "var(--text-body)" }}>
            <span className="accent" style={{ marginRight: 8 }}>
              ▹
            </span>
            {tech}
          </li>
        ))}
      </ul>
    </section>
  );
}
