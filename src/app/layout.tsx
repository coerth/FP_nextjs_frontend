import type { Metadata } from "next";
import localFont from "next/font/local";
import Navigation from "../components/navigation/navbar";
import "./globals.css";
import { DecksProvider } from "@/context/DecksContext";
import Providers from "@/components/root/providers";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "DeckBuild",
  description: "Make your next deck",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Providers>
          <Navigation />
          <DecksProvider>
             {children}
          </DecksProvider>
          </Providers>
      </body>
    </html>
  );
}
