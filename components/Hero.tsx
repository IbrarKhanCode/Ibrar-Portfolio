import Image from "next/image";

export default function Hero() {
  return (
    <section id="home" className="hero-panel" aria-label="Introduction">

      {/* ── Mobile portrait (hidden on desktop via CSS) ── */}
      <div className="hero-portrait-mobile-wrap">
        <div className="hero-portrait-mobile">
          <Image
            src="/ibrar.png"
            alt="Portrait of Muhammad Ibrar"
            width={132}
            height={132}
            sizes="132px"
            priority
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
      </div>

      {/* ── Heading row with desktop portrait + name ── */}
      <div className="hero-heading-row">
        {/* Desktop portrait card (hidden on mobile via CSS) */}
        <div className="hero-portrait-card">
          <Image
            src="/ibrar.png"
            alt="Muhammad Ibrar"
            fill
            sizes="(max-width: 1023px) 0px, 132px"
            className="hero-portrait-image"
            priority
          />
        </div>

        <div className="hero-heading-copy">
          <p className="hero-kicker reveal" style={{ animationDelay: "0.1s" }}>
            Hi, my name is
          </p>
          <h1 className="hero-title reveal" style={{ animationDelay: "0.18s" }}>
            Muhammad Ibrar
          </h1>
        </div>
      </div>

      <p className="hero-summary reveal" style={{ animationDelay: "0.28s" }}>
        I am a Flutter developer focused on accessible, performant, and production-grade apps.
        I enjoy building thoughtful user interfaces, real-time mobile features, and scalable
        product experiences with clean architecture.
      </p>

      {/* hero jump links removed */}

      <div className="hero-actions reveal" style={{ animationDelay: "0.44s" }}>
        <a
          href="/cv/Muhammad%20Ibrar%20Flutter.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-accent"
        >
          View CV
        </a>
      </div>
    </section>
  );
}
