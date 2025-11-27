import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MAISON - თანამედროვე დიზაინი შენი სივრცისთვის",
  description:
    "კურირებული კოლექცია თანამედროვე სახლისა და სამუშაო სივრცისთვის - ავეჯი, ელექტრონიკა, დიზაინი და აქსესუარები.",
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
        className={`${cormorant.variable} ${outfit.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
