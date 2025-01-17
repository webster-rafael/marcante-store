import { useEffect, useState } from "react";
import CardsLancamento from "./cards";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { useData } from "../../store/useData";

const Ofertas = () => {
  const { products } = useData(); // Obtenha os produtos do Zustand
  const produtosOfertas = products.filter((produto) => produto.ofertas);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
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
  }, []);

  const totalPages = Math.ceil(produtosOfertas.length / itemsPerPage);

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

  return (
    <section className="w-full h-full py-10 px-2">
      <h1 className="text-xl text-center text-purple-800 font-bold uppercase">
        Ofertas de Hoje
      </h1>
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {Array.from({
            length: Math.ceil(produtosOfertas.length / itemsPerPage),
          }).map((_, pageIndex) => (
            <div
              className="w-full flex-none grid gap-4 p-2"
              style={{
                gridTemplateColumns: `repeat(${itemsPerPage}, minmax(0, 1fr))`,
              }}
              key={pageIndex}
            >
              {produtosOfertas
                .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                .map((produto) => (
                  <div
                    className="flex items-center justify-center"
                    key={produto.id}
                  >
                    <CardsLancamento
                      key={produto.id}
                      img={
                        Array.isArray(produto.images)
                          ? produto.images
                          : [{ src: produto.images }]
                      }
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

export default Ofertas;
