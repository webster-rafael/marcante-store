import { AiOutlineProduct } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Category } from "../../types/types";

interface Props {
  handleLinkClick: () => void;
  categories: Category[]; // Aceita um array de categorias
}

const TypeSelect = ({ handleLinkClick, categories }: Props) => {
  return (
    <div>
      {categories.map((category) => (
        <Link
          key={category.id}
          onClick={handleLinkClick}
          className="flex items-center gap-2 hover:scale-105 hover:underline underline-offset-4 decoration-pink-400"
          to={`/${category.slug}`}
        >
          <AiOutlineProduct className="size-8 text-zinc-400" />
          {category.name.charAt(0).toLocaleUpperCase() + category.name.slice(1)}
        </Link>
      ))}
    </div>
  );
};

export default TypeSelect;
