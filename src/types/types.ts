export interface Produtos {
  id: number;
  images: Images[];
  name: string;
  price: number;
  slug: string | undefined;
  categories: Category[];
  tags: Tag[];
  ofertas?: boolean;
  lançamentos?: boolean;
  genero?: string;
  stock_status?: string;
  quantity?: number;
  description?: string;
  attributes: Attributes[]
}
export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Attributes {
  id: 0;
  name: "Cor";
  options: ["Azul", "Verde", "Vermelho"];
}

export interface Images {
  src: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export type CartStore = {
  item: Produtos[];
  cart: Produtos[];
  addToCart: (item: Produtos) => void;
  // fetchProducts: () => Promise<void>;
  removeFromCart: (id: number) => void;
  calculateTotal: () => number;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  // loading: boolean;
  // error: string | null;
};

export type FavoriteStore = {
  favoritos: Produtos[];
  addToFavorite: (item: Produtos) => void;
  item: Produtos[];
  removeFromFavorite: (id: number) => void;
};
