import SectionHeading from "@/components/SectionHeading";

const coreTech = [
  "Flutter",
  "Dart",
  "Kotlin",
  "Jetpack Compose",
  "Riverpod",
  "Hilt",
  "Room",
  "Firebase",
  "REST APIs",
  "WebSockets",
  "Node.js",
  "Socket.IO",
  "Flame",
  "Supabase",
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
        I am a mobile, game, and full-stack developer with 2+ years of professional experience
        building and shipping real-world apps across booking, social, fintech, real-time
        multiplayer, and offline networking domains. I also work across backend, real-time, and AI
        layers when a project needs a more complete product stack.
      </p>

      <p className="reveal" style={{ marginTop: 14, animationDelay: "0.1s" }}>
        My recent work spans Firebase-powered live features, map and payment flows, and Riverpod
        state management on mobile, alongside real-time multiplayer netcode with client-side
        prediction, server reconciliation, and snapshot interpolation, BLE mesh routing and packet
        fragmentation, authoritative Flutter + Flame game loops, Node.js match/auth/leaderboard
        services, and FastAPI machine-learning workflows for expense prediction. I care deeply about
        writing maintainable code and improving user experience through small interaction details.
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
