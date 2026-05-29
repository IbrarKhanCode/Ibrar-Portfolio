"use client";

import SectionHeading from "@/components/SectionHeading";

export default function Contact() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();
    const finalSubject = subject || "Portfolio message";
    const bodyLines = [message || "(No message)"];
    const mailto = `mailto:ibrarflutterdev@gmail.com?subject=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
    window.location.href = mailto;
    form.reset();
  };

  return (
    <section
      id="contact"
      className="content-section section-content-inset reveal"
      style={{ animationDelay: "0.12s", marginBottom: 54 }}
    >
      <SectionHeading
        index="05"
        title="Contact"
        eyebrow="Let’s talk"
        description="Open to Flutter and mobile product opportunities, collaborations, and focused freelance work."
      />

      <div className="contact-shell">
        <p className="contact-summary">
          I am currently open to new Flutter and mobile product opportunities. If you have a role,
          project, or collaboration in mind, drop a message below and I will get back to you.
        </p>

        <div className="contact-panel" style={{ marginTop: 18 }}>
          <div className="contact-grid-layout">
            <div className="contact-info">
              <p className="mono contact-kicker">Direct Inbox</p>
              <p>
                Share the details of your project or role and I will respond quickly. I prioritize
                clear timelines, stable delivery, and a calm collaboration flow.
              </p>
              <div className="contact-pill mono">
                <span>Response</span>
                <strong>Within 24 hours</strong>
              </div>
              <div className="contact-pill mono">
                <span>Timezone</span>
                <strong>PKT (UTC+5)</strong>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="contact-form" aria-label="Contact form">
              <div className="contact-field">
                <label className="mono" style={{ fontSize: 12, color: "var(--text-dim)" }} htmlFor="contact-subject">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder="Project inquiry"
                  required
                  className="input-field"
                />
              </div>

              <div className="contact-field">
                <label className="mono" style={{ fontSize: 12, color: "var(--text-dim)" }} htmlFor="contact-message">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project or role"
                  required
                  className="input-field"
                />
              </div>

              <button type="submit" className="contact-submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
