import { readFile } from "node:fs/promises";
import path from "node:path";

export type Player = {
  leagueRank: number;
  league: string;
  team: string;
  name: string;
  average: number;
  games: number;
  plateAppearances: number;
  atBats: number;
  runs: number;
  hits: number;
  doubles: number;
  triples: number;
  homeRuns: number;
  totalBases: number;
  rbi: number;
  stolenBases: number;
  caughtStealing: number;
  sacrificeHits: number;
  sacrificeFlies: number;
  walks: number;
  intentionalWalks: number;
  hitByPitch: number;
  strikeouts: number;
  doublePlays: number;
  sluggingPercentage: number;
  onBasePercentage: number;
};

const numericFields = new Set([
  "leagueRank",
  "average",
  "games",
  "plateAppearances",
  "atBats",
  "runs",
  "hits",
  "doubles",
  "triples",
  "homeRuns",
  "totalBases",
  "rbi",
  "stolenBases",
  "caughtStealing",
  "sacrificeHits",
  "sacrificeFlies",
  "walks",
  "intentionalWalks",
  "hitByPitch",
  "strikeouts",
  "doublePlays",
  "sluggingPercentage",
  "onBasePercentage",
]);

export async function loadPlayers(): Promise<Player[]> {
  const csvPath = path.join(process.cwd(), "data", "players-2026.csv");
  const csv = await readFile(csvPath, "utf8");
  const [headerLine, ...dataLines] = csv.trim().split("\n");
  const headers = headerLine.split(",");

  return dataLines
    .filter(Boolean)
    .map((line) => {
      const values = line.split(",");
      return Object.fromEntries(
        headers.map((header, index) => [
          header,
          numericFields.has(header) ? Number(values[index]) : values[index],
        ]),
      ) as Player;
    })
    .sort((a, b) => b.average - a.average || b.homeRuns - a.homeRuns);
}

export const playerData = {
  asOf: "2026-09-20",
  fetchedAt: "2026-09-21",
  scope: "セ・パ両リーグ 規定打席到達者 全選手",
  sources: [
    {
      label: "セントラル・リーグ個人打撃成績",
      url: "https://npb.jp/bis/2026/stats/bat_c.html",
    },
    {
      label: "パシフィック・リーグ個人打撃成績",
      url: "https://npb.jp/bis/2026/stats/bat_p.html",
    },
  ],
} as const;
