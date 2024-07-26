import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import data from "../data/data.json";
import CardsProduto from "../components/CardsProducts";
import { Produtos } from "../types/types";

const ProdutosPage = () => {
  const produtos: Produtos[] = data;
  const { type } = useParams<{ type: string }>();

  if (!type) {
    return <div>Parâmetro de produto inválido</div>;
  }

  const produtoPorCategoria = produtos.filter((p: Produtos) => p.type === type);

  if (produtoPorCategoria.length === 0) {
    return <div>Produto não encontrado</div>;
  }
  return (
    <section className="w-full h-dvh mt-32 px-3 bg-zinc-50">
      <header className="w-full text-zinc-600 py-2">
        <nav className="flex items-center text-sm gap-1">
          <Link to="/" className="flex items-center justify-between gap-1">
            Home
            <MdKeyboardArrowRight />
          </Link>
          <Link to={`/${type}}`} className="flex items-center">
            {type.charAt(0).toLocaleUpperCase() + type.slice(1)}
          </Link>
        </nav>
      </header>
      <div className="w-full grid grid-cols-2 pt-10 gap-2">
        {produtoPorCategoria.map((produto) => (
            <CardsProduto
            key={produto.id}
            title={produto.title}
            img={produto.img}
            price={produto.price}
            slug={produto.slug}
          />
        ))}
      </div>
    </section>
  );
};

export default ProdutosPage;
