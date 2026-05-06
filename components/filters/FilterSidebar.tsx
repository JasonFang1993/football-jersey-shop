"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { FilterGroup } from "./FilterGroup";
import { FilterChip } from "./FilterChip";
import { LEAGUES, CATEGORIES, PRODUCT_TYPES, SEASONS } from "@/lib/constants";

const leagueOptions = LEAGUES.map((l) => ({ value: l.toLowerCase().replace(/\s+/g, "-"), label: l }));
const categoryOptions = CATEGORIES.map((c) => ({ value: c.value, label: c.label }));
const typeOptions = PRODUCT_TYPES.map((t) => ({ value: t.value, label: t.label }));
const seasonOptions = SEASONS.map((s) => ({ value: s, label: s }));

export function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const league = searchParams.get("league") ?? undefined;
  const category = searchParams.get("category") ?? undefined;
  const type = searchParams.get("type") ?? undefined;
  const season = searchParams.get("season") ?? undefined;

  const setFilter = useCallback(
    (key: string, value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/products?${params.toString()}`);
    },
    [router, searchParams]
  );

  const activeFilters = [
    league && { key: "league", label: LEAGUES.find((l) => l.toLowerCase().replace(/\s+/g, "-") === league) ?? league },
    category && { key: "category", label: CATEGORIES.find((c) => c.value === category)?.label ?? category },
    type && { key: "type", label: PRODUCT_TYPES.find((t) => t.value === type)?.label ?? type },
    season && { key: "season", label: season },
  ].filter(Boolean) as { key: string; label: string }[];

  return (
    <div className="space-y-6">
      {activeFilters.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Active Filters</span>
            <button
              type="button"
              onClick={() => router.push("/products")}
              className="text-xs text-emerald-600 hover:text-emerald-700"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {activeFilters.map((filter) => (
              <FilterChip
                key={filter.key}
                label={filter.label}
                onRemove={() => setFilter(filter.key, undefined)}
              />
            ))}
          </div>
        </div>
      )}

      <FilterGroup
        title="League"
        options={leagueOptions}
        selected={league}
        onSelect={(v) => setFilter("league", v)}
      />
      <FilterGroup
        title="Category"
        options={categoryOptions}
        selected={category}
        onSelect={(v) => setFilter("category", v)}
      />
      <FilterGroup
        title="Type"
        options={typeOptions}
        selected={type}
        onSelect={(v) => setFilter("type", v)}
      />
      <FilterGroup
        title="Season"
        options={seasonOptions}
        selected={season}
        onSelect={(v) => setFilter("season", v)}
      />
    </div>
  );
}
