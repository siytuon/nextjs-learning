import type { Player } from "@/lib/players";
import PlayerRadarChart from "./player-radar-chart";
import TeamBadge from "./team-badge";

type PlayerComparisonProps = {
  players: [Player, Player];
  allPlayers: Player[];
  onRemovePlayer: (player: Player) => void;
  onClose: () => void;
};

const comparisonRows = [
  { label: "試合", key: "games", decimals: undefined },
  { label: "打率", key: "average", decimals: 3 },
  { label: "本塁打", key: "homeRuns", decimals: undefined },
  { label: "打点", key: "rbi", decimals: undefined },
  { label: "安打", key: "hits", decimals: undefined },
  { label: "出塁率", key: "onBasePercentage", decimals: 3 },
  { label: "長打率", key: "sluggingPercentage", decimals: 3 },
  { label: "盗塁", key: "stolenBases", decimals: undefined },
] as const;

function formatValue(value: number, decimals?: number) {
  return decimals === undefined ? value : value.toFixed(decimals);
}

export default function PlayerComparison({
  players,
  allPlayers,
  onRemovePlayer,
  onClose,
}: PlayerComparisonProps) {
  return (
    <aside className="playerComparison" aria-labelledby="player-comparison-title">
      <header className="playerComparisonHeader">
        <div>
          <p>2選手を比較</p>
          <h3 id="player-comparison-title">成績比較</h3>
        </div>
        <div className="playerComparisonHeaderActions">
          <p className="playerComparisonHint">選手名をもう一度押すと解除できます</p>
          <button type="button" onClick={onClose} aria-label="選手比較を終了する">
            閉じる
          </button>
        </div>
      </header>

      <div className="comparisonPlayers">
        {players.map((player) => (
          <div className="comparisonPlayer" key={`${player.league}-${player.name}`}>
            <TeamBadge team={player.team} />
            <strong>{player.name}</strong>
            <button
              type="button"
              onClick={() => onRemovePlayer(player)}
              aria-label={`${player.name}を比較から外す`}
            >
              外す
            </button>
          </div>
        ))}
      </div>

      <dl className="comparisonMetrics">
        {comparisonRows.map((row) => {
          const firstValue = players[0][row.key];
          const secondValue = players[1][row.key];

          return (
            <div key={row.key}>
              <dt>{row.label}</dt>
              <dd className={firstValue > secondValue ? "comparisonLeader" : undefined}>
                {formatValue(firstValue, row.decimals)}
              </dd>
              <dd className={secondValue > firstValue ? "comparisonLeader" : undefined}>
                {formatValue(secondValue, row.decimals)}
              </dd>
            </div>
          );
        })}
      </dl>

      <PlayerRadarChart players={players} allPlayers={allPlayers} />
    </aside>
  );
}
