import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link
              href="/"
              className="text-lg font-bold uppercase tracking-[0.15em]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="text-accent">FJS</span>
            </Link>
            <p className="mt-4 text-sm text-muted leading-relaxed">
              Your destination for authentic football jerseys from the world&apos;s top clubs and
              national teams.
            </p>
          </div>

          <div>
            <h4
              className="text-xs font-medium uppercase tracking-[0.2em] text-foreground mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Shop
            </h4>
            <ul className="space-y-2.5 text-sm text-muted">
              <li>
                <Link href="/products" className="hover:text-foreground transition-colors">
                  All Jerseys
                </Link>
              </li>
              <li>
                <Link href="/products?category=home" className="hover:text-foreground transition-colors">
                  Home Kits
                </Link>
              </li>
              <li>
                <Link href="/products?category=away" className="hover:text-foreground transition-colors">
                  Away Kits
                </Link>
              </li>
              <li>
                <Link href="/products?type=national" className="hover:text-foreground transition-colors">
                  National Teams
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4
              className="text-xs font-medium uppercase tracking-[0.2em] text-foreground mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Leagues
            </h4>
            <ul className="space-y-2.5 text-sm text-muted">
              <li>
                <Link href="/products?league=premier-league" className="hover:text-foreground transition-colors">
                  Premier League
                </Link>
              </li>
              <li>
                <Link href="/products?league=la-liga" className="hover:text-foreground transition-colors">
                  La Liga
                </Link>
              </li>
              <li>
                <Link href="/products?league=serie-a" className="hover:text-foreground transition-colors">
                  Serie A
                </Link>
              </li>
              <li>
                <Link href="/products?league=bundesliga" className="hover:text-foreground transition-colors">
                  Bundesliga
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4
              className="text-xs font-medium uppercase tracking-[0.2em] text-foreground mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Contact
            </h4>
            <ul className="space-y-2.5 text-sm text-muted">
              <li>Unit 1208, 12/F</li>
              <li>Tower 1, Harbour Centre</li>
              <li>25 Harbour Road, Wan Chai</li>
              <li>Hong Kong</li>
              <li className="pt-1">
                <a href="mailto:support@fjs.com" className="hover:text-foreground transition-colors">
                  support@fjs.com
                </a>
              </li>
              <li>
                <a href="tel:+85221234567" className="hover:text-foreground transition-colors">
                  +852 2123 4567
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Football Jersey Shop. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted">
            <span className="cursor-default hover:text-foreground transition-colors">Privacy</span>
            <span className="cursor-default hover:text-foreground transition-colors">Terms</span>
            <span className="cursor-default hover:text-foreground transition-colors">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
