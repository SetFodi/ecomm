import type { JSX } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Product } from "@/types/store";
import { products, getProductBySlug } from "@/app/demo-store/_data/products";
import { ProductDetailClient } from "@/app/demo-store/_components/ProductDetailClient";

interface ProductPageParams {
  slug: string;
}

interface ProductPageProps {
  params: Promise<ProductPageParams>;
}

function getRelatedProducts(current: Product): Product[] {
  return products
    .filter(
      (product) =>
        product.id !== current.id && product.category === current.category,
    )
    .slice(0, 4);
}

export async function generateStaticParams(): Promise<ProductPageParams[]> {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(
  { params }: ProductPageProps,
): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(decodeURIComponent(slug));

  if (!product) {
    return {
      title: "პროდუქტი ვერ მოიძებნა – დემო მაღაზია",
      description: "მოთხოვნილი პროდუქტი ვერ მოიძებნა დემო მაღაზიაში.",
    };
  }

  const url = `/product/${product.slug}`;
  const images = product.images.length
    ? product.images
    : ["/images/furniture-1.svg"];

  const title = `${product.title} – დემო მაღაზია`;
  const description =
    product.shortDescription ||
    product.description.slice(0, 140);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      // Next.js 16 supports a limited set of OpenGraph types.
      // Using "website" keeps metadata valid while still sharing product info via jsonLd below.
      type: "website",
      images: images.map((src) => ({ url: src })),
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ProductPage({
  params,
}: ProductPageProps): Promise<JSX.Element> {
  const { slug } = await params;
  const product = getProductBySlug(decodeURIComponent(slug));

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images.length
      ? product.images
      : ["/images/furniture-1.svg"],
    description:
      product.shortDescription ||
      product.description.slice(0, 160),
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: "დემო მაღაზია",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating.toFixed(1),
      reviewCount: product.reviewsCount,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "GEL",
      price: product.price.toFixed(2),
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: `/product/${product.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient
        product={product}
        relatedProducts={relatedProducts}
      />
    </>
  );
}


