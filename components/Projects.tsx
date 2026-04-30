import Image from "next/image";
import GenieSlider from "@/components/GenieSlider";

type Project = {
  title: string;
  logo: string;
  status: string;
  tagline: string;
  description: string;
  highlights?: string[];
  tech: string[];
  links: { label: string; href: string }[];
  screenshots?: { src: string; alt: string }[];
};

const projects: Project[] = [
  {
    title: "HalaCareer",
    logo: "/halacareer_logo.png",
    status: "In Progress",
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
    status: "Live",
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
    status: "Live",
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
];

export default function Projects() {
  return (
    <section id="projects" className="content-section">
      <ul className="stack-list" aria-label="Project list">
        {projects.map((project, index) => (
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
                    borderRadius: 12,
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
                    style={{ objectFit: "contain", padding: 7 }}
                  />
                </div>
                <div>
                  <h3 style={{ fontSize: 19 }}>{project.title}</h3>
                  <p className="mono" style={{ fontSize: 12, color: "var(--text-dim)" }}>
                    {project.tagline}
                  </p>
                </div>
              </div>
              <span className="badge">{project.status}</span>
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
        ))}
      </ul>
    </section>
  );
}
