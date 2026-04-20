export default function Contact() {
  return (
    <section id="contact" className="content-section reveal" style={{ animationDelay: "0.14s", marginBottom: 54 }}>
      <p>
        I am currently open to Flutter and mobile product opportunities. If you have a role,
        project, or collaboration in mind, I would be happy to connect.
      </p>

      <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 12 }}>
        <a href="mailto:ibrarflutterdev@gmail.com" className="btn-accent">
          Say Hello
        </a>
        <a href="tel:+923165651796" className="btn-accent">
          +92 316 5651796
        </a>
        <a href="/cv/Muhammad%20Ibrar%20Flutter.pdf" target="_blank" rel="noopener noreferrer" className="btn-accent">
          View CV
        </a>
      </div>

      <div style={{ marginTop: 18, display: "grid", gap: 8 }}>
        <a href="https://github.com/IbrarKhanCode" target="_blank" rel="noopener noreferrer" className="text-link mono" style={{ fontSize: 12 }}>
          GitHub ↗
        </a>
        <a href="https://tinyurl.com/4ypt3xsa" target="_blank" rel="noopener noreferrer" className="text-link mono" style={{ fontSize: 12 }}>
          LinkedIn ↗
        </a>
      </div>
    </section>
  );
}
