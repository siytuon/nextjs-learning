import PlayerTable from "./player-table";
import { loadPlayers, playerData } from "@/lib/players";

export default async function Home() {
  const players = await loadPlayers();
  const leader = players[0];
  const averageHomeRuns = (
    players.reduce((sum, player) => sum + player.homeRuns, 0) / players.length
  ).toFixed(1);
  const combinedBattingAverage = (
    players.reduce((sum, player) => sum + player.hits, 0) /
    players.reduce((sum, player) => sum + player.atBats, 0)
  ).toFixed(3);

  return (
    <main>
      <header className="siteHeader">
        <div className="headerInner">
          <a className="brand" href="#top" aria-label="Ballpark Stats ホーム">
            <span className="brandMark" aria-hidden="true">B</span>
            <span>Ballpark Stats</span>
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

        <section className="records" aria-label="成績サマリー">
          <article className="primaryRecord">
            <div>
              <p className="recordLabel">打率トップ</p>
              <p className="recordPlayer">{leader.name}</p>
              <p className="recordTeam">{leader.team}</p>
            </div>
            <p className="recordValue">{leader.average.toFixed(3)}</p>
          </article>
          <dl className="subRecords">
            <div>
              <dt>平均本塁打</dt>
              <dd>{averageHomeRuns}<span>本</span></dd>
            </div>
            <div>
              <dt>平均打率</dt>
              <dd>{combinedBattingAverage}</dd>
            </div>
            <div>
              <dt>掲載選手</dt>
              <dd>{players.length}<span>名</span></dd>
            </div>
          </dl>
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
        <p>Ballpark Stats — React / Next.js 学習プロジェクト</p>
      </footer>
    </main>
  );
}
