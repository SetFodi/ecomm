import type { Metadata } from "next";
import { products } from "./_data/products";
import { ProductListingClient } from "./_components/ProductListingClient";

export const metadata: Metadata = {
  title: "დემო მაღაზია – პროდუქტების კატალოგი",
  description:
    "გაეცანი დემო მაღაზიის პროდუქტებს: ავეჯი, ელექტრონიკა, დიზაინის აქსესუარები და სხვა. ფილტრი, დალაგება და სწრაფი ძებნა ერთ სივრცეში.",
};

export default function DemoStorePage(): JSX.Element {
  return <ProductListingClient products={products} />;
}


