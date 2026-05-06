"use client";

import { cn } from "@/lib/utils";

interface MobileFilterDrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function MobileFilterDrawer({ open, onClose, children }: MobileFilterDrawerProps) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/70 z-40 transition-opacity backdrop-blur-sm",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-80 max-w-full bg-background border-r border-border shadow-2xl transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2
            className="text-sm font-medium uppercase tracking-[0.15em] text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Filters
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-muted hover:text-foreground"
            aria-label="Close filters"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">{children}</div>
      </div>
    </>
  );
}
