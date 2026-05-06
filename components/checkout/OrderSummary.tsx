"use client";

import Image from "next/image";
import { useCartStore } from "@/lib/cart-store";
import { CartSummary } from "@/components/cart/CartSummary";
import { formatPrice } from "@/lib/utils";

export function OrderSummary() {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice());

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <h2
        className="text-sm font-medium uppercase tracking-[0.15em] text-foreground mb-5"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Order Summary
      </h2>

      <div className="space-y-3 mb-6">
        {items.map((item) => (
          <div key={`${item.productId}-${item.size}`} className="flex items-center gap-3">
            <div className="w-12 h-12 rounded overflow-hidden bg-background border border-border shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground truncate">{item.name}</p>
              <p className="text-xs text-muted">
                {item.size} x {item.quantity}
              </p>
            </div>
            <p className="text-sm font-medium text-foreground">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      <CartSummary subtotal={totalPrice} />
    </div>
  );
}
