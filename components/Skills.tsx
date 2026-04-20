const groups = [
  {
    title: "Core",
    items: ["Flutter", "Dart", "Firebase", "REST APIs", "State Management"],
  },
  {
    title: "Mobile Features",
    items: ["Real-Time Chat", "Maps", "Payments", "Push Notifications", "Localization"],
  },
  {
    title: "Workflow",
    items: ["Git", "Postman", "Debugging", "Performance Tuning", "Team Delivery"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="content-section">
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
