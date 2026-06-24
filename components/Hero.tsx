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
            loading="eager"
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
      </div>

      {/* ── Heading row with desktop portrait + name ── */}
      <div className="hero-heading-row">
        {/* Desktop portrait card (hidden on mobile via CSS) */}
        <div className="hero-portrait-card" style={{ position: "relative" }}>
          <div style={{ borderRadius: "999px", overflow: "hidden", width: "100%", height: "100%", position: "relative" }}>
            <Image
              src="/ibrar.png"
              alt="Muhammad Ibrar"
              fill
              sizes="(max-width: 1023px) 0px, 132px"
              className="hero-portrait-image"
              loading="eager"
            />
          </div>
        </div>

        <div className="hero-heading-copy">
          <p className="hero-kicker">
            Hi, my name is
          </p>
          <h1 className="hero-title">
            Muhammad Ibrar
          </h1>
        </div>
      </div>

      <div className="hero-typewriter"></div>

      <p className="hero-summary">
        I am a mobile developer focused on accessible, performant, and production-grade
        apps. With 2+ years of shipping real-world work, I build thoughtful interfaces, real-time
        multiplayer systems, and scalable product experiences across Flutter, Kotlin, Node.js, and
        game backends with clean architecture.
      </p>



      {/* hero jump links removed */}


    </section>
  );
}
