import { getTeamDisplay } from "@/lib/teams";

type TeamBadgeProps = {
  team: string;
  showName?: boolean;
};

export default function TeamBadge({ team, showName = false }: TeamBadgeProps) {
  const display = getTeamDisplay(team);

  return (
    <span className="teamDisplay">
      <span
        className={`teamBadge ${display.className}`}
        aria-label={showName ? undefined : team}
        aria-hidden={showName ? true : undefined}
        title={showName ? undefined : team}
      >
        {display.code}
      </span>
      {showName && <span className="teamLabel">{team}</span>}
    </span>
  );
}
