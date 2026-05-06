import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <h1
        className="text-8xl font-bold text-border"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        404
      </h1>
      <h2
        className="mt-4 text-xl font-bold uppercase tracking-tight"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Page Not Found
      </h2>
      <p className="mt-2 text-muted">The page you&apos;re looking for doesn&apos;t exist.</p>
      <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/products">
          <Button>Browse Jerseys</Button>
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
