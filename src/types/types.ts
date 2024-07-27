export interface Produtos {
  id: string;
  img: string;
  title: string;
  price: number;
  slug: string | undefined;
  type: string;
  ofertas: boolean;
  lançamentos: boolean;
  genero: string;
  estoque: boolean;
  quantity?: number;
}

export type CartStore = {
  item: Produtos[];
  cart: Produtos[];
  addToCart: (item: Produtos) => void;
  // fetchProducts: () => Promise<void>;
  removeFromCart: (id: string) => void;
  calculateTotal: () => string;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  // loading: boolean;
  // error: string | null;
};
