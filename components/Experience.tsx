"use client";

import { useLayoutEffect, useRef, useState } from "react";
import SectionHeading from "@/components/SectionHeading";

const experiences = [
  {
    period: "2026 – Present",
    location: "Remote",
    role: "Open Source Contributor",
    company: "API Dash",
    companyUrl: "https://apidash.dev",
    summary:
      "Contributing to API Dash, a Flutter-based open-source API client and an official Google Summer of Code (GSoC) organization, focusing on Android platform reliability and contributor workflow.",
    points: [
      "Root-caused an Android MP3 preview failure traced to just_audio localhost cleartext traffic restrictions and documented the recommended fix for maintainers.",
      "Investigated a native plugin loading crash on Android startup and collaborated with the team on the appropriate resolution path.",
      "Submitted pull requests following open-source best practices — feature branches, code reviews, and maintainer alignment via GitHub and Discord.",
    ],
    tech: ["Flutter", "Dart", "Android", "Git", "Open Source"],
  },
  {
    period: "Jan 2026 - Present",
    location: "Islamabad",
    role: "Flutter Developer",
    company: "ITShifts",
    companyUrl: "https://www.itshifts.com",
    summary:
      "Contributing across client projects including Seyanti, a three-sided on-demand service platform, and HalaCareer, a learning and workforce management app.",
    points: [
      "Built end-to-end booking and payment flows for Seyanti, including Fawaterak wallet integration and real-time map tracking across customer, agency, and provider apps.",
      "Designed a complete Track/Course learning system for HalaCareer using BLoC, covering lesson playback, quizzes, and exam workflows.",
      "Worked closely with backend developers to ship reliable, API-driven features under deadline pressure across multiple live projects.",
    ],
    tech: ["Flutter", "Dart", "REST APIs", "WebSockets", "Payments"],
  },
  {
    period: "Aug 2025 - Dec 2025",
    location: "Islamabad",
    role: "Flutter Developer",
    company: "Apifiny",
    companyUrl: "https://www.linkedin.com/company/apifinytech/posts/?feedView=all",
    summary:
      "Worked on Genie, an AI-powered dating app, focused on onboarding UX and real-time communication.",
    points: [
      "Built a multi-step animated onboarding flow designed to improve activation and profile completion.",
      "Implemented real-time messaging with media sharing, voice notes, and audio/video calling.",
      "Integrated AI-assisted face liveness verification and stabilized Firebase data sync for stronger product insights.",
    ],
    tech: ["Flutter", "Firebase", "AI Features", "Real-Time Systems"],
  },
  {
    period: "May 2025 - Jul 2025",
    location: "Rawalpindi",
    role: "Flutter Developer Intern",
    company: "Alfa Origin",
    companyUrl: "https://alfaorigin.com/",
    summary:
      "Contributed as a Flutter developer across three apps, taking features from concept to deployment.",
    points: [
      "Built a task-based earning app with email/Google authentication, profile management, and theme switching using Firebase Authentication and Cloud Firestore.",
      "Collaborated on PDF Flex, contributing PDF viewing, editing, and digital signatures with Provider state management.",
      "Built core features for an online file transfer app, including Google Sign-In, dynamic file handling, and direct sharing with GetX and Provider.",
    ],
    tech: ["Flutter", "Firebase", "Provider", "GetX"],
  },
  {
    period: "Nov 2024 - Jan 2025",
    location: "Islamabad",
    role: "Flutter Developer Intern",
    company: "Structure Limited",
    companyUrl: "https://www.linkedin.com/company/structures-ltd/",
    summary:
      "Delivered a fully featured dating app in just 7 days, building 70+ unique screens under MVVM architecture with Firebase-backed authentication.",
    points: [
      "Built secure login and signup flows using Firebase Authentication, with full input validation on both forms",
      "Structured the app under MVVM architecture for a clean, scalable, and maintainable codebase across 70+ screens",
      "Implemented Provider for real-time UI updates and state management, paired with smooth custom page transitions and animations",
    ],
    tech: ["Flutter", "Firebase Auth", "MVVM", "Provider"],
  },
  {
    period: "Sep 2024 - Oct 2024",
    location: "Remote",
    role: "Flutter Developer Intern",
    company: "Intern Intelligence",
    companyUrl: "https://www.internintelligence.org/",
    summary:
      "Completed a remote Flutter internship building two production-style apps from scratch, with a strong focus on UI polish, smooth animations, and mobile app fundamentals.",
    points: [
      "Built a movie app featuring a carousel slider to showcase top and featured titles, with a responsive layout optimized across screen sizes",
      "Developed an e-commerce app with dynamic product listings, a product detail screen with Hero animations, and full add-to-cart and remove-from-cart functionality",
      "Focused on smooth page transitions and clean, performant UI using Flutter's rendering engine throughout both projects",
    ],
    tech: ["Flutter", "Dart", "UI Animations", "Responsive Design"],
  },
];

