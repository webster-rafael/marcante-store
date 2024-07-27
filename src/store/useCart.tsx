import { create } from 'zustand';
import { CartStore, Produtos } from '../types/types';

export const useCart = create<CartStore>((set) => ({
  item: [],
  cart: [],
  addToCart: (item: Produtos) =>
    set((state) => {
      // Ao adicionar um item, inicializa quantity como 1 se não estiver presente
      const newItem = { ...item, quantity: item.quantity ?? 1 };
      return { cart: [...state.cart, newItem] };
    }),
  increaseQuantity: (id: string) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity ?? 1) + 1 } : item
      )
    })),
  decreaseQuantity: (id: string) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max((item.quantity ?? 1) - 1, 1) }
          : item
      )
    })),
  removeFromCart: (id: string) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id)
    })),
  calculateTotal: (): string => {
    const cart = useCart.getState().cart;
    const total = cart.reduce((acc, item) => acc + item.price * (item.quantity ?? 1), 0);
    return total.toLocaleString('pt-BR', {
      style: "currency",
      currency: "BRL"
    });
  }
}));
