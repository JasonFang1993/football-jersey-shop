import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function CartEmpty() {
  return (
    <div className="text-center py-20">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1}
        stroke="currentColor"
        className="w-16 h-16 mx-auto text-border"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        />
      </svg>
      <h2 className="mt-4 text-lg font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
        Your cart is empty
      </h2>
      <p className="mt-1 text-sm text-muted">Looks like you haven&apos;t added any jerseys yet.</p>
      <Link href="/products" className="inline-block mt-6">
        <Button>Browse Jerseys</Button>
      </Link>
    </div>
  );
}
