import type { Metadata } from "next";
import { CartPageClient } from "./cart-page-client";

export const metadata: Metadata = {
  title: "Shopping Cart",
  robots: { index: false },
};

export default function CartPage() {
  return <CartPageClient />;
}
