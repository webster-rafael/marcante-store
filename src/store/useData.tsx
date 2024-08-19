import { create } from "zustand";
import axios from "axios";
import { Attributes } from "../types/types";

interface Product {
  id: number;
  name: string;
  price: number;
  images: string;
  src: Images[];
  slug: string;
  categories: Category[]
  attributes: Attributes[]
  // Adicione outros campos conforme necessário
}

interface Category {
    id: number;
    name: string;
    slug: string;
  }

  interface Images {
    id: number
    src: string
  }

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => void;
}

export const useData = create<ProductState>((set) => ({
  products: [],
  loading: true,
  error: null,
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<Product[]>(
        "https://catalogomarcante.shop/wp-json/wc/v3/products",
        {
          params: {
            consumer_key: "ck_21d472fccff5e013469fbd5ac6de4f4432573b41",
            consumer_secret: "cs_0d92e05e76f5d66e2bd2df3cc06451577898e955",
          },
        }
      );
      set({ products: response.data });
    } catch (err) {
      set({ error: "Erro ao buscar produtos" });
    } finally {
      set({ loading: false });
    }
  },
}));
