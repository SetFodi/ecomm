import type { Metadata } from "next";
import { SuccessSummary } from "@/app/demo-store/_components/SuccessSummary";

interface SuccessPageProps {
  searchParams?: {
    order?: string;
  };
}

export const metadata: Metadata = {
  title: "შეკვეთაა მიღებული (დემო) – დემო მაღაზია",
  description:
    "დემო შეკვეთის წარმატებული გვერდი — ნახე შეკვეთილი პროდუქტები, ჯამური ფასი და დაბრუნდი მაღაზიაში.",
};

export default function SuccessPage({
  searchParams,
}: SuccessPageProps): JSX.Element {
  const orderId = searchParams?.order;

  return <SuccessSummary orderId={orderId} />;
}


