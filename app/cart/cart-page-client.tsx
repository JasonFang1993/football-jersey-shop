"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { CartEmpty } from "@/components/cart/CartEmpty";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export function CartPageClient() {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice());

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CartEmpty />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Cart" }]} className="mb-6" />

      <h1
        className="text-2xl font-bold uppercase tracking-tight mb-8"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {items.map((item) => (
            <CartItem key={`${item.productId}-${item.size}`} item={item} />
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-surface border border-border rounded-lg p-6 sticky top-24">
            <h2
              className="text-sm font-medium uppercase tracking-[0.15em] text-foreground mb-5"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Order Summary
            </h2>
            <CartSummary subtotal={totalPrice} />
            <Link href="/checkout" className="block mt-6">
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </Link>
            <Link
              href="/products"
              className="block text-center text-xs text-muted hover:text-foreground mt-4 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
