export default function Contact() {
  return (
    <section id="contact" className="content-section section-content-inset reveal" style={{ animationDelay: "0.12s", marginBottom: 54 }}>
      <div className="contact-shell">
        {/* <p className="contact-kicker mono">05. Get In Touch</p> */}

        <h2 className="contact-title">Let&apos;s Build Something Reliable</h2>

        <p className="contact-summary">
          I am currently open to new Flutter and mobile product opportunities. If you have a role,
          project, or collaboration in mind, I would love to connect.
        </p>

        <div className="contact-actions">
          <a href="mailto:ibrarflutterdev@gmail.com" className="btn-accent">
            Say Hello
          </a>
          <a href="tel:+923165651796" className="btn-accent">
            Call Me
          </a>
        </div>

        <div className="contact-grid" aria-label="Contact details">
          <article className="contact-card card-surface stack-item">
            <p className="contact-card-label mono">Email</p>
            <a href="mailto:ibrarflutterdev@gmail.com" className="contact-card-value">
              ibrarflutterdev@gmail.com
            </a>
          </article>

          <article className="contact-card card-surface stack-item">
            <p className="contact-card-label mono">Phone</p>
            <a href="tel:+923165651796" className="contact-card-value">
              +92 316 5651796
            </a>
          </article>

          <article className="contact-card card-surface stack-item">
            <p className="contact-card-label mono">LinkedIn</p>
            <a
              href="https://tinyurl.com/4ypt3xsa"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card-value"
            >
              View Profile
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
