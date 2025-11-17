import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StoreShell } from "@/app/demo-store/_components/StoreShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ონლაინ მაღაზია – თანამედროვე ტექნიკა და დიზაინი",
  description:
    "პროფესიონალური ონლაინ მაღაზია თანამედროვე სახლისა და ოფისისთვის — ტექნიკა, ავეჯი და აქსესუარები ერთ სივრცეში.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ka">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreShell>{children}</StoreShell>
      </body>
    </html>
  );
}
