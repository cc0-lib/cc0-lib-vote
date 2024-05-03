import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono, Chakra_Petch } from "next/font/google";
import "./globals.css";
import AuthProvider from "./auth-provider";
import { env } from "@/env";
import { UserStoreProvider } from "@/store/store-provider";
import { Analytics } from "@vercel/analytics/react";

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrains",
});
const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-chakra",
});

export const metadata: Metadata = {
  title: "CC0-LIB Community Voting",
  description: "Vote for your favorite CC0-LIB Zine Cover Art entries",
  openGraph: {
    type: "website",
    url: "https://vote.cc0-lib.wtf",
    title: "CC0-LIB Community Voting",
    description: "Vote for your favorite CC0-LIB Zine Cover Art entries",
    images: [
      {
        url: "https://vote.cc0-lib.wtf/vote-og.png",
        width: 800,
        height: 400,
        alt: "CC0-LIB Community Voting",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interTight.variable} ${jetBrainsMono.variable} ${chakraPetch.variable}`}>
        <UserStoreProvider>
          <AuthProvider environmentId={env.DYNAMIC_XYZ_ENVIRONMENT_ID}>
            {children}
            <Analytics />
          </AuthProvider>
        </UserStoreProvider>
      </body>
    </html>
  );
}
