import type { MetadataRoute } from "next";
import { products } from "@/app/demo-store/_data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const urls: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  for (const product of products) {
    urls.push({
      url: `${baseUrl}/product/${product.slug}`,
      changeFrequency: "weekly",
      priority: 0.8,
      lastModified: product.createdAt,
    });
  }

  return urls;
}


