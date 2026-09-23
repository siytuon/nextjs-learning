import type { Player } from "@/lib/players";
import TeamBadge from "./team-badge";

type PlayerDetailsProps = {
  player: Player;
  onClose: () => void;
};

export default function PlayerDetails({
  player,
  onClose,
}: PlayerDetailsProps) {
  return (
    <aside className="playerDetails" aria-labelledby="player-details-title">
      <header className="playerDetailsHeader">
        <div>
          <p className={`playerDetailsLeague league-${player.league === "セ" ? "central" : "pacific"}`}>
            {player.league}・リーグ
          </p>
          <h3 id="player-details-title">{player.name}</h3>
          <div className="playerDetailsTeam">
            <TeamBadge team={player.team} showName />
          </div>
        </div>
        <button
          className="playerDetailsClose"
          type="button"
          onClick={onClose}
          aria-label={`${player.name}の詳細を閉じる`}
        >
          閉じる
        </button>
      </header>

      <dl className="playerDetailsGrid">
        <div>
          <dt>試合</dt>
          <dd>{player.games}</dd>
        </div>
        <div>
          <dt>打率</dt>
          <dd>{player.average.toFixed(3)}</dd>
        </div>
        <div>
          <dt>本塁打</dt>
          <dd>{player.homeRuns}</dd>
        </div>
        <div>
          <dt>打点</dt>
          <dd>{player.rbi}</dd>
        </div>
        <div>
          <dt>安打</dt>
          <dd>{player.hits}</dd>
        </div>
        <div>
          <dt>出塁率</dt>
          <dd>{player.onBasePercentage.toFixed(3)}</dd>
        </div>
        <div>
          <dt>打席</dt>
          <dd>{player.plateAppearances}</dd>
        </div>
        <div>
          <dt>打数</dt>
          <dd>{player.atBats}</dd>
        </div>
        <div>
          <dt>長打率</dt>
          <dd>{player.sluggingPercentage.toFixed(3)}</dd>
        </div>
        <div>
          <dt>四球</dt>
          <dd>{player.walks}</dd>
        </div>
        <div>
          <dt>三振</dt>
          <dd>{player.strikeouts}</dd>
        </div>
        <div>
          <dt>盗塁</dt>
          <dd>{player.stolenBases}</dd>
        </div>
      </dl>
    </aside>
  );
}
