import { BsCartPlusFill, BsFillCartCheckFill } from "react-icons/bs";
import { IoMdTrash } from "react-icons/io";
import { Link } from "react-router-dom";
import { useCart } from "../../store/useCart";
import { Produtos } from "../../types/types";
interface Props {
  item: Produtos;
  removeFromFavorite: (item: number) => void;
}

const CardsFavorite = ({ removeFromFavorite, item }: Props) => {
  const { addToCart, cart } = useCart();
  return (
    <div className="w-full flex justify-between items-center gap-2 border-b py-4">
      <Link to={`/produtos/${item.slug}`}>
        <img className="size-16 rounded-full" src={item.images[0].src} alt={item.name} />
      </Link>
      <span className="flex-1 text-sm w-20 truncate">{item.name}</span>
      <div className="flex justify-center items-center gap-3">
        <span className="w-20 flex justify-center font-semibold">
          {Number(item.price).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
        <div className="flex items-center gap-2">
          <button onClick={() => removeFromFavorite(item.id)}>
            <IoMdTrash className="text-red-600 hover:scale-110 size-7" />
          </button>
          <button onClick={() => addToCart(item)}>
            {cart.some((produto) => produto.id === item.id) ? (
              <BsFillCartCheckFill className="text-purple-700 hover:scale-110 size-7" />
            ) : (
              <BsCartPlusFill className="text-purple-700 hover:scale-110 size-7" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardsFavorite;
