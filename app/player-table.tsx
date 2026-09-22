"use client";

import { useState } from "react";
import type { Player } from "@/lib/players";

type PlayerTableProps = {
  players: Player[];
};

const teamClassNames: Record<string, string> = {
  "阪神タイガース": "team-hanshin",
  "読売ジャイアンツ": "team-giants",
  "横浜DeNAベイスターズ": "team-baystars",
  "福岡ソフトバンクホークス": "team-hawks",
  "北海道日本ハムファイターズ": "team-fighters",
  "千葉ロッテマリーンズ": "team-marines",
  "オリックス・バファローズ": "team-buffaloes",
  "埼玉西武ライオンズ": "team-lions",
  "中日ドラゴンズ": "team-dragons",
  "東京ヤクルトスワローズ": "team-swallows",
  "広島東洋カープ": "team-carp",
  "東北楽天ゴールデンイーグルス": "team-eagles",
};

const teamShortNames: Record<string, string> = {
  "阪神タイガース": "神",
  "読売ジャイアンツ": "巨",
  "横浜DeNAベイスターズ": "デ",
  "中日ドラゴンズ": "中",
  "東京ヤクルトスワローズ": "ヤ",
  "広島東洋カープ": "広",
  "北海道日本ハムファイターズ": "日",
  "福岡ソフトバンクホークス": "ソ",
  "千葉ロッテマリーンズ": "ロ",
  "オリックス・バファローズ": "オ",
  "埼玉西武ライオンズ": "西",
  "東北楽天ゴールデンイーグルス": "楽",
};

export default function PlayerTable({ players }: PlayerTableProps) {
  const [query, setQuery] = useState("");
  const filteredPlayers = players.filter(
    (player) =>
      player.name.includes(query) ||
      player.team.includes(query),
  );

  return (
    <section className="playerSection" aria-labelledby="list-title">
      <div className="listHeading">
        <div>
          <h2 id="list-title">成績一覧</h2>
          <p>両リーグを通じて打率の高い順に表示</p>
        </div>
        <p className="resultCount">{filteredPlayers.length} 件</p>
      </div>

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
              <th className="mobileMetricHeading" scope="col">打率</th>
              <th className="mobileHidden" scope="col">本塁打</th>
              <th className="mobileHidden" scope="col">打点</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers.map((player, index) => (
              <tr key={`${player.league}-${player.name}`}>
                <td>
                  <span className="playerCell">
                    <span className="rank">{index + 1}</span>
                    <span className="playerIdentity">
                      <strong>{player.name}</strong>
                    </span>
                  </span>
                </td>
                <td className="mobileTeamCell">
                  <span className={`mobileTeamCode ${teamClassNames[player.team] ?? ""}`}>
                    {teamShortNames[player.team] ?? "-"}
                  </span>
                </td>
                <td className="mobileHidden">
                  <span className={`league league-${player.league === "セ" ? "central" : "pacific"}`}>
                    {player.league}
                  </span>
                </td>
                <td className="mobileHidden">
                  <span className={`teamName ${teamClassNames[player.team] ?? ""}`}>
                    {player.team}
                  </span>
                </td>
                <td className="mobileHidden">{player.games}</td>
                <td className="average">{player.average.toFixed(3)}</td>
                <td className="mobileHidden">{player.homeRuns}</td>
                <td className="mobileHidden">{player.rbi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredPlayers.length === 0 && (
        <p className="emptyResult">条件に一致する選手が見つかりませんでした。</p>
      )}
    </section>
  );
}
