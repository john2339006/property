import type { Metadata } from "next";
import { Manrope, Noto_Sans_SC } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sans-sc",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "兴业物业管理系统",
  description: "Property Management Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${manrope.variable} ${notoSansSC.variable} font-sans bg-background-light dark:bg-background-dark text-text-main antialiased h-screen flex overflow-hidden`}
      >
        <Sidebar />
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background-light dark:bg-background-dark">
          {children}
        </main>
      </body>
    </html>
  );
}
