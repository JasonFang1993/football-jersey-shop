"use client";

import Image from "next/image";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import type { CartItem as CartItemType } from "@/lib/types";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="flex gap-4 py-5 border-b border-border last:border-0">
      <div className="w-20 h-20 rounded-lg overflow-hidden bg-surface border border-border shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          width={80}
          height={80}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-foreground truncate">{item.name}</h3>
        <p className="text-xs text-muted mt-0.5">Size: {item.size}</p>
        <p className="text-sm font-semibold text-foreground mt-1">{formatPrice(item.price)}</p>
      </div>

      <div className="flex flex-col items-end gap-2">
        <button
          type="button"
          onClick={() => removeItem(item.productId, item.size)}
          className="text-muted hover:text-red-400 transition-colors"
          aria-label="Remove item"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
            className="w-8 h-8 flex items-center justify-center rounded border border-border text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
          <button
            type="button"
            onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
            className="w-8 h-8 flex items-center justify-center rounded border border-border text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
