import { Inter, Newsreader } from "next/font/google";
import StoreHeader from "../components/layout/StoreHeader";
import StoreFooter from "../components/layout/StoreFooter";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata = {
  title: "AURA — Warm Editorial Atelier",
  description: "A considered collection for everyday living.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <StoreHeader />
        {children}
        <StoreFooter />
      </body>
    </html>
  );
}
