"use client";

import { useState } from "react";
import type { Player } from "@/lib/players";
import PlayerComparison from "./player-comparison";
import PlayerDetails from "./player-details";
import PlayerTable from "./player-table";
import TeamBadge from "./team-badge";

type LeagueLeaders = {
  league: "セ" | "パ";
  average: Player;
  homeRuns: Player;
  rbi: Player;
};

type PlayerDashboardProps = {
  players: Player[];
  leagueLeaders: LeagueLeaders[];
};

function isSamePlayer(first: Player, second: Player) {
  return first.league === second.league && first.name === second.name;
}

export default function PlayerDashboard({
  players,
  leagueLeaders,
}: PlayerDashboardProps) {
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  function togglePlayer(player: Player) {
    const alreadySelected = selectedPlayers.some((currentPlayer) =>
      isSamePlayer(currentPlayer, player),
    );

    if (alreadySelected) {
      setIsDetailsOpen(selectedPlayers.length === 2);
    } else {
      setIsDetailsOpen(selectedPlayers.length === 0);
    }

    setSelectedPlayers((currentPlayers) => {
      if (currentPlayers.some((currentPlayer) => isSamePlayer(currentPlayer, player))) {
        return currentPlayers.filter(
          (currentPlayer) => !isSamePlayer(currentPlayer, player),
        );
      }

      if (currentPlayers.length < 2) {
        return [...currentPlayers, player];
      }

      return [currentPlayers[1], player];
    });
  }

  function isSelected(player: Player) {
    return selectedPlayers.some((selectedPlayer) =>
      isSamePlayer(selectedPlayer, player),
    );
  }

  function clearSelectedPlayers() {
    setSelectedPlayers([]);
    setIsDetailsOpen(false);
  }

  return (
    <>
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
                    <button
                      className="leaderSelectButton"
                      type="button"
                      onClick={() => togglePlayer(leaders.average)}
                      aria-pressed={isSelected(leaders.average)}
                    >
                      {leaders.average.name}
                    </button>
                    <TeamBadge team={leaders.average.team} />
                  </span>
                  <span className="leaderValue">{leaders.average.average.toFixed(3)}</span>
                </dd>
              </div>
              <div>
                <dt>本塁打1位</dt>
                <dd>
                  <span className="leaderPlayer">
                    <button
                      className="leaderSelectButton"
                      type="button"
                      onClick={() => togglePlayer(leaders.homeRuns)}
                      aria-pressed={isSelected(leaders.homeRuns)}
                    >
                      {leaders.homeRuns.name}
                    </button>
                    <TeamBadge team={leaders.homeRuns.team} />
                  </span>
                  <span className="leaderValue">{leaders.homeRuns.homeRuns}<small>本</small></span>
                </dd>
              </div>
              <div>
                <dt>打点1位</dt>
                <dd>
                  <span className="leaderPlayer">
                    <button
                      className="leaderSelectButton"
                      type="button"
                      onClick={() => togglePlayer(leaders.rbi)}
                      aria-pressed={isSelected(leaders.rbi)}
                    >
                      {leaders.rbi.name}
                    </button>
                    <TeamBadge team={leaders.rbi.team} />
                  </span>
                  <span className="leaderValue">{leaders.rbi.rbi}<small>点</small></span>
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </section>

      <PlayerTable
        players={players}
        selectedPlayers={selectedPlayers}
        onTogglePlayer={togglePlayer}
      />

      {selectedPlayers.length === 1 && isDetailsOpen && (
        <PlayerDetails
          player={selectedPlayers[0]}
          onAddComparison={() => setIsDetailsOpen(false)}
          onClose={clearSelectedPlayers}
        />
      )}

      {selectedPlayers.length === 2 && (
        <PlayerComparison
          players={[selectedPlayers[0], selectedPlayers[1]]}
          allPlayers={players}
          onRemovePlayer={togglePlayer}
          onClose={clearSelectedPlayers}
        />
      )}
    </>
  );
}
