
"use client";
import { create } from "zustand";
import { Product } from "./types";

type State = {
  products: Product[];
  loading: boolean;
  error?: string;
  filter: "all" | "favorite";
  query: string;
  page: number;
  pageSize: number;
};

type Actions = {
  fetchProducts: () => Promise<void>;
  toggleFavorite: (id: number) => void;
  removeProduct: (id: number) => void;
  addProduct: (p: Omit<Product, "id">) => void;
  updateQuery: (q: string) => void;
  setFilter: (f: State["filter"]) => void;
  setPage: (p: number) => void;
};

export const useStore = create<State & Actions>((set, get) => ({
  products: [],
  loading: false,
  filter: "all",
  query: "",
  page: 1,
  pageSize: 12,

  fetchProducts: async () => {
    try {
      set({ loading: true, error: undefined });
      const res = await fetch("https://dummyjson.com/products?limit=100");
      const data = await res.json();
      const mapped = (data.products || []).map((p: any) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        price: p.price,
        thumbnail: p.thumbnail,
        favorite: false,
      })) as Product[];
      // Merge with existing (keep local favorites & deletions)
      const existing = get().products;
      const merged = mapped.filter(m => !existing.find(e => e.id === m.id && e.title === "__deleted__")).map(m => {
        const found = existing.find(e => e.id === m.id);
        return found ? { ...m, favorite: found.favorite } : m;
      }).concat(existing.filter(e => e.created)); // keep created
      set({ products: merged, loading: false });
    } catch (e: any) {
      set({ loading: false, error: e?.message || "Failed to load" });
    }
  },

  toggleFavorite: (id) => set(state => ({
    products: state.products.map(p => p.id === id ? { ...p, favorite: !p.favorite } : p)
  })),
  removeProduct: (id) => set(state => ({
    products: state.products.map(p => p.id === id ? { ...p, title: "__deleted__" } : p)
  })),
  addProduct: (p) => set(state => ({
    products: [{ ...p, id: Date.now(), created: true }, ...state.products]
  })),
  updateQuery: (q) => set({ query: q, page: 1 }),
  setFilter: (f) => set({ filter: f, page: 1 }),
  setPage: (p) => set({ page: p })
}));
