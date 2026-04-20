export default function SideRails() {
  return (
    <div className="bottom-socials-left" aria-label="Social links">
      <a
        href="/cv/Muhammad%20Ibrar%20Flutter.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="social-btn"
        aria-label="View CV"
      >
        <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z" />
        </svg>
        <span className="social-label">View CV</span>
      </a>

      <a
        href="https://tinyurl.com/4ypt3xsa"
        target="_blank"
        rel="noopener noreferrer"
        className="social-btn"
        aria-label="LinkedIn"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5V24H0zM8 8h4.5v2.2h.1c.6-1.1 2.1-2.2 4.3-2.2 4.6 0 5.5 3 5.5 6.9V24h-5V15.4c0-2.1-.1-4.8-3-4.8-3 0-3.5 2.3-3.5 4.6V24H8V8z" />
        </svg>
        <span className="social-label">LinkedIn</span>
      </a>

      <a
        href="https://github.com/IbrarKhanCode"
        target="_blank"
        rel="noopener noreferrer"
        className="social-btn"
        aria-label="GitHub"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.1c-3.2.7-3.8-1.5-3.8-1.5-.5-1.1-1.3-1.4-1.3-1.4-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1 1.7 2.6 1.2 3.3.9.1-.7.4-1.2.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.4-2.4 1.2-3.3-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2.1.1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 3 .1 3.3.8.9 1.2 2 1.2 3.3 0 4.6-2.7 5.5-5.3 5.8.4.4.8 1 .8 2v3c0 .3.2.7.8.6C20.7 21.4 24 17.1 24 12 24 5.7 18.3.5 12 .5z" />
        </svg>
        <span className="social-label">GitHub</span>
      </a>

      <a href="mailto:ibrarflutterdev@gmail.com" className="social-btn" aria-label="Gmail">
        <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z" />
        </svg>
        <span className="social-label">Gmail</span>
      </a>
    </div>
  );
}