export default function Experience() {
  const [showAll, setShowAll] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const collapseAnchorTop = useRef<number | null>(null);
  const visibleExperiences = showAll ? experiences : experiences.slice(0, 2);
  const shouldShowToggle = experiences.length > 2;

  useLayoutEffect(() => {
    if (showAll || collapseAnchorTop.current === null) {
      return;
    }

    const previousTop = collapseAnchorTop.current;
    collapseAnchorTop.current = null;

    window.requestAnimationFrame(() => {
      const currentTop = toggleButtonRef.current?.getBoundingClientRect().top;

      if (typeof currentTop === "number") {
        window.scrollBy({ top: currentTop - previousTop, behavior: "auto" });
      }
    });
  }, [showAll]);

  const toggleShowAll = () => {
    if (showAll) {
      collapseAnchorTop.current = toggleButtonRef.current?.getBoundingClientRect().top ?? null;
    }

    setShowAll((current) => !current);
  };

  return (
    <section id="experience" className="content-section section-content-inset">
      <SectionHeading
        index="02"
        title="Experience"
        eyebrow="Where I've shipped work"
        description="A snapshot of the product teams and delivery environments where I've contributed as a mobile developer over 2+ years."
      />

      <ul className="stack-list" aria-label="Work experience entries" id="experience-list">
        {visibleExperiences.map((item, index) => (
          <li
            key={`${item.company}-${item.period}`}
            className={`card-surface stack-item reveal ${showAll && index >= 2 ? "is-visible" : ""}`}
            style={{ animationDelay: `${0.06 + index * 0.1}s` }}
          >
            <div className="meta-row">
              <div>
                <h3 style={{ fontSize: 18 }}>
                  {item.role}{" "}
                  <span className="accent">
                    @{" "}
                    {item.companyUrl ? (
                      <a
                        href={item.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-link"
                      >
                        {item.company}
                      </a>
                    ) : (
                      item.company
                    )}
                  </span>
                </h3>
                <div
                  className="mono"
                  style={{ marginTop: 7, display: "flex", flexWrap: "wrap", gap: 10, fontSize: 12, color: "var(--text-dim)" }}
                >
                  {item.location ? <span>{item.location}</span> : null}
                  {item.location ? <span aria-hidden="true">•</span> : null}
                  <span>{item.period}</span>
                </div>
              </div>
            </div>

            <p>{item.summary}</p>

            <ul style={{ listStyle: "none", marginTop: 14, display: "grid", gap: 8 }}>
              {item.points.map((point) => (
                <li key={point} style={{ fontSize: 14 }}>
                  <span className="accent" style={{ marginRight: 8 }}>
                    ▹
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {item.tech.map((tech) => (
                <span key={tech} className="badge">
                  {tech}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>

      {shouldShowToggle ? (
        <div style={{ marginTop: 18, display: "flex" }}>
          <button
            ref={toggleButtonRef}
            type="button"
            className="btn-accent"
            onClick={toggleShowAll}
            aria-expanded={showAll}
            aria-controls="experience-list"
          >
            {showAll ? "Show less experiences" : "See more experiences"}
          </button>
        </div>
      ) : null}
    </section>
  );
}
