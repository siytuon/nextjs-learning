import Image from "next/image";
import PlayerTable from "./player-table";
import TeamBadge from "./team-badge";
import notebookIcon from "./notebook-icon.jpg";
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
            <Image className="brandIcon" src={notebookIcon} alt="" width={32} height={32} priority unoptimized />
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

        <section className="leaderboards" aria-label="リーグ別トップ成績">
          {leagueLeaders.map((leaders) => (
            <article
              className={`leagueBoard leagueBoard-${leaders.league === "セ" ? "central" : "pacific"}`}
              key={leaders.league}
            >
              <header className="leagueBoardHeading">
                <span>{leaders.league}</span>
                <h2>{leaders.league === "セ" ? "セントラル・リーグ" : "パシフィック・リーグ"}</h2>
              </header>
              <dl className="leaderMetrics">
                <div>
                  <dt>打率1位</dt>
                  <dd>
                    <span className="leaderPlayer">
                      <strong>{leaders.average.name}</strong>
                      <TeamBadge team={leaders.average.team} />
                    </span>
                    <span className="leaderValue">{leaders.average.average.toFixed(3)}</span>
                  </dd>
                </div>
                <div>
                  <dt>本塁打1位</dt>
                  <dd>
                    <span className="leaderPlayer">
                      <strong>{leaders.homeRuns.name}</strong>
                      <TeamBadge team={leaders.homeRuns.team} />
                    </span>
                    <span className="leaderValue">{leaders.homeRuns.homeRuns}<small>本</small></span>
                  </dd>
                </div>
                <div>
                  <dt>打点1位</dt>
                  <dd>
                    <span className="leaderPlayer">
                      <strong>{leaders.rbi.name}</strong>
                      <TeamBadge team={leaders.rbi.team} />
                    </span>
                    <span className="leaderValue">{leaders.rbi.rbi}<small>点</small></span>
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </section>

        <PlayerTable players={players} />
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
