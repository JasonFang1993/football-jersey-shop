import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Order Confirmed",
  robots: { index: false },
};

export default function ConfirmationPage() {
  const orderId = `FJS-${Date.now().toString(36).toUpperCase()}`;

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <div className="w-20 h-20 mx-auto bg-accent/10 rounded-full flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-10 h-10 text-accent"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      </div>

      <h1
        className="mt-6 text-3xl font-bold uppercase tracking-tight"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Thank you!
      </h1>
      <p className="mt-2 text-muted">
        Your order has been placed successfully. We&apos;ll send you a confirmation email shortly.
      </p>

      <div className="mt-8 bg-surface border border-border rounded-lg p-5 inline-block">
        <p className="text-xs text-muted uppercase tracking-wider">Order Number</p>
        <p className="text-xl font-mono font-bold text-accent mt-1">{orderId}</p>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/products">
          <Button>Continue Shopping</Button>
        </Link>
        <Link href="/">
          <Button variant="ghost" className="border border-border">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
