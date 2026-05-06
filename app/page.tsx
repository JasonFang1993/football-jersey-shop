import Link from "next/link";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getFeaturedProducts, getAllProducts } from "@/lib/products";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  const featured = getFeaturedProducts();
  const allProducts = getAllProducts();
  const newArrivals = allProducts.filter((p) => p.tags.includes("new-arrival"));

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-surface noise-overlay">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-accent font-mono text-sm tracking-[0.2em] uppercase mb-4">
                2025/26 Season
              </p>
              <h1
                className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase leading-[0.9] tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Wear
                <br />
                The
                <br />
                <span className="text-accent">Game.</span>
              </h1>
              <p className="mt-6 text-lg text-muted max-w-md leading-relaxed">
                Official jerseys from the world&apos;s biggest clubs and national teams.
                Authentic kits. Fast worldwide shipping.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/products">
                  <Button size="lg" className="bg-accent text-black hover:bg-accent-hover font-semibold px-8">
                    Shop All Kits
                  </Button>
                </Link>
                <Link href="/products?category=home">
                  <Button variant="ghost" size="lg" className="border border-border text-foreground hover:bg-surface-hover px-8">
                    New Arrivals
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-14 flex gap-10">
                {[
                  { value: "200+", label: "Jerseys" },
                  { value: "50+", label: "Clubs" },
                  { value: "Free", label: "Shipping $75+" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-bold font-heading" style={{ fontFamily: "var(--font-heading)" }}>
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted uppercase tracking-wider mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured jersey card */}
            <div className="hidden lg:block relative">
              <div className="relative w-full aspect-[3/4] max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent rounded-2xl blur-3xl" />
                <div className="relative bg-surface border border-border rounded-2xl p-8 overflow-hidden card-hover">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-background mb-6">
                    <img
                      src="/images/products/man-city-2025-home.svg"
                      alt="Manchester City Jersey"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-muted uppercase tracking-wider">Featured</p>
                  <h3 className="text-xl font-bold mt-1" style={{ fontFamily: "var(--font-heading)" }}>
                    Manchester City 2025/26 Home
                  </h3>
                  <p className="text-accent font-bold text-lg mt-2">$89.99</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-accent font-mono text-xs tracking-[0.2em] uppercase mb-2">
              Trending Now
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold uppercase tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Best Sellers
            </h2>
          </div>
          <Link
            href="/products"
            className="text-sm font-medium text-muted hover:text-foreground transition-colors flex items-center gap-1.5 group"
          >
            View all
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>

      {/* Shop by League - Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <p className="text-accent font-mono text-xs tracking-[0.2em] uppercase mb-2">
          Browse
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-10"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Shop by League
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {/* Premier League - Large card */}
          <Link
            href="/products?league=premier-league"
            className="col-span-2 row-span-2 relative group rounded-xl overflow-hidden bg-gradient-to-br from-purple-600 to-purple-900 min-h-[280px]"
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
              <h3
                className="text-2xl md:text-3xl font-bold text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Premier League
              </h3>
              <p className="text-white/70 text-sm mt-1">City, Liverpool, Arsenal & more</p>
            </div>
          </Link>

          {/* La Liga */}
          <Link
            href="/products?league=la-liga"
            className="relative group rounded-xl overflow-hidden bg-gradient-to-br from-orange-500 to-red-700 min-h-[130px]"
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                La Liga
              </h3>
            </div>
          </Link>

          {/* Serie A */}
          <Link
            href="/products?league=serie-a"
            className="relative group rounded-xl overflow-hidden bg-gradient-to-br from-blue-600 to-blue-900 min-h-[130px]"
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                Serie A
              </h3>
            </div>
          </Link>

          {/* Bundesliga */}
          <Link
            href="/products?league=bundesliga"
            className="relative group rounded-xl overflow-hidden bg-gradient-to-br from-red-600 to-red-900 min-h-[130px]"
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                Bundesliga
              </h3>
            </div>
          </Link>

          {/* Ligue 1 */}
          <Link
            href="/products?league=ligue-1"
            className="relative group rounded-xl overflow-hidden bg-gradient-to-br from-green-600 to-green-900 min-h-[130px]"
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                Ligue 1
              </h3>
            </div>
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="bg-surface border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-accent font-mono text-xs tracking-[0.2em] uppercase mb-2">
                  Just Dropped
                </p>
                <h2
                  className="text-3xl md:text-4xl font-bold uppercase tracking-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  New Arrivals
                </h2>
              </div>
              <Link
                href="/products"
                className="text-sm font-medium text-muted hover:text-foreground transition-colors"
              >
                View all
              </Link>
            </div>
            <ProductGrid products={newArrivals} />
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-accent/10 via-surface to-accent/10 border border-border p-12 md:p-16 text-center noise-overlay">
          <div className="relative z-10">
            <h2
              className="text-3xl md:text-4xl font-bold uppercase tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Free Shipping on Orders $75+
            </h2>
            <p className="mt-3 text-muted max-w-lg mx-auto">
              Get your favorite jerseys delivered worldwide. No minimum for club members.
            </p>
            <Link href="/products" className="inline-block mt-8">
              <Button size="lg" className="bg-accent text-black hover:bg-accent-hover font-semibold px-10">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
