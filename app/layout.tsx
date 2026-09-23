import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NPB Notebook",
  description: "React / Next.js 学習用のプロ野球ミニ成績分析ツール",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
