import SectionHeading from "@/components/SectionHeading";

const coreTech = [
  "Flutter",
  "Dart",
  "Firebase",
  "REST APIs",
  "WebSockets",
  "Google Maps",
  "Payment Integrations",
  "Push Notifications",
  "Riverpod",
  "FastAPI",
  "Machine Learning",
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
        I am a Flutter developer with professional experience shipping real-world mobile apps across
        booking, social, real-time, and fintech product domains. I also work across backend and AI
        layers when a project needs a more complete product stack.
      </p>

      <p className="reveal" style={{ marginTop: 14, animationDelay: "0.1s" }}>
        My recent work includes Firebase-powered live features, map-based flows, payment handling,
        Riverpod state management, FastAPI services, machine learning workflows, and custom NLP logic
        for expense prediction and classification. I care deeply about writing maintainable code and
        improving user experience through small interaction details.
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
