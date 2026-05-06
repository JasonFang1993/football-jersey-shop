"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface FilterGroupProps {
  title: string;
  options: { value: string; label: string }[];
  selected: string | undefined;
  onSelect: (value: string | undefined) => void;
}

export function FilterGroup({ title, options, selected, onSelect }: FilterGroupProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="border-b border-border pb-4">
      <button
        type="button"
        className="flex items-center justify-between w-full text-xs font-medium uppercase tracking-[0.15em] text-foreground"
        style={{ fontFamily: "var(--font-heading)" }}
        onClick={() => setExpanded(!expanded)}
      >
        {title}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={cn("w-3.5 h-3.5 text-muted transition-transform", expanded && "rotate-180")}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {expanded && (
        <div className="mt-3 space-y-0.5">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(selected === option.value ? undefined : option.value)}
              className={cn(
                "block w-full text-left px-2 py-1.5 text-sm rounded transition-colors",
                selected === option.value
                  ? "bg-accent/10 text-accent font-medium"
                  : "text-muted hover:text-foreground hover:bg-surface"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
