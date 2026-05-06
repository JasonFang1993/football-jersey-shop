import { formatPrice } from "@/lib/utils";
import { SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

interface CartSummaryProps {
  subtotal: number;
}

export function CartSummary({ subtotal }: CartSummaryProps) {
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm text-muted">
        <span>Subtotal</span>
        <span className="text-foreground">{formatPrice(subtotal)}</span>
      </div>
      <div className="flex justify-between text-sm text-muted">
        <span>Shipping</span>
        <span className="text-foreground">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
      </div>
      {shipping > 0 && (
        <p className="text-xs text-accent">
          Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping
        </p>
      )}
      <div className="border-t border-border pt-3 flex justify-between font-semibold text-foreground">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
}
