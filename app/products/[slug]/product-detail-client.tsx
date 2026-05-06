"use client";

import { useState } from "react";
import { ProductImage } from "@/components/product/ProductImage";
import { PriceDisplay } from "@/components/product/PriceDisplay";
import { SizeSelector } from "@/components/product/SizeSelector";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { useCartStore } from "@/lib/cart-store";
import type { Product, Size } from "@/lib/types";

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [showToast, setShowToast] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (!selectedSize) return;

    addItem({
      productId: product.id,
      name: product.name,
      image: product.images[0],
      size: selectedSize,
      price: product.price,
    });

    setShowToast(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
      <div className="relative aspect-square rounded-xl overflow-hidden bg-surface border border-border">
        <ProductImage
          src={product.images[0]}
          alt={product.name}
          fill
          priority
        />
      </div>

      <div>
        <p className="text-[10px] text-muted uppercase tracking-[0.2em] font-medium">
          {product.league}
        </p>
        <h1
          className="text-3xl md:text-4xl font-bold uppercase tracking-tight mt-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {product.name}
        </h1>

        <div className="mt-3">
          <PriceDisplay price={product.price} originalPrice={product.originalPrice} className="text-xl" />
        </div>

        <p className="mt-5 text-muted leading-relaxed text-sm">{product.description}</p>

        <div className="mt-8">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-foreground mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Size
          </p>
          <SizeSelector
            sizes={product.sizes}
            selected={selectedSize}
            onSelect={setSelectedSize}
          />
          {!selectedSize && (
            <p className="text-xs text-muted mt-2">Please select a size</p>
          )}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
              product.inStock
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
          <span className="text-[10px] text-muted uppercase tracking-wider capitalize">{product.category} Kit</span>
          <span className="text-[10px] text-muted uppercase tracking-wider">{product.season}</span>
        </div>

        <div className="mt-8">
          <Button
            size="lg"
            className="w-full"
            disabled={!selectedSize || !product.inStock}
            onClick={handleAddToCart}
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>

        <div className="mt-6 flex gap-6 text-xs text-muted">
          <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H18.75m-7.5-3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
            Free shipping $75+
          </div>
          <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
            30-day returns
          </div>
        </div>
      </div>

      <Toast
        message={`${product.name} (${selectedSize}) added to cart`}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
