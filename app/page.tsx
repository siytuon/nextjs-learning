import { loadPlayers, playerData } from "@/lib/players";

export default async function Home() {
  const players = await loadPlayers();
  const leader = players[0];
  const totalHomeRuns = players.reduce(
    (sum, player) => sum + player.homeRuns,
    0,
  );
  const averageGames = Math.round(
    players.reduce((sum, player) => sum + player.games, 0) / players.length,
  );

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
              <dt>本塁打合計</dt>
              <dd>{totalHomeRuns}<span>本</span></dd>
            </div>
            <div>
              <dt>平均出場</dt>
              <dd>{averageGames}<span>試合</span></dd>
            </div>
            <div>
              <dt>掲載選手</dt>
              <dd>{players.length}<span>名</span></dd>
            </div>
          </dl>
        </section>

        <section className="playerSection" aria-labelledby="list-title">
          <div className="listHeading">
            <div>
              <h2 id="list-title">成績一覧</h2>
              <p>両リーグを通じて打率の高い順に表示</p>
            </div>
            <p className="resultCount">全 {players.length} 件</p>
          </div>

          <p className="scrollHint">表は横にスクロールできます</p>
          <div className="tableWrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">選手</th>
                  <th scope="col">リーグ</th>
                  <th scope="col">チーム</th>
                  <th scope="col">試合</th>
                  <th scope="col">打率</th>
                  <th scope="col">本塁打</th>
                  <th scope="col">打点</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, index) => (
                  <tr key={`${player.league}-${player.name}`}>
                    <td>
                      <span className="rank">{index + 1}</span>
                      <strong>{player.name}</strong>
                    </td>
                    <td><span className="league">{player.league}</span></td>
                    <td>{player.team}</td>
                    <td>{player.games}</td>
                    <td className="average">{player.average.toFixed(3)}</td>
                    <td>{player.homeRuns}</td>
                    <td>{player.rbi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
        </section>
      </div>

      <footer>
        <p>Ballpark Stats — React / Next.js 学習プロジェクト</p>
      </footer>
    </main>
  );
}
