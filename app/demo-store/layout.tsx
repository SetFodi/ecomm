import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ონლაინ მაღაზია",
  description:
    "მინიმალისტური ონლაინ მაღაზია — ავეჯი, დიზაინი, ელექტრონიკა და აქსესუარები თანამედროვე სივრცეებისთვის.",
};

export default function DemoStoreLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}


