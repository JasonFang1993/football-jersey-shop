import Link from "next/link";
import { ProductImage } from "./ProductImage";
import { PriceDisplay } from "./PriceDisplay";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-surface border border-border card-hover">
        <ProductImage
          src={product.images[0]}
          alt={product.name}
          fill
          className="img-zoom"
        />
        {product.tags.includes("new-arrival") && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-accent text-black rounded">
            New
          </span>
        )}
        {product.originalPrice && product.originalPrice > product.price && (
          <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-red-600 text-white rounded">
            Sale
          </span>
        )}
      </div>
      <div className="mt-3 px-0.5">
        <p className="text-[10px] text-muted uppercase tracking-[0.15em] font-medium">
          {product.team}
        </p>
        <h3 className="text-sm font-medium text-foreground mt-1 group-hover:text-accent transition-colors line-clamp-2 leading-snug">
          {product.name}
        </h3>
        <PriceDisplay
          price={product.price}
          originalPrice={product.originalPrice}
          className="mt-2"
        />
      </div>
    </Link>
  );
}
