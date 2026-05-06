export const SITE_NAME = "Football Jersey Shop";
export const SITE_DESCRIPTION =
  "Official club and national team football jerseys. Shop the latest season kits from top leagues worldwide.";

export const ROUTES = {
  home: "/",
  products: "/products",
  cart: "/cart",
  checkout: "/checkout",
  confirmation: "/checkout/confirmation",
} as const;

export const LEAGUES = [
  "Premier League",
  "La Liga",
  "Serie A",
  "Bundesliga",
  "Ligue 1",
  "Champions League",
] as const;

export const CATEGORIES = [
  { value: "home", label: "Home" },
  { value: "away", label: "Away" },
  { value: "third", label: "Third Kit" },
  { value: "training", label: "Training" },
] as const;

export const SEASONS = ["2025/26", "2024/25"] as const;

export const PRODUCT_TYPES = [
  { value: "club", label: "Club" },
  { value: "national", label: "National" },
] as const;

export const SHIPPING_COST = 599;
export const FREE_SHIPPING_THRESHOLD = 7500;
