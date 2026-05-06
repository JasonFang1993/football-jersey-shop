import type { Product, FilterState } from "./types";
import productsData from "@/data/products.json";

export function getAllProducts(): Product[] {
  return productsData as Product[];
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug);
}

export function getProductsByFilter(filters: FilterState): Product[] {
  let products = getAllProducts();

  if (filters.league) {
    products = products.filter(
      (p) => p.league.toLowerCase() === filters.league!.toLowerCase()
    );
  }

  if (filters.team) {
    products = products.filter(
      (p) => p.team.toLowerCase() === filters.team!.toLowerCase()
    );
  }

  if (filters.season) {
    products = products.filter((p) => p.season === filters.season);
  }

  if (filters.type) {
    products = products.filter((p) => p.type === filters.type);
  }

  if (filters.category) {
    products = products.filter((p) => p.category === filters.category);
  }

  return products;
}

export function getUniqueLeagues(): string[] {
  const leagues = new Set(getAllProducts().map((p) => p.league));
  return Array.from(leagues).sort();
}

export function getUniqueTeams(): string[] {
  const teams = new Set(getAllProducts().map((p) => p.team));
  return Array.from(teams).sort();
}

export function getUniqueSeasons(): string[] {
  const seasons = new Set(getAllProducts().map((p) => p.season));
  return Array.from(seasons).sort();
}

export function getFeaturedProducts(): Product[] {
  return getAllProducts().filter((p) => p.tags.includes("best-seller"));
}

export function generateStaticSlugs(): string[] {
  return getAllProducts().map((p) => p.slug);
}
