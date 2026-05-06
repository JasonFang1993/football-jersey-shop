"use client";

import Link from "next/link";
import { useState } from "react";
import { CartIcon } from "./CartIcon";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/products", label: "All Kits" },
  { href: "/products?category=home", label: "Home" },
  { href: "/products?category=away", label: "Away" },
  { href: "/products?type=national", label: "National" },
] as const;

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-lg font-bold uppercase tracking-[0.15em]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="text-accent">FJS</span>
            <span className="text-foreground ml-1 hidden sm:inline">Football Jersey Shop</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-medium text-muted uppercase tracking-[0.15em] hover:text-foreground transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <CartIcon />

            <button
              type="button"
              className="md:hidden p-2 text-muted hover:text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden border-t border-border overflow-hidden transition-all duration-200 bg-background",
          mobileMenuOpen ? "max-h-60" : "max-h-0"
        )}
      >
        <nav className="px-4 py-3 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2.5 text-sm font-medium text-muted hover:text-foreground hover:bg-surface rounded-md transition-colors"
              style={{ fontFamily: "var(--font-heading)" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
