import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SideRails from "@/components/SideRails";
import CursorMoodOverlay from "@/components/CursorMoodOverlay";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Navbar />
      <CursorMoodOverlay />
      <ScrollReveal />
      <SideRails />
      <main className="site-shell">
        <aside className="left-column">
          <Hero />
        </aside>
        <section className="right-column" aria-label="Portfolio content">
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
          <Footer />
        </section>
      </main>
    </>
  );
}
