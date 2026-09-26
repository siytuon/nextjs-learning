import type { Player } from "@/lib/players";
import TeamBadge from "./team-badge";

type PlayerComparisonProps = {
  players: [Player, Player];
  onRemovePlayer: (player: Player) => void;
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

const chartRows = comparisonRows.filter((row) =>
  ["average", "homeRuns", "rbi", "onBasePercentage", "sluggingPercentage"].includes(
    row.key,
  ),
);

function formatValue(value: number, decimals?: number) {
  return decimals === undefined ? value : value.toFixed(decimals);
}

export default function PlayerComparison({
  players,
  onRemovePlayer,
}: PlayerComparisonProps) {
  return (
    <aside className="playerComparison" aria-labelledby="player-comparison-title">
      <header className="playerComparisonHeader">
        <div>
          <p>2選手を比較</p>
          <h3 id="player-comparison-title">成績比較</h3>
        </div>
        <p className="playerComparisonHint">選手名をもう一度押すと解除できます</p>
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

      <section className="comparisonCharts" aria-labelledby="comparison-chart-title">
        <header>
          <h4 id="comparison-chart-title">主要成績グラフ</h4>
          <p>各項目の大きい値を100%として表示</p>
        </header>

        {chartRows.map((row) => {
          const values = players.map((player) => player[row.key]);
          const maxValue = Math.max(...values);

          return (
            <div className="comparisonChart" key={row.key}>
              <h5>{row.label}</h5>
              {players.map((player, index) => {
                const value = values[index];
                const percentage = maxValue === 0 ? 0 : (value / maxValue) * 100;

                return (
                  <div
                    className="comparisonBarRow"
                    key={`${player.league}-${player.name}`}
                    aria-label={`${player.name}の${row.label} ${formatValue(value, row.decimals)}`}
                  >
                    <span className="comparisonBarName">{player.name}</span>
                    <span className="comparisonBarTrack" aria-hidden="true">
                      <span
                        className={`comparisonBar comparisonBar-${index + 1}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </span>
                    <strong>{formatValue(value, row.decimals)}</strong>
                  </div>
                );
              })}
            </div>
          );
        })}
      </section>
    </aside>
  );
}
