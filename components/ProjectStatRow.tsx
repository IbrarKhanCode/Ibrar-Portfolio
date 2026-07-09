type ProjectStat = {
  value: string;
  label: string;
};

type ProjectStatRowProps = {
  stats: ProjectStat[];
};

export default function ProjectStatRow({ stats }: ProjectStatRowProps) {
  return (
    <div className="project-stat-row">
      {stats.map((stat) => (
        <div key={`${stat.label}-${stat.value}`} className="project-stat">
          <span className="project-stat-value">{stat.value}</span>
          <span className="project-stat-label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
