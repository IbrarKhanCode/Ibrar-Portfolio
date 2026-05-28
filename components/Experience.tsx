import SectionHeading from "@/components/SectionHeading";

const experiences = [
  {
    period: "Jan 2026 — Present",
    role: "Flutter Developer",
    company: "ITShifts",
    companyUrl: "https://www.itshifts.com",
    summary:
      "Contributing across multiple projects in a fast-paced client environment, delivering production features under deadline while maintaining quality and stability.",
    points: [
      "Implemented real-time features, payments, localization, and operational dashboards",
      "Worked closely with backend developers to ship reliable API-driven experiences",
      "Delivered cross-project support to help teams hit critical timelines",
    ],
    tech: ["Flutter", "Dart", "REST APIs", "WebSockets", "Payments"],
  },
  {
    period: "Aug 2025 — Dec 2025",
    role: "Flutter Developer",
    company: "Apifiny",
    companyUrl: "https://www.linkedin.com/company/apifinytech/posts/?feedView=all",
    summary:
      "Worked on an AI-powered dating app focused on high-quality UX, feature reliability, and scalable Firebase architecture.",
    points: [
      "Built onboarding and profile flows with polished interaction patterns",
      "Integrated and stabilized Firebase data handling for real-time consistency",
      "Supported liveness and face verification related workflows",
    ],
    tech: ["Flutter", "Firebase", "AI Features", "Real-Time Systems"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="content-section">
      <SectionHeading
        index="02"
        title="Experience"
        eyebrow="Where I’ve shipped work"
        description="A snapshot of the product teams and delivery environments where I’ve contributed as a Flutter developer."
      />

      <ul className="stack-list" aria-label="Work experience entries">
        {experiences.map((item, index) => (
          <li
            key={`${item.company}-${item.period}`}
            className="card-surface stack-item reveal"
            style={{ animationDelay: `${0.06 + index * 0.1}s` }}
          >
            <div className="meta-row">
              <h3 style={{ fontSize: 18 }}>
                {item.role}{" "}
                <span className="accent">
                  @{" "}
                  {item.companyUrl ? (
                    <a
                      href={item.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link"
                    >
                      {item.company}
                    </a>
                  ) : (
                    item.company
                  )}
                </span>
              </h3>
              <span className="meta-period">{item.period}</span>
            </div>

            <p>{item.summary}</p>

            <ul style={{ listStyle: "none", marginTop: 14, display: "grid", gap: 8 }}>
              {item.points.map((point) => (
                <li key={point} style={{ fontSize: 14 }}>
                  <span className="accent" style={{ marginRight: 8 }}>
                    ▹
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {item.tech.map((tech) => (
                <span key={tech} className="badge">
                  {tech}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
