type SectionHeadingProps = {
  index: string;
  title: string;
  eyebrow?: string;
  description?: string;
};

export default function SectionHeading({ index, title, eyebrow, description }: SectionHeadingProps) {
  return (
    <header className="section-heading-wrap reveal" style={{ animationDelay: "0.02s" }}>
      <div className="section-heading">
        <span className="section-index">{index}</span>
        <h2 className="section-title">{title}</h2>
      </div>

      {eyebrow ? <p className="section-eyebrow mono">{eyebrow}</p> : null}
      {description ? <p className="section-description">{description}</p> : null}
    </header>
  );
}