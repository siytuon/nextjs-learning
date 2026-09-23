type TeamDisplay = {
  code: string;
  className: string;
};

const teamDisplays: Record<string, TeamDisplay> = {
  "阪神タイガース": { code: "阪", className: "team-hanshin" },
  "読売ジャイアンツ": { code: "巨", className: "team-giants" },
  "横浜DeNAベイスターズ": { code: "横", className: "team-baystars" },
  "中日ドラゴンズ": { code: "中", className: "team-dragons" },
  "東京ヤクルトスワローズ": { code: "ヤ", className: "team-swallows" },
  "広島東洋カープ": { code: "広", className: "team-carp" },
  "福岡ソフトバンクホークス": { code: "ソ", className: "team-hawks" },
  "埼玉西武ライオンズ": { code: "西", className: "team-lions" },
  "北海道日本ハムファイターズ": { code: "日", className: "team-fighters" },
  "オリックス・バファローズ": { code: "オ", className: "team-buffaloes" },
  "千葉ロッテマリーンズ": { code: "ロ", className: "team-marines" },
  "東北楽天ゴールデンイーグルス": { code: "楽", className: "team-eagles" },
};

export function getTeamDisplay(team: string): TeamDisplay {
  return teamDisplays[team] ?? { code: "-", className: "" };
}
