import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from '@vercel/speed-insights/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BeeFair - Smart Living for Busy Bees",
  description: "Gata cu certurile pe bani. Scanează facturile și împarte cheltuielile automat.",
  metadataBase: new URL('https://beefair.ro'),
  keywords: ["facturi", "studenti", "chirie", "split bill", "romania"],
  openGraph: {
    title: "BeeFair - Smart Living",
    description: "Aplicația care te scapă de certurile din cauza banilor în casă.",
    url: 'https://beefair.ro',
    siteName: 'BeeFair',
    locale: 'ro_RO',
    type: 'website',
  },
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
        {children}
        <Analytics/>
        <SpeedInsights />
      </body>
    </html>
  );
}
