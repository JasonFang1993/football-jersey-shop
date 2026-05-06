import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  className?: string;
}

export function PriceDisplay({ price, originalPrice, className }: PriceDisplayProps) {
  const isOnSale = originalPrice !== undefined && originalPrice > price;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className={cn("font-semibold text-sm", isOnSale ? "text-red-400" : "text-foreground")}>
        {formatPrice(price)}
      </span>
      {isOnSale && (
        <span className="text-xs text-muted line-through">{formatPrice(originalPrice!)}</span>
      )}
    </div>
  );
}
