import { useEffect, useState } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { useData } from "../../store/useData";
import CardsLancamento from "../Oferta/cards";

const Feminino = () => {
  const { products, loading, error, fetchProducts } = useData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    fetchProducts(); // Fetch products when component mounts

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [fetchProducts]);

  const produtos = products.filter((produto) => produto.genero === "feminino");
  const totalPages = Math.ceil(produtos.length / itemsPerPage);

  const nextProduct = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalPages - 1 ? 0 : prevIndex + 1
    );
  };

  const prevProduct = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalPages - 1 : prevIndex - 1
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="w-full h-full py-10 px-1">
      <h1 className="text-xl text-center text-purple-800 font-semibold uppercase">Para Elas</h1>
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {Array.from({
            length: totalPages,
          }).map((_, pageIndex) => (
            <div
              className="w-full flex-none grid gap-4 p-2"
              style={{
                gridTemplateColumns: `repeat(${itemsPerPage}, minmax(0, 1fr))`,
              }}
              key={pageIndex}
            >
              {produtos
                .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                .map((produto) => (
                  <div
                    className="flex items-center justify-center"
                    key={produto.id}
                  >
                    <CardsLancamento
                      img={produto.images}
                      title={produto.name}
                      price={produto.price}
                      slug={produto.slug}
                    />
                  </div>
                ))}
            </div>
          ))}
        </div>
        <button
          onClick={prevProduct}
          className="absolute -left-0 top-1/2 transform -translate-y-1/2 bg-white/50 text-purple-800 text-3xl font-bold size-12 rounded-full shadow flex items-center justify-center"
        >
          <RiArrowLeftSLine />
        </button>
        <button
          onClick={nextProduct}
          className="absolute -right-0 top-1/2 transform -translate-y-1/2 bg-white/50 text-purple-800 text-3xl font-bold size-12 rounded-full shadow flex items-center justify-center"
        >
          <RiArrowRightSLine />
        </button>
      </div>
    </section>
  );
};

export default Feminino;
