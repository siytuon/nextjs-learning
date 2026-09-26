import type { Player } from "@/lib/players";

type PlayerRadarChartProps = {
  players: [Player, Player];
  allPlayers: Player[];
};

const radarMetrics = [
  { label: "打率", key: "average" },
  { label: "本塁打", key: "homeRuns" },
  { label: "打点", key: "rbi" },
  { label: "出塁率", key: "onBasePercentage" },
  { label: "長打率", key: "sluggingPercentage" },
] as const;

const center = 150;
const chartRadius = 94;
const labelRadius = 122;

function pointAt(index: number, radius: number) {
  const angle = -Math.PI / 2 + (Math.PI * 2 * index) / radarMetrics.length;

  return {
    x: center + Math.cos(angle) * radius,
    y: center + Math.sin(angle) * radius,
  };
}

function pointsAtRatio(ratio: number) {
  return radarMetrics
    .map((_, index) => {
      const point = pointAt(index, chartRadius * ratio);
      return `${point.x},${point.y}`;
    })
    .join(" ");
}

export default function PlayerRadarChart({
  players,
  allPlayers,
}: PlayerRadarChartProps) {
  const maxValues = radarMetrics.map((metric) =>
    Math.max(...allPlayers.map((player) => player[metric.key])),
  );

  const playerPoints = players.map((player) =>
    radarMetrics
      .map((metric, index) => {
        const maxValue = maxValues[index];
        const ratio = maxValue === 0 ? 0 : player[metric.key] / maxValue;
        const point = pointAt(index, chartRadius * ratio);
        return `${point.x},${point.y}`;
      })
      .join(" "),
  );

  return (
    <section className="radarChartSection" aria-labelledby="radar-chart-heading">
      <header>
        <h4 id="radar-chart-heading">主要成績レーダーチャート</h4>
        <p>掲載全選手の最大値を100%として表示</p>
      </header>

      <svg
        className="radarChart"
        viewBox="0 0 300 300"
        role="img"
        aria-labelledby="radar-chart-title radar-chart-description"
      >
        <title id="radar-chart-title">{players[0].name}と{players[1].name}の主要成績比較</title>
        <desc id="radar-chart-description">
          打率、本塁打、打点、出塁率、長打率を掲載全選手の最大値に対する割合で比較しています。
        </desc>

        {[0.25, 0.5, 0.75, 1].map((ratio) => (
          <polygon
            className="radarGrid"
            points={pointsAtRatio(ratio)}
            key={ratio}
          />
        ))}

        {radarMetrics.map((metric, index) => {
          const axisEnd = pointAt(index, chartRadius);
          const labelPoint = pointAt(index, labelRadius);

          return (
            <g key={metric.key}>
              <line
                className="radarAxis"
                x1={center}
                y1={center}
                x2={axisEnd.x}
                y2={axisEnd.y}
              />
              <text
                className="radarLabel"
                x={labelPoint.x}
                y={labelPoint.y}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {metric.label}
              </text>
            </g>
          );
        })}

        <polygon className="radarPlayer radarPlayer-1" points={playerPoints[0]} />
        <polygon className="radarPlayer radarPlayer-2" points={playerPoints[1]} />
      </svg>

      <div className="radarLegend" aria-label="レーダーチャートの選手">
        {players.map((player, index) => (
          <span key={`${player.league}-${player.name}`}>
            <i className={`radarLegendColor radarLegendColor-${index + 1}`} aria-hidden="true" />
            {player.name}
          </span>
        ))}
      </div>
    </section>
  );
}
