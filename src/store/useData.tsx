import { create } from "zustand";
import axios from "axios";
import { Produtos } from "../types/types";

interface ProductState {
  products: Produtos[];
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
      const response = await axios.get<Produtos[]>(
        "https://catalogomarcante.shop/wp-json/wc/v3/products",
        {
          params: {
            consumer_key: "ck_21d472fccff5e013469fbd5ac6de4f4432573b41",
            consumer_secret: "cs_0d92e05e76f5d66e2bd2df3cc06451577898e955",
          },
        }
      );

      const productsWithTags = response.data.map(product => {
        const ofertasTag = product.tags.some(tag => tag.slug === 'ofertas');
        const femininoTag = product.tags.some(tag => tag.slug === 'feminino');
        const masculinoTag = product.tags.some(tag => tag.slug === 'masculino');
        const lancamentoTag = product.tags.some(tag => tag.slug === 'lancamento');

        return {
          ...product,
          ofertas: ofertasTag,
          genero: femininoTag ? 'feminino' : masculinoTag ? 'masculino' : product.genero,
          lançamentos: lancamentoTag,
        };
      });

      set({ products: productsWithTags });
    } catch (err) {
      console.error(err);
      set({ error: "Erro ao buscar produtos" });
    } finally {
      set({ loading: false });
    }
  },
}));
