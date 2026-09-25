import Image from "next/image";
import notebookIcon from "./notebook-icon.png";
import PlayerDashboard from "./player-dashboard";
import { loadPlayers, playerData, type Player } from "@/lib/players";

function leaderBy(players: Player[], key: "average" | "homeRuns" | "rbi") {
  return [...players].sort((a, b) => b[key] - a[key])[0];
}

export default async function Home() {
  const players = await loadPlayers();
  const leagueLeaders = (["セ", "パ"] as const).map((league) => {
    const leaguePlayers = players.filter((player) => player.league === league);

    return {
      league,
      average: leaderBy(leaguePlayers, "average"),
      homeRuns: leaderBy(leaguePlayers, "homeRuns"),
      rbi: leaderBy(leaguePlayers, "rbi"),
    };
  });

  return (
    <main>
      <header className="siteHeader">
        <div className="headerInner">
          <a className="brand" href="#top" aria-label="NPB Notebook ホーム">
            <Image className="brandIcon" src={notebookIcon} alt="" width={34} height={34} priority unoptimized />
            <span>NPB Notebook</span>
          </a>
          <p className="season">2026年度</p>
        </div>
      </header>

      <div className="page" id="top">
        <section className="pageHeading" aria-labelledby="page-title">
          <div>
            <p className="kicker">NPB公式戦</p>
            <h1 id="page-title">選手成績</h1>
            <p className="description">{playerData.scope}を掲載しています。</p>
          </div>
          <div className="updateInfo">
            <span>成績基準日</span>
            <time dateTime={playerData.asOf}>2026年9月20日</time>
          </div>
        </section>

        <PlayerDashboard players={players} leagueLeaders={leagueLeaders} />
        <div className="dataNote">
          <p>2026年9月21日に取得した学習用スナップショットです。自動更新ではありません。</p>
          <p>
            出典: {playerData.sources.map((source, index) => (
              <span key={source.url}>
                {index > 0 && " / "}
                <a href={source.url} target="_blank" rel="noreferrer">NPB.jp {source.label}</a>
              </span>
            ))}
          </p>
        </div>
      </div>

      <footer>
        <p>NPB Notebook — React / Next.js 学習プロジェクト</p>
      </footer>
    </main>
  );
}
