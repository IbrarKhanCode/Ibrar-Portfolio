import SectionHeading from "@/components/SectionHeading";

const groups = [
  {
    title: "Mobile & Cross-Platform",
    items: ["Flutter", "Dart", "Kotlin", "Jetpack Compose", "Riverpod", "Hilt", "Room"],
  },
  {
    title: "Backend & Real-Time Systems",
    items: ["Node.js", "Socket.IO", "Supabase", "Firebase", "REST APIs", "FastAPI"],
  },
  {
    title: "Game & Networking",
    items: ["Flame", "Multiplayer Netcode", "Client Prediction", "Spatial Hashing", "BLE Mesh", "AODV Routing"],
  },
  {
    title: "AI, Data & DevOps",
    items: ["Machine Learning", "NLP Workflows", "Coroutines", "Docker", "Fly.io", "Hugging Face Spaces"],
  },
  {
    title: "Product & Delivery",
    items: ["Real-Time Chat", "Maps", "Payments", "Charts", "Localization", "Git"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="content-section">
      <SectionHeading
        index="04"
        title="Skills"
        eyebrow="Tools and capabilities"
        description="The mobile, backend, real-time, game, and delivery stack I use to build and ship full product experiences."
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
