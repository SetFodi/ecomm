import type { Metadata } from "next";
import { CheckoutForm } from "@/app/demo-store/_components/CheckoutForm";

export const metadata: Metadata = {
  title: "შეკვეთა – დემო მაღაზია",
  description:
    "შეავსე მარტივი დემო შეკვეთის ფორმა: სახელი, გვარი, ელფოსტა, ტელეფონი და მისამართი. გადახდა რეალურად არ სრულდება.",
};

export default function CheckoutPage() {
  return <CheckoutForm />;
}


