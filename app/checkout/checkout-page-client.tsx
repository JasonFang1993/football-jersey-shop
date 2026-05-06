"use client";

import { useCartStore } from "@/lib/cart-store";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CartEmpty } from "@/components/cart/CartEmpty";

export function CheckoutPageClient() {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CartEmpty />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: "Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
        className="mb-6"
      />

      <h1
        className="text-2xl font-bold uppercase tracking-tight mb-8"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2
            className="text-sm font-medium uppercase tracking-[0.15em] text-foreground mb-5"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Shipping Information
          </h2>
          <CheckoutForm />
        </div>

        <div className="lg:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
