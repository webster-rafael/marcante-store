import { useEffect } from "react";
import { useData } from "../store/useData";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import CardsProduto from "../components/CardsProducts";

export const TodosOsProdutos = () => {
    const { products, loading, error, fetchProducts } = useData(state => ({
        products: state.products,
        loading: state.loading,
        error: state.error,
        fetchProducts: state.fetchProducts,
      }));

      useEffect(() => {
        fetchProducts();
      }, [fetchProducts]);
    
      if (loading) return <p>Carregando produtos...</p>;
      if (error) return <p>{error}</p>;

      console.log(products)
    return ( 
        <section className="w-full h-dvh max-w-[1200px] mx-auto mt-32 px-3 bg-zinc-50">
      <header className="w-full text-zinc-600 py-2">
        <nav className="flex items-center text-sm gap-1">
          <Link to="/" className="flex items-center justify-between gap-1">
            Home
            <MdKeyboardArrowRight />
            Todos os Produtos
          </Link>
        
        </nav>
      </header>
      <div className="w-full grid sm:grid-cols-4 gap-10 pt-4">
        {products.map((produto) => (
            <CardsProduto
            key={produto.id}
            title={produto.name}
            img={
                Array.isArray(produto.images)
                  ? produto.images
                  : [{ src: produto.images }]
              }
            price={produto.price}
            slug={produto.slug}
          />
            
        ))}
      </div>
    </section>
     );
}
 
