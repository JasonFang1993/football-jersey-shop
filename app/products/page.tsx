import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import { ProductsPageClient } from "./products-page-client";

export const metadata: Metadata = {
  title: "All Jerseys",
  description: "Browse our collection of official football jerseys from top clubs and national teams worldwide.",
};

export default function ProductsPage() {
  const products = getAllProducts();
  return <ProductsPageClient products={products} />;
}
