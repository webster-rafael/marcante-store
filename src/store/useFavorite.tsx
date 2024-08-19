import { create } from "zustand";

import { FavoriteStore, Produtos } from "../types/types";

export const useFavorite = create<FavoriteStore>((set) => ({
    item: [],
    favoritos: [],
    addToFavorite: (item: Produtos) =>
        set((state) => {
          const newItem = { ...item, quantity: item.quantity ?? 1 };
          return { favoritos: [...state.favoritos, newItem] };
        }), 
        removeFromFavorite: (id: number) =>
            set((state) => ({
                favoritos: state.favoritos.filter((item) => item.id !== id)
            })),
}))