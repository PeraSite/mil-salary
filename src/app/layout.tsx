import "~/styles/globals.css";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "군대 총 급여 계산기",
  description:
    "군 생활 중 받는 급여, 매칭 지원금, 적금 이자를 포함한 총 급여 계산기",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`font-pretendard tracking-tight`}>{children}</body>
    </html>
  );
}
