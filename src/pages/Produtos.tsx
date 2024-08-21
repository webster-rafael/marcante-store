import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { useData } from "../store/useData"; // Importa o hook do Zustand
import CardsProduto from "../components/CardsProducts";
import { Produtos } from "../types/types";

const ProdutosPage = () => {
  const { products } = useData(); // Usa o hook para acessar os produtos
  const { type } = useParams<{ type: string }>();

  if (!type) {
    return <div>Parâmetro de produto inválido</div>;
  }

  // Filtra os produtos com base no parâmetro 'type'
  const produtoPorCategoria = products.filter((p: Produtos) =>
    p.categories.some((category) => category.slug === type)
  );

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
          <Link to={`/${type}`} className="flex items-center">
            {type.charAt(0).toLocaleUpperCase() + type.slice(1)}
          </Link>
        </nav>
      </header>
      <div className="w-full grid grid-cols-2 pt-10 gap-2">
        {produtoPorCategoria.map((produto) => (
          <CardsProduto
            key={produto.id}
            title={produto.name} // Verifique o campo correto
            img={
              Array.isArray(produto.images)
                ? produto.images
                : [{ src: produto.images }]
            } // Verifique o campo correto
            price={produto.price}
            slug={produto.slug}
          />
        ))}
      </div>
    </section>
  );
};

export default ProdutosPage;
