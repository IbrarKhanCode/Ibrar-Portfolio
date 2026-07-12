"use client";

import { useEffect, useState, useCallback } from "react";
import { GitHubCalendar } from "react-github-calendar";
import type { Activity } from "react-github-calendar";
import "react-activity-calendar/tooltips.css";
import SectionHeading from "@/components/SectionHeading";

const GITHUB_USERNAME = "IbrarKhanCode";
const LOAD_TIMEOUT_MS = 12000;

const calendarTheme = {
  light: ["rgba(15, 23, 42, 0.65)", "#064e3b", "#0d9488", "#14b8a6", "#5eead4"],
  dark: ["rgba(15, 23, 42, 0.65)", "#064e3b", "#0d9488", "#14b8a6", "#5eead4"],
};

export default function GitHubActivity() {
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTransformData = useCallback(
    (data: Array<Activity>) => {
      if (!loaded) {
        queueMicrotask(() => setLoaded(true));
      }
      return data;
    },
    [loaded]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loaded) {
        setTimedOut(true);
      }
    }, LOAD_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [loaded]);

  const showSkeleton = !loaded && !timedOut;
  const showError = timedOut && !loaded;

  return (
    <section id="github" className="content-section section-content-inset">
      <SectionHeading
        index="05"
        title="GitHub Activity"
        eyebrow="Open source contributions"
        description="A live view of my public GitHub contribution activity over the last year."
      />

      <div
        className="card-surface github-calendar-card reveal"
        style={{
          animationDelay: "0.06s",
          position: "relative",
          padding: "24px 20px 20px",
        }}
      >
        {!mounted && (
          <div
            className="github-calendar-placeholder"
            style={{ minHeight: 180 }}
            aria-hidden="true"
          />
        )}

        {mounted && (
          <>
            {showSkeleton && (
              <div className="github-calendar-skeleton" aria-hidden="true">
                <div className="skeleton-bar" style={{ width: "55%", marginBottom: 20 }} />
                <div className="skeleton-grid">
                  {Array.from({ length: 7 }).map((_, row) => (
                    <div key={row} className="skeleton-row">
                      <div className="skeleton-weekday" />
                      {Array.from({ length: 16 }).map((_, col) => (
                        <div
                          key={col}
                          className="skeleton-block"
                          style={{ animationDelay: `${(row * 16 + col) * 0.008}s` }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <div className="skeleton-footer">
                  <div className="skeleton-bar" style={{ width: 120 }} />
                  <div className="skeleton-bar" style={{ width: 80 }} />
                </div>
              </div>
            )}

            {showError && (
              <div className="github-calendar-fallback" role="alert">
                <p className="github-calendar-fallback-title">Unable to load GitHub activity</p>
                <p>
                  The contribution calendar could not be fetched right now. This usually happens when
                  GitHub&apos;s API rate limit is reached. You can still view my full profile below.
                </p>
              </div>
            )}

            <div
              className="github-calendar-live"
              style={{
                opacity: loaded ? 1 : 0,
                pointerEvents: loaded ? "auto" : "none",
                transition: "opacity 0.35s ease",
              }}
              aria-hidden={!loaded}
            >
              <div className="github-calendar-scroll">
                <GitHubCalendar
                  username={GITHUB_USERNAME}
                  year="last"
                  colorScheme="dark"
                  theme={calendarTheme}
                  blockSize={12}
                  blockMargin={3}
                  blockRadius={3}
                  fontSize={12}
                  showWeekdayLabels
                  labels={{
                    totalCount: "{{count}} contributions in the last year",
                    legend: { less: "Less", more: "More" },
                  }}
                  transformData={handleTransformData}
                  errorMessage="Unable to load GitHub contributions. Please try again later or view my profile directly."
                />
              </div>
            </div>
          </>
        )}

        <div className="github-profile-link-wrap">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="github-profile-link"
          >
            View full GitHub profile
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
