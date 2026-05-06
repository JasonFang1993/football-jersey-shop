import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-40 disabled:pointer-events-none cursor-pointer",
        variant === "primary" &&
          "bg-accent text-black hover:bg-accent-hover active:scale-[0.98]",
        variant === "secondary" &&
          "bg-surface border border-border text-foreground hover:bg-surface-hover active:scale-[0.98]",
        variant === "ghost" &&
          "bg-transparent text-muted hover:text-foreground hover:bg-surface",
        size === "sm" && "px-3 py-1.5 text-xs",
        size === "md" && "px-5 py-2.5 text-sm",
        size === "lg" && "px-7 py-3.5 text-sm",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
