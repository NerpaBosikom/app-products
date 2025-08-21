import { create } from "zustand";

export type Product = {
  id: number;
  title: string;
  description: string;
  price?: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
  images?: string[];
};

type State = {
  products: Product[];
  likes: Set<number>;
  loading: boolean;
  error?: string;
  fetchAll: () => Promise<void>;
  addProduct: (p: Omit<Product, "id">) => void;
  updateProduct: (id: number, patch: Partial<Product>) => void;
  removeProduct: (id: number) => void;
  toggleLike: (id: number) => void;
};

const persistKey = "app-products-state-v1";

function saveToLocalStorage(state: Pick<State, "products" | "likes">) {
  const payload = {
    products: state.products,
    likes: Array.from(state.likes),
  };
  localStorage.setItem(persistKey, JSON.stringify(payload));
}

function loadFromLocalStorage(): {
  products: Product[];
  likes: Set<number>;
} | null {
  try {
    const raw = localStorage.getItem(persistKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      products: parsed.products || [],
      likes: new Set<number>(parsed.likes || []),
    };
  } catch {
    return null;
  }
}

export const useProductsStore = create<State>((set, get) => ({
  products: [],
  likes: new Set<number>(),
  loading: false,
  async fetchAll() {
    if (get().products.length) return;
    set({ loading: true });
    try {
      const restored = loadFromLocalStorage();
      if (restored && restored.products.length) {
        set({
          products: restored.products,
          likes: restored.likes,
          loading: false,
        });
        return;
      }
      const res = await fetch("https://dummyjson.com/products?limit=100");
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      const products = (data.products || []).map((p: any) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        price: p.price,
        brand: p.brand,
        category: p.category,
        thumbnail: p.thumbnail,
        images: p.images,
      }));
      set({ products, loading: false });
      saveToLocalStorage({ products, likes: get().likes });
    } catch (e: any) {
      try {
        const sample = await import("../lib/sampleProducts.json");
        const products = sample.default as Product[];
        set({ products, loading: false, error: "Offline sample used" });
        saveToLocalStorage({ products, likes: get().likes });
      } catch (err) {
        set({ loading: false, error: e?.message || "Unknown error" });
      }
    }
  },
  addProduct(p) {
    const id = Date.now();
    const prod = { id, ...p };
    const products = [prod, ...get().products];
    set({ products });
    saveToLocalStorage({ products, likes: get().likes });
  },
  updateProduct(id, patch) {
    const products = get().products.map((p) =>
      p.id === id ? { ...p, ...patch } : p
    );
    set({ products });
    saveToLocalStorage({ products, likes: get().likes });
  },
  removeProduct(id) {
    const products = get().products.filter((p) => p.id !== id);
    const likes = new Set(get().likes);
    likes.delete(id);
    set({ products, likes });
    saveToLocalStorage({ products, likes });
  },
  toggleLike(id) {
    const likes = new Set(get().likes);
    if (likes.has(id)) likes.delete(id);
    else likes.add(id);
    set({ likes });
    saveToLocalStorage({ products: get().products, likes });
  },
}));
