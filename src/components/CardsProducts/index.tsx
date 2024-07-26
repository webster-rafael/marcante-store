import { Link } from "react-router-dom";

interface Props {
  title: string;
  img: string;
  price: number;
  slug: string | undefined;
}

const CardsProduto = ({ title, img, price, slug }: Props) => {
  return (
    <div className="border rounded-md h-64 bg-white">
      <Link to={`/produtos/${slug}`}>
        <img
          className="mix-blend rounded-t-md h-44 w-full"
          src={img}
          alt={title}
        />
      </Link>
      <div className="w-full px-2">
        <h1 className="w-full text-xs h-10 flex justify-center items-center">{title}</h1>
        <div className="flex items-center gap-1 py-2">
          <span className="text-sm font-bold">
            {price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
          <span className="text-xs font-semibold text-purple-900">
            6x de{" "}
            {(price / 6).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardsProduto;
