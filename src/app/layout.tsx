import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono, Chakra_Petch } from "next/font/google";
import "./globals.css";
import AuthProvider from "./auth-provider";
import { env } from "@/env";

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});
const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-chakra",
});

export const metadata: Metadata = {
  title: "CC0-Lib Vote",
  description: "CC0-LIB Prophouse Vote Site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interTight.variable} ${jetBrainsMono.variable} ${chakraPetch.variable}`}>
        <AuthProvider environmentId={env.DYNAMIC_XYZ_ENVIRONMENT_ID}>{children}</AuthProvider>
      </body>
    </html>
  );
}
