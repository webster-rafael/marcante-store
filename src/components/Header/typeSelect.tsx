import { AiOutlineProduct } from "react-icons/ai";
import { Link } from "react-router-dom";
interface Props {
  handleLinkClick: () => void;
  type: string
}

const TypeSelect = ({ handleLinkClick, type }: Props) => {
  return (
    <Link
      onClick={handleLinkClick}
      className="flex items-center gap-2 hover:scale-105 hover:underline underline-offset-4 decoration-pink-400"
      to={`/${type}`}
    >
      <AiOutlineProduct className="size-8 text-zinc-400" />
      {type.charAt(0).toLocaleUpperCase() + type.slice(1)}
    </Link>
  );
};

export default TypeSelect;
