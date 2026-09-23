"use client";

import { useState } from "react";
import type { Player } from "@/lib/players";
import PlayerDetails from "./player-details";
import TeamBadge from "./team-badge";

type PlayerTableProps = {
  players: Player[];
};

type SortKey = "average" | "homeRuns" | "rbi";

type FilterKey = "all" | "central" | "pacific";

const sortLabels: Record<SortKey, string> = {
  average: "打率",
  homeRuns: "本塁打",
  rbi: "打点",
};

export default function PlayerTable({ players }: PlayerTableProps) {
  const [query, setQuery] = useState("");
  const [filterKey, setFilterKey] = useState<FilterKey>("all");
  const [sortKey, setSortKey] = useState<SortKey>("average");
  const [selectedPlayer, setSelectedPlayer] =
    useState<Player | null>(null);

  const leaguePlayers = players.filter((player) => {
    if (filterKey === "all") return true;
    if (filterKey === "central") return player.league === "セ";
    if (filterKey === "pacific") return player.league === "パ";
    return true;
  });
  const rankedPlayers = [...leaguePlayers]
    .sort((a, b) => b[sortKey] - a[sortKey])
    .map((player, index) => ({ player, rank: index + 1 }));
  const visiblePlayers = rankedPlayers.filter(
    ({ player }) =>
      player.name.includes(query) ||
      player.team.includes(query),
  );

  return (
    <section className="playerSection" aria-labelledby="list-title">
      <div className="listHeading">
        <div>
          <h2 id="list-title">成績一覧</h2>
          <p>{sortLabels[sortKey]}の高い順に表示</p>
        </div>
        <p className="resultCount">{visiblePlayers.length} 件</p>
      </div>

      <div className="tableTools">
        <div className="searchField">
          <label htmlFor="player-search">選手を検索</label>
          <input
            id="player-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="選手名・チーム名を入力"
          />
        </div>

        <div className="filterLeague" aria-label="リーグフィルター">
          <span>リーグ</span>
          <button className="leagueFilterAll" type="button" onClick={() => setFilterKey("all")} aria-pressed={filterKey === "all"}>すべて</button>
          <button className="leagueFilterCentral" type="button" onClick={() => setFilterKey("central")} aria-pressed={filterKey === "central"}>セ</button>
          <button className="leagueFilterPacific" type="button" onClick={() => setFilterKey("pacific")} aria-pressed={filterKey === "pacific"}>パ</button>
        </div>

        <div className="sortControls" aria-label="並べ替え">
          <span>並べ替え</span>
          <button type="button" onClick={() => setSortKey("average")} aria-pressed={sortKey === "average"}>打率</button>
          <button type="button" onClick={() => setSortKey("homeRuns")} aria-pressed={sortKey === "homeRuns"}>本塁打</button>
          <button type="button" onClick={() => setSortKey("rbi")} aria-pressed={sortKey === "rbi"}>打点</button>
        </div>
      </div>

      <p className="scrollHint">表は横にスクロールできます</p>
      <div className="tableWrap">
        <table>
          <colgroup>
            <col className="colPlayer" />
            <col className="colMobileTeam" />
            <col className="colLeague" />
            <col className="colTeam" />
            <col className="colGames" />
            <col className="colAverage" />
            <col className="colHomeRuns" />
            <col className="colRbi" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">選手</th>
              <th className="mobileTeamHeading" scope="col">球団</th>
              <th className="mobileHidden" scope="col">リーグ</th>
              <th className="mobileHidden" scope="col">チーム</th>
              <th className="mobileHidden" scope="col">試合</th>
              <th
                className="mobileMetricHeading"
                scope="col"
                aria-sort={sortKey === "average" ? "descending" : undefined}
              >
                <button
                  className="desktopMetric tableSortButton"
                  type="button"
                  onClick={() => setSortKey("average")}
                >
                  打率
                </button>
                <span className="mobileMetric">{sortLabels[sortKey]}</span>
              </th>
              <th className="mobileHidden" scope="col" aria-sort={sortKey === "homeRuns" ? "descending" : undefined}>
                <button className="tableSortButton" type="button" onClick={() => setSortKey("homeRuns")}>
                  本塁打
                </button>
              </th>
              <th className="mobileHidden" scope="col" aria-sort={sortKey === "rbi" ? "descending" : undefined}>
                <button className="tableSortButton" type="button" onClick={() => setSortKey("rbi")}>
                  打点
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {visiblePlayers.map(({ player, rank }) => (
              <tr key={`${player.league}-${player.name}`}>
                <td>
                  <span className="playerCell">
                    <span className="rank">{rank}</span>
                    <span className="playerIdentity">
                      <button
                        className="playerSelectButton"
                        type="button"
                        onClick={() => setSelectedPlayer(player)}
                        aria-pressed={selectedPlayer?.league === player.league && selectedPlayer?.name === player.name}
                      >
                        {player.name}
                      </button>
                    </span>
                  </span>
                </td>
                <td className="mobileTeamCell">
                  <TeamBadge team={player.team} />
                </td>
                <td className="mobileHidden">
                  <span className={`league league-${player.league === "セ" ? "central" : "pacific"}`}>
                    {player.league}
                  </span>
                </td>
                <td className="mobileHidden">
                  <TeamBadge team={player.team} showName />
                </td>
                <td className="mobileHidden">{player.games}</td>
                <td className={`mobileMetricValue ${sortKey === "average" ? "selectedMetric" : ""}`}>
                  <span className="desktopMetric">{player.average.toFixed(3)}</span>
                  <span className="mobileMetric">
                    {sortKey === "average" ? player.average.toFixed(3) : player[sortKey]}
                  </span>
                </td>
                <td className={`mobileHidden ${sortKey === "homeRuns" ? "selectedMetric" : ""}`}>
                  {player.homeRuns}
                </td>
                <td className={`mobileHidden ${sortKey === "rbi" ? "selectedMetric" : ""}`}>
                  {player.rbi}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedPlayer && (
        <PlayerDetails player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />
      )}

      {visiblePlayers.length === 0 && (
        <p className="emptyResult">条件に一致する選手が見つかりませんでした。</p>
      )}
    </section>
  );
}
