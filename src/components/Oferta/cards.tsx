import { Link } from "react-router-dom";

interface Props {
  img: string;
  title: string;
  price: number;
  slug: string | undefined
}
const CardsLancamento = ({ img, title, price, slug }: Props) => {
  return (
    <Link to={`/produtos/${slug}`} className="border h-76 px-1 w-full py-2 rounded-sm shadow-md hover:scale-105 hover:border-purple-300">
      <img className="w-full h-56" src={img} alt="" />
      <p className="text-sm overflow-hidden truncate pt-3">{title}</p>
      <div className="flex items-baseline gap-1 w-full pb-1">
        <span className="font-semibold text-zinc-950 text-sm">
          {price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
        <span className="text-xs text-purple-900 font-semibold">
          em 6x de R${(price / 6).toFixed(2)}
        </span>
      </div>
    </Link>
  );
};

export default CardsLancamento;
