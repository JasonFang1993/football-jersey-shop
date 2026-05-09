"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FilterSidebar } from "@/components/filters/FilterSidebar";
import { MobileFilterButton } from "./mobile-filter-button";
import type { Product } from "@/lib/types";

function filterProducts(products: Product[], params: URLSearchParams): Product[] {
  const league = params.get("league");
  const category = params.get("category");
  const type = params.get("type");
  const season = params.get("season");

  return products.filter((p) => {
    if (league && p.league.toLowerCase().replace(/\s+/g, "-") !== league) return false;
    if (category && p.category !== category) return false;
    if (type && p.type !== type) return false;
    if (season && p.season !== season) return false;
    return true;
  });
}

function ProductsContent({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const filtered = filterProducts(products, searchParams);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">All Jerseys</h1>
        <p className="text-sm text-muted mt-1">{filtered.length} products</p>
      </div>

      <div className="flex items-center justify-between mb-4 lg:hidden">
        <MobileFilterButton />
      </div>

      <div className="flex gap-8">
        <aside className="hidden lg:block w-64 shrink-0">
          <FilterSidebar />
        </aside>

        <div className="flex-1">
          <ProductGrid products={filtered} />
        </div>
      </div>
    </div>
  );
}

export function ProductsPageClient({ products }: { products: Product[] }) {
  return (
    <Suspense>
      <ProductsContent products={products} />
    </Suspense>
  );
}
