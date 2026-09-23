# NPB Notebook

React / Next.js 学習用の「プロ野球ミニ成績分析ツール」です。

公開URL: <https://siytuon.github.io/nextjs-learning/>

現在は、NPB公式サイトで公開されている2026年度個人打撃成績から、セ・パ両リーグの規定打席到達者全44名を表示しています。データの詳細と出典は `data/README.md` を参照してください。

## 起動

このMacでは、ユーザー共通のNode.js 22を `~/.local/` に配置し、bashとzshのどちらでも通常の `node` / `npm` がNode.js 22を使うように設定しています。

このリポジトリの `scripts/npm22` は、環境差による取り違えを防ぐための予備手段です。

```bash
./scripts/npm22 run dev
```

ブラウザで <http://localhost:3000> を開きます。

テストと本番ビルドも通常のnpmコマンドで実行できます。

```bash
./scripts/npm22 run lint
./scripts/npm22 run build
```

## 主なファイル

- `app/page.tsx`: 画面と選手データ
- `app/player-table.tsx`: 検索・リーグ絞り込み・並べ替え
- `app/player-details.tsx`: 選択した選手の詳細成績
- `app/team-badge.tsx`: 表とサマリーで共通利用する球団バッジ
- `app/icon.png`: ブラウザタブなどに表示するサイトアイコン
- `app/apple-icon.png`: iPhoneのホーム画面などに表示するApple Touch Icon
- `app/notebook-icon.png`: ヘッダーに表示するサイトアイコン
- `data/players-2026.csv`: 学習用の実成績スナップショット
- `lib/players.ts`: CSVの読み込みと型変換
- `lib/teams.ts`: 球団コードと表示用クラスの定義
- `app/globals.css`: 見た目
- `app/layout.tsx`: 全ページ共通の枠とメタデータ
- `docs/progress.md`: 毎回の進捗記録

## GitHub Pages

`main` ブランチへpushすると、GitHub Actionsが静的サイトをビルドしてGitHub Pagesへ公開します。Next.jsの設定はGitHub上だけリポジトリ名を `basePath` に追加するため、ローカルでは従来どおり <http://localhost:3000> で確認できます。
