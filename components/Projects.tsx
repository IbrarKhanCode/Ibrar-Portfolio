import Image from "next/image";
import GenieSlider from "@/components/GenieSlider";
import SectionHeading from "@/components/SectionHeading";

type Project = {
  title: string;
  logo: string;
  tagline: string;
  description: string;
  highlights?: string[];
  tech: string[];
  links: { label: string; href: string }[];
  screenshots?: { src: string; alt: string }[];
};

const projects: Project[] = [
  {
    title: "Chronos Drift",
    logo: "/chronos_drift_logo.svg",
    tagline: "Multiplayer sci-fi roguelike survivor",
    description:
      "Chronos Drift is a cross-platform multiplayer sci-fi roguelike survivor built with Flutter and Flame, paired with a self-built Node.js authoritative game server. I designed both the real-time client netcode and the backend simulation, including a unique time-rewind combat mechanic and full match/auth/leaderboard infrastructure.",
    highlights: [
      "Built a 4-player real-time multiplayer client/server architecture with Socket.IO, featuring client-side prediction, server reconciliation, and snapshot interpolation for smooth remote-player movement.",
      "Designed an authoritative Node.js backend running a deterministic 30 Hz fixed-tick loop for movement, shooting, enemy AI, and collisions, paired with a custom spatial-hashing system on both client and server for scalable performance.",
      "Implemented a server-authoritative Chronos Rewind mechanic — a rolling history buffer letting players revert ~3 seconds of state, enforced with server-side cooldowns.",
      "Integrated Supabase for anonymous/Google Sign-In auth, player profiles, match history, and leaderboards, with the backend containerized via Docker and deployed on Fly.io.",
    ],
    tech: ["Flutter", "Flame", "Node.js", "Socket.IO", "Supabase"],
    links: [],
  },
  {
    title: "Aura_Mesh",
    logo: "/aura_mesh_logo.svg",
    tagline: "Offline BLE mesh messaging app",
    description:
      "Aura_Mesh is a decentralized, offline peer-to-peer messaging app for Android that builds a self-organizing Bluetooth Low Energy mesh network, enabling multi-hop chat between nearby devices with no internet, Wi-Fi, or cellular connection required.",
    highlights: [
      "Implemented an AODV-inspired multi-hop routing protocol with RouteRequest/RouteReply/RouteError packets, enabling reliable message forwarding across multiple peer hops.",
      "Built a store-and-forward messaging queue that persists undelivered messages and automatically retries delivery when the destination peer comes back into range.",
      "Designed a custom BLE packet fragmentation and reassembly protocol to fit payloads within Bluetooth's 20-byte ATT MTU, with sequence flags and reassembly timeouts.",
      "Architected the app with MVI and Clean Architecture using Hilt DI and Room persistence, with a foreground service keeping the mesh alive in the background and full Android 11–14+ permission handling.",
    ],
    tech: ["Kotlin", "Jetpack Compose", "Hilt", "Room", "Coroutines"],
    links: [],
  },
  {
    title: "HalaCareer",
    logo: "/halacareer_logo.png",
    tagline: "Track/course learning and company team management platform",
    description:
      "HalaCareer is a feature-rich learning and workforce management application where I implemented complete course-track journeys and company-side employee lifecycle controls with robust, API-driven UX behavior.",
    highlights: [
      "Designed and implemented a complete Track/Course learning system using BLoC architecture, including track discovery, course details, interactive lesson player, onboarding tasks, passcode-based quiz validation, notes, related courses, and exam workflows.",
      "Implemented end-to-end Company Employee Invitation and Team Management in the Company Dashboard, including invitation generation (email/link modes), pending request moderation (approve/reject), team listing, and member termination controls.",
      "Integrated employee-side invitation acceptance/rejection dialogs triggered from login pending-invitation tokens, enabling full invitation lifecycle coverage from admin invite to employee onboarding.",
      "Developed robust API-driven state handling with loading/error UX and edge-case handling for auth, validation, and backend response variations.",
    ],
    tech: ["Flutter", "BLoC", "REST APIs", "State Management", "Dashboard"],
    screenshots: [
      { src: "/halacareer/first.jpeg", alt: "HalaCareer first screen" },
      { src: "/halacareer/second.jpeg", alt: "HalaCareer second screen" },
      { src: "/halacareer/third.jpeg", alt: "HalaCareer third screen" },
      { src: "/halacareer/fourth.jpeg", alt: "HalaCareer fourth screen" },
      { src: "/halacareer/fifth.jpeg", alt: "HalaCareer fifth screen" },
      { src: "/halacareer/sixth.jpeg", alt: "HalaCareer sixth screen" },
      { src: "/halacareer/seventh.jpeg", alt: "HalaCareer seventh screen" },
      { src: "/halacareer/eight.jpeg", alt: "HalaCareer eighth screen" },
      { src: "/halacareer/ninth.jpeg", alt: "HalaCareer ninth screen" },
      { src: "/halacareer/tenth.jpeg", alt: "HalaCareer tenth screen" },
      { src: "/halacareer/eleven.jpeg", alt: "HalaCareer eleventh screen" },
      { src: "/halacareer/twelve.jpeg", alt: "HalaCareer twelfth screen" },
      { src: "/halacareer/thirteen.jpeg", alt: "HalaCareer thirteenth screen" },
      { src: "/halacareer/fourteen.jpeg", alt: "HalaCareer fourteenth screen" },
      { src: "/halacareer/fifteen.jpeg", alt: "HalaCareer fifteenth screen" },
      { src: "/halacareer/sixteen.jpeg", alt: "HalaCareer sixteenth screen" },
      { src: "/halacareer/seventeen.jpeg", alt: "HalaCareer seventeenth screen" },
      { src: "/halacareer/eighteen.jpeg", alt: "HalaCareer eighteenth screen" },
    ],
    links: [
      { label: "App Store", href: "https://apps.apple.com/sa/app/halacareer/id6759287310" },
      { label: "In Progress", href: "#" },
    ],
  },
  {
    title: "Seyanti",
    logo: "/seyanti.png",
    tagline: "Three-app on-demand service ecosystem",
    description:
      "Seyanti is a production-grade, three-sided on-demand platform connecting customers, agencies, and providers in one coordinated ecosystem. I worked across role-specific app flows covering discovery, booking, payments, live tracking, and communication to support the full service lifecycle.",
    highlights: [
      "Multi-auth support with Email, Google Sign-In, OTP, and guest access, plus location-based service discovery.",
      "End-to-end booking flow with date/time selection, notes, image upload, add-ons, and coupon handling.",
      "Wallet top-up and payment processing with Fawaterak integration, paired with real-time appointment tracking on maps.",
      "In-app communication with text, image, and video messaging to keep customers and providers synced.",
    ],
    tech: ["Flutter", "Firebase", "REST APIs", "Google Maps", "WebSockets"],
    screenshots: [
      { src: "/seyanti/first.jpeg", alt: "Seyanti first screen" },
      { src: "/seyanti/second.jpeg", alt: "Seyanti second screen" },
      { src: "/seyanti/third.jpeg", alt: "Seyanti third screen" },
      { src: "/seyanti/fourth.jpeg", alt: "Seyanti fourth screen" },
      { src: "/seyanti/fifth.jpeg", alt: "Seyanti fifth screen" },
      { src: "/seyanti/sixth.jpeg", alt: "Seyanti sixth screen" },
      { src: "/seyanti/seventh.jpeg", alt: "Seyanti seventh screen" },
      { src: "/seyanti/eight.jpeg", alt: "Seyanti eighth screen" },
      { src: "/seyanti/nine.jpeg", alt: "Seyanti ninth screen" },
      { src: "/seyanti/ten.jpeg", alt: "Seyanti tenth screen" },
      { src: "/seyanti/eleven.jpeg", alt: "Seyanti eleventh screen" },
      { src: "/seyanti/twelve.jpeg", alt: "Seyanti twelfth screen" },
      { src: "/seyanti/thirteen.jpeg", alt: "Seyanti thirteenth screen" },
      { src: "/seyanti/fourteen.jpeg", alt: "Seyanti fourteenth screen" },
      { src: "/seyanti/fifteen.jpeg", alt: "Seyanti fifteenth screen" },
      { src: "/seyanti/sixteen.jpeg", alt: "Seyanti sixteenth screen" },
      { src: "/seyanti/seventeen.jpeg", alt: "Seyanti seventeenth screen" },
      { src: "/seyanti/eighteen.jpeg", alt: "Seyanti eighteenth screen" },
    ],
    links: [
      { label: "Customer App Store", href: "https://apps.apple.com/sa/app/seyanti/id6760643118" },
      { label: "Customer Play Store", href: "https://play.google.com/store/apps/details?id=com.incode.homeservices_app" },
      { label: "Customer Demo", href: "https://drive.google.com/file/d/1NsMSaXmU48ik9Z0xy3WxEs6eL67MDgoS/view?usp=drive_link" },
    ],
  },
  {
    title: "Genie",
    logo: "/genie.svg",
    tagline: "AI-powered dating app",
    description:
      "Genie is an AI-powered Muslim dating app focused on trust, safety, and smooth real-time interactions. I delivered complex onboarding and communication features while improving backend reliability, data sync, and analytics visibility.",
    highlights: [
      "Complex multi-step onboarding with animated UI/UX for better activation and profile completion.",
      "Real-time messaging with media sharing, voice notes, and audio/video calling capabilities.",
      "AI-assisted face liveness and identity verification workflows to improve account trust and security.",
      "Firebase Analytics integration and real-time stability improvements for stronger product insights and UX consistency.",
    ],
    tech: ["Flutter", "Firebase", "AI Integration", "WebRTC", "Analytics"],
    screenshots: [
      { src: "/genie_images/sign_in.png", alt: "Genie sign in screen" },
      { src: "/genie_images/welcome.png", alt: "Genie welcome screen" },
      { src: "/genie_images/verification_one.png", alt: "Genie verification step one" },
      { src: "/genie_images/verification_two.png", alt: "Genie verification step two" },
      { src: "/genie_images/onboarding_one.png", alt: "Genie onboarding screen one" },
      { src: "/genie_images/onboarding_two.png", alt: "Genie onboarding screen two" },
      { src: "/genie_images/onboarding_three.png", alt: "Genie onboarding screen three" },
      { src: "/genie_images/onboarding_four.png", alt: "Genie onboarding screen four" },
      { src: "/genie_images/onboarding_five.png", alt: "Genie onboarding screen five" },
      { src: "/genie_images/premium.png", alt: "Genie premium screen" },
      { src: "/genie_images/genie_chat.png", alt: "Genie chat conversation screen" },
      { src: "/genie_images/home.png", alt: "Genie home screen" },
      { src: "/genie_images/discover.png", alt: "Genie discover screen" },
      { src: "/genie_images/chat.png", alt: "Genie chat list screen" },
      { src: "/genie_images/profile.png", alt: "Genie profile screen" },
    ],
    links: [
      { label: "In Progress", href: "#" },
    ],
  },
  {
    title: "Penny Pulse",
    logo: "/penny_pulse_logo.png",
    tagline: "AI-powered expense tracker",
    description:
      "Penny Pulse is a full-stack personal finance application built with Flutter, FastAPI, and machine learning. It lets users add expenses by text or voice and predicts expense categories plus Need/Want classification with custom NLP models.",
    highlights: [
      "Built a modern fintech-style UI with Material 3, Riverpod state management, real-time charts, secure authentication, and REST API integration.",
      "Developed and optimized a large real-world dataset with Roman Urdu and English support for stronger expense prediction results.",
      "Trained scikit-learn models for intelligent category prediction and Need/Want classification using custom NLP workflows.",
      "Deployed the backend on Hugging Face Spaces with Docker for a reproducible production setup.",
    ],
    tech: ["Flutter", "FastAPI", "Machine Learning", "Riverpod", "Docker"],
    screenshots: [
      { src: "/penny_pulse/1.png", alt: "Penny Pulse screen 1" },
      { src: "/penny_pulse/2.png", alt: "Penny Pulse screen 2" },
      { src: "/penny_pulse/3.png", alt: "Penny Pulse screen 3" },
      { src: "/penny_pulse/4.png", alt: "Penny Pulse screen 4" },
      { src: "/penny_pulse/5.png", alt: "Penny Pulse screen 5" },
      { src: "/penny_pulse/6.png", alt: "Penny Pulse screen 6" },
      { src: "/penny_pulse/7.png", alt: "Penny Pulse screen 7" },
      { src: "/penny_pulse/8.png", alt: "Penny Pulse screen 8" },
      { src: "/penny_pulse/9.png", alt: "Penny Pulse screen 9" },
      { src: "/penny_pulse/10.png", alt: "Penny Pulse screen 10" },
      { src: "/penny_pulse/11.png", alt: "Penny Pulse screen 11" },
      { src: "/penny_pulse/12.png", alt: "Penny Pulse screen 12" },
    ],
    links: [
      { label: "In Progress", href: "#" },
    ],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="content-section">
      <SectionHeading
        index="03"
        title="Selected Projects"
        eyebrow="Work that defines my portfolio"
        description="A few production apps and product systems that show the range of interfaces, flows, and technical problems I’ve worked through."
      />

      <ul className="stack-list" aria-label="Project list">
        {projects.map((project, index) => {
          const isPennyPulse = project.title === "Penny Pulse";

          return (
          <li
            key={project.title}
            className="project-shell reveal"
            style={{ animationDelay: `${0.06 + index * 0.1}s` }}
          >
            <div className="card-surface stack-item project-summary">
              <div className="meta-row" style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: isPennyPulse ? 999 : 12,
                    border: "1px solid var(--border)",
                    background: "#f8fafc",
                    position: "relative",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={project.logo}
                    alt={`${project.title} logo`}
                    fill
                    sizes="54px"
                    style={{
                      objectFit: isPennyPulse ? "cover" : "contain",
                      padding: isPennyPulse ? 0 : 7,
                    }}
                  />
                </div>
                <div>
                  <h3 style={{ fontSize: 19 }}>{project.title}</h3>
                  <p className="mono" style={{ fontSize: 12, color: "var(--text-dim)" }}>
                    {project.tagline}
                  </p>
                </div>
              </div>
            </div>

            <p>{project.description}</p>

            {project.highlights && project.highlights.length > 0 ? (
              <ul
                aria-label={`${project.title} key points`}
                style={{ marginTop: 12, display: "grid", gap: 6, paddingLeft: 0, listStyle: "none" }}
              >
                {project.highlights.map((point) => (
                  <li key={`${project.title}-${point}`} style={{ color: "var(--text-body)", lineHeight: 1.6 }}>
                    ▹ {point}
                  </li>
                ))}
              </ul>
            ) : null}

            <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {project.tech.map((tech) => (
                <span key={tech} className="badge">
                  {tech}
                </span>
              ))}
            </div>

            <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 12 }}>
              {project.links.map((link) => (
                <a
                  key={`${project.title}-${link.label}`}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-link mono"
                  style={{ fontSize: 12 }}
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
            </div>

            {project.screenshots && project.screenshots.length > 0 ? (
              <div className="project-screenshots">
                <GenieSlider images={project.screenshots} projectName={project.title} />
              </div>
            ) : null}
          </li>
          );
        })}
      </ul>
    </section>
  );
}
