import type { Metadata } from "next";
import "./globals.css";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isProjectPage =
  process.env.GITHUB_ACTIONS === "true" && !repositoryName.endsWith(".github.io");
const basePath = isProjectPage ? `/${repositoryName}` : "";

export const metadata: Metadata = {
  title: "NPB Notebook",
  description: "React / Next.js 学習用のプロ野球ミニ成績分析ツール",
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico`, sizes: "any" },
      {
        url: `${basePath}/favicon-32x32.png`,
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: `${basePath}/favicon-64x64.png`,
        sizes: "64x64",
        type: "image/png",
      },
    ],
    shortcut: `${basePath}/favicon.ico`,
    apple: {
      url: `${basePath}/apple-touch-icon.png`,
      sizes: "180x180",
      type: "image/png",
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
