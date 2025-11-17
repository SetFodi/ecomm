export type ProductCategory =
  | "ავეჯი"
  | "ელექტრონიკა"
  | "დისაინი"
  | "აქსესუარები";

export interface Product {
  id: string;
  slug: string;
  title: string;
  price: number;
  oldPrice?: number;
  currency: "GEL";
  images: string[];
  category: ProductCategory;
  tags: string[];
  rating: number;
  reviewsCount: number;
  stock: number;
  shortDescription: string;
  description: string;
  features: string[];
  specs?: Record<string, string>;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}


