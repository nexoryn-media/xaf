import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Nexoryn Media | Unbeatable Affiliate Solutions",
  description: "Nexoryn Media delivers unbeatable performance and top-tier affiliate marketing solutions.",
  icons: {
    icon: "/nfavicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth antialiased bg-black text-white`}>
      <body className="min-h-screen bg-black font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
