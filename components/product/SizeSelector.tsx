import { cn } from "@/lib/utils";
import type { Size } from "@/lib/types";

interface SizeSelectorProps {
  sizes: Size[];
  selected: Size | null;
  onSelect: (size: Size) => void;
  className?: string;
}

export function SizeSelector({ sizes, selected, onSelect, className }: SizeSelectorProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {sizes.map((size) => (
        <button
          key={size}
          type="button"
          onClick={() => onSelect(size)}
          className={cn(
            "min-w-[44px] h-10 px-3 text-xs font-medium uppercase tracking-wider border transition-all duration-200",
            selected === size
              ? "border-accent bg-accent/10 text-accent"
              : "border-border bg-surface text-muted hover:border-muted hover:text-foreground"
          )}
        >
          {size}
        </button>
      ))}
    </div>
  );
}
