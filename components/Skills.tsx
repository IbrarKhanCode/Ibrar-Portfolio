import SectionHeading from "@/components/SectionHeading";

const groups = [
  {
    title: "Mobile Core",
    items: ["Flutter", "Dart", "Firebase", "REST APIs", "Riverpod"],
  },
  {
    title: "Backend & Data",
    items: ["FastAPI", "Machine Learning", "NLP", "Docker", "Hugging Face Spaces"],
  },
  {
    title: "Product Features",
    items: ["Real-Time Chat", "Maps", "Payments", "Charts", "Localization"],
  },
  {
    title: "Delivery Workflow",
    items: ["Git", "Postman", "Debugging", "Performance Tuning", "Team Delivery"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="content-section">
      <SectionHeading
        index="04"
        title="Skills"
        eyebrow="Tools and capabilities"
        description="The mobile, backend, data, and delivery stack I use to build and ship full product experiences."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 14,
        }}
      >
        {groups.map((group, index) => (
          <article
            key={group.title}
            className="card-surface stack-item reveal-scale"
            style={{ animationDelay: `${0.04 + index * 0.1}s` }}
          >
            <h3 style={{ fontSize: 16, marginBottom: 12 }}>{group.title}</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {group.items.map((item) => (
                <span key={item} className="badge">
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
