const coreTech = [
  "Flutter",
  "Dart",
  "Firebase",
  "REST APIs",
  "WebSockets",
  "Google Maps",
  "Payment Integrations",
  "Push Notifications",
];

export default function About() {
  return (
    <section id="about" className="content-section">
      <p className="reveal" style={{ animationDelay: "0.04s" }}>
        I am a Flutter developer with professional experience shipping real-world mobile apps across
        booking, social, and real-time product domains. I enjoy building interfaces that are clear,
        fast, and dependable under production load.
      </p>

      <p className="reveal" style={{ marginTop: 14, animationDelay: "0.1s" }}>
        My recent work includes Firebase-powered live features, map-based flows, payment handling,
        multi-role apps, and scalable API-driven architecture. I care deeply about writing maintainable
        code and improving user experience through small interaction details.
      </p>

      <p className="reveal" style={{ marginTop: 14, animationDelay: "0.16s" }}>
        Here are a few technologies I work with frequently:
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
