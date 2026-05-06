export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export interface Product {
  id: string;
  slug: string;
  name: string;
  team: string;
  league: string;
  season: string;
  type: "club" | "national";
  category: "home" | "away" | "third" | "training";
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  images: string[];
  sizes: Size[];
  inStock: boolean;
  tags: string[];
}

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  size: Size;
  price: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (productId: string, size: Size) => void;
  updateQuantity: (productId: string, size: Size, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export interface FilterState {
  league?: string;
  team?: string;
  season?: string;
  type?: "club" | "national";
  category?: string;
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}
