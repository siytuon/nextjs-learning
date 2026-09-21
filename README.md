# Ballpark Stats

React / Next.js 学習用の「プロ野球ミニ成績分析ツール」です。

公開URL: <https://siytuon.github.io/nextjs-learning/>

現在は、NPB公式サイトで公開されている2026年度個人打撃成績から、セ・パ両リーグの規定打席到達者上位10名ずつを表示しています。データの詳細と出典は `data/README.md` を参照してください。

## 起動

このリポジトリには、Mac全体のNode.js設定を変えずに使えるNode.js 22を `.tools/` に配置しています。`scripts/npm22` を経由すると、システム側に古いNode.jsが残っていても必ずこのNode.js 22でnpmを実行します。

```bash
./scripts/npm22 run dev
```

ブラウザで <http://localhost:3000> を開きます。

テストと本番ビルドも同じラッパーを使います。

```bash
./scripts/npm22 run lint
./scripts/npm22 run build
```

## 主なファイル

- `app/page.tsx`: 画面と選手データ
- `data/players-2026.csv`: 学習用の実成績スナップショット
- `lib/players.ts`: CSVの読み込みと型変換
- `app/globals.css`: 見た目
- `app/layout.tsx`: 全ページ共通の枠とメタデータ
- `docs/progress.md`: 毎回の進捗記録

## GitHub Pages

`main` ブランチへpushすると、GitHub Actionsが静的サイトをビルドしてGitHub Pagesへ公開します。Next.jsの設定はGitHub上だけリポジトリ名を `basePath` に追加するため、ローカルでは従来どおり <http://localhost:3000> で確認できます。
