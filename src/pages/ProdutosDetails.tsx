import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { Images, Produtos } from "../types/types";
import CardsDetails from "../components/CardsDetails";
import { IoAddOutline, IoCloseOutline, IoStarSharp } from "react-icons/io5";
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { HiOutlineTruck } from "react-icons/hi2";
import CardsLancamento from "../components/Oferta/cards";
import { useCart } from "../store/useCart";
import { useFavorite } from "../store/useFavorite";
import { FaHeart } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { BiError } from "react-icons/bi";
import { useData } from "../store/useData";

const ProdutosDetails = () => {
  const [color, setColor] = useState("");
  const [tamanho, setTamanho] = useState("");
  const [modal, setModal] = useState(false);
  const { slug } = useParams<{ slug: string }>();
  const { products } = useData();
  const { addToCart, cart } = useCart();
  const { addToFavorite, favoritos } = useFavorite();
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState<React.ReactNode>("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleAddToCart = (produto: Produtos) => {
    if (cart.some((item) => item.id === produto.id)) {
      setModalMessage(
        <div className="flex items-center gap-1">
          <span>Este produto já foi adicionado</span>
          <BiError className="size-6" />
        </div>
      );
    } else {
      const itemToAdd = { ...produto, quantity: selectedQuantity };
      addToCart(itemToAdd);
      setModalMessage(
        <div className="flex items-center gap-1">
          <span>Produto adicionado ao carrinho</span>
          <GoVerified className="size-6" />
        </div>
      );
    }
    setIsCardVisible(true);
    setTimeout(() => setIsCardVisible(false), 3000); // Oculta o card após 3 segundos
  };

  if (!slug) {
    return <div>Parâmetro de produto inválido</div>;
  }

  const findProductBySlug = (slug: string): Produtos | undefined => {
    const product = products.find((p) => p.slug === slug);

    if (product) {
      // Conversão de tipo
      const convertedProduct: Produtos = {
        ...product,
        images: Array.isArray(product.images)
          ? product.images
          : [{ src: product.images } as Images],
      };
      return convertedProduct;
    }
    return undefined;
  };

  const produto = findProductBySlug(slug || "");

  // Filtra produtos com base na mesma categoria

  if (!produto) {
    return <div>Produto não encontrado</div>;
  }
  const produtoPorCategoria = products.filter(
    (p) => p.categories === produto.categories
  );

  function handleColor(color: string) {
    setColor(color);
  }

  function handleTamanho(tamanho: string) {
    setTamanho(tamanho);
  }

  function OpenModal() {
    setModal(true);
  }

  function CloseModal() {
    setModal(false);
  }

  return (
    <section id="topo" className="w-full h-full mt-32 px-3 relative">
      <header className="w-full text-zinc-600 py-2">
        <nav className="flex items-center text-sm gap-1">
          <Link to="/" className="w-full flex-1 flex items-center gap-1">
            Home
            <MdKeyboardArrowRight />
          </Link>
          <Link
            to={`/${produto.categories[0].slug}`}
            className="flex flex-1 w-full items-center gap-1"
          >
            {produto.categories[0].name.charAt(0).toUpperCase() +
              produto.categories[0].name.slice(1)}
            <MdKeyboardArrowRight />
          </Link>
          <span className="flex text-start w-full truncate">
            {produto.name}
          </span>
        </nav>
      </header>

      <div className="relative w-full overflow-hidden">
        <div className="w-full flex transition-transform duration-300">
          <div className="w-full h-full gap-4 p-2">
            <div
              className="w-full flex items-center justify-center"
              key={produto.id}
            >
              <CardsDetails
                key={produto.id}
                img={produto.images}
                title={produto.name}
                price={produto.price}
                slug={produto.slug}
              />
            </div>

            <div className="w-full my-6 h-28">
              <p className="text-start w-full text-xl">{produto.name}</p>
              <div className="flex justify-between gap-2 items-center text-sm">
                <div className="flex gap-2 items-center h-8">
                  <span className="text-yellow-400 h-8 flex mt-2 font-semibold">
                    4.8 de 5
                  </span>
                  <div className="flex h-8">
                    <IoStarSharp className="size-6 text-yellow-500" />
                    <IoStarSharp className="size-6 text-yellow-500" />
                    <IoStarSharp className="size-6 text-yellow-500" />
                    <IoStarSharp className="size-6 text-yellow-500" />
                    <IoStarSharp className="size-6 text-zinc-500" />
                  </div>
                </div>

                <div className="flex flex-col w-32 justify-center items-center h-16">
                  <span className="text-xl font-bold">
                    {Number(produto.price).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                  <span className="text-xs text-purple-900 font-semibold">
                    em 6x de R${(produto.price / 6).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-1">
              <p>Cor: {color ? color : "Selecione uma cor"}</p>
              <div className="w-full flex gap-3">
                {produto.attributes[0].options.map((cor, index) => {
                  const corClasse =
                    {
                      Azul: "bg-blue-500",
                      Laranja: "bg-orange-500",
                      Vermelho: "bg-red-500",
                      Verde: "bg-green-500",
                      Rosa: "bg-pink-500",
                      Preto: "bg-black",
                      Branco: "bg-white",
                      Cinza: "bg-gray-500",
                      Amarelo: "bg-yellow-500",
                      Roxo: "bg-purple-500",
                      Marrom: "bg-brown-500",
                      AzulClaro: "bg-sky-500",
                      VerdeClaro: "bg-teal-500",
                    }[cor] || "bg-gray-500";

                  return (
                    <button
                      key={index} // Adiciona uma chave única para cada botão
                      onClick={() => handleColor(cor)}
                      className={`size-10 border-2 border-zinc-400 rounded-full ${corClasse} hover:scale-105`}
                    ></button>
                  );
                })}
              </div>
            </div>

            <div className="w-full flex flex-col gap-1 my-4">
              <p>Tamanho: {tamanho ? tamanho : "Selecione um tamanho"}</p>
              <div className="w-full flex gap-3">
                {produto.attributes[1].options.map((tamanhoOption, index) => (
                  <button
                    key={index} // Adiciona uma chave única para cada botão
                    onClick={() => handleTamanho(tamanhoOption)}
                    className={`size-10 border border-purple-600 rounded-lg hover:scale-105 hover:bg-purple-200 ${
                      tamanhoOption === tamanho ? "bg-purple-300" : ""
                    }`}
                  >
                    {tamanhoOption}
                  </button>
                ))}
              </div>
            </div>

            <div
              className={`${
                produto.stock_status === "instock"
                  ? "bg-green-200 text-green-700"
                  : "bg-red-200 text-red-600"
              } w-28 h-7 flex items-center justify-center font-bold px-1 my-4 rounded-md`}
            >
              {produto.stock_status === "instock"
                ? "Em estoque"
                : "Indisponível"}
            </div>

            <div className="w-full flex gap-2">
              <button
                onClick={() => handleAddToCart(produto)}
                className="bg-purple-700 w-full h-10 rounded-md text-zinc-100 hover:bg-purple-900"
              >
                Comprar
              </button>
              <div className="flex w-40 gap-2">
                <button
                  className="border border-purple-400 size-10 p-3 rounded-lg flex justify-center items-center hover:bg-zinc-100"
                  onClick={() =>
                    setSelectedQuantity(Math.max(1, selectedQuantity - 1))
                  }
                >
                  -
                </button>
                <input
                  value={selectedQuantity}
                  onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                  className="w-4 font-semibold text-center"
                  type="text"
                />

                <button
                  className="border border-purple-400 size-10 p-3 rounded-lg flex justify-center items-center hover:bg-zinc-100"
                  onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => addToFavorite(produto)}
                className="rounded-md border border-zinc-600 size-10 p-2 flex justify-center items-center hover:scale-110"
              >
                {favoritos.some((item) => item.id === produto.id) ? (
                  <FaHeart className="size-6 text-red-700" />
                ) : (
                  <CiHeart className="size-6 text-purple-700" />
                )}
              </button>
            </div>

            <div className="w-full py-4">
              <h1 className="text-sm">Calcular o prazo de entrega</h1>
              <div className="w-full flex justify-between items-center gap-2">
                <span>
                  <HiOutlineTruck className="size-8 text-zinc-500" />
                </span>
                <input
                  className="rounded-md outline-none border w-full px-2 text-sm h-10 focus:border-purple-800"
                  type="text"
                  placeholder="Digite seu CEP"
                />
                <button className="bg-zinc-900 hover:bg-zinc-700 hover:text-zinc-100 text-purple-500 h-10 w-24 px-3 rounded-md">
                  Calcular
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4 py-5">
              <div className="w-full flex items-center gap-3 py-2">
                <img className="size-16" src="/embalagem-2.png" alt="" />
                <div>
                  <h1 className="font-bold">Entrega com embalagem discreta!</h1>
                  <p className="text-sm">
                    Sem menção a loja e sem menção ao conteúdo
                  </p>
                </div>
              </div>
              <div className="w-full flex items-center gap-3 py-2 border-y">
                <img className="size-16" src="/entrega.png" alt="" />
                <div>
                  <h1 className="font-bold">Entrega Garantida!</h1>
                  <p className="text-sm">
                    Este produto continua sendo enviado normalmente enquanto
                    você se cuida, ficando em casa.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full h-full">
              <div className="flex justify-between items-center px-3">
                <h1 className="text-xl py-4">Descrição</h1>
                <span>
                  {modal ? (
                    <IoCloseOutline onClick={CloseModal} className="size-5" />
                  ) : (
                    <IoAddOutline onClick={OpenModal} className="size-5" />
                  )}
                </span>
              </div>
              {modal && (
                <div className="bg-zinc-100 p-3 h-full">
                  {produto.description ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: produto.description }}
                    />
                  ) : (
                    <p>Descrição não disponível</p>
                  )}
                </div>
              )}
            </div>

            <div className="w-full h-full py-5">
              <h1 className="font-semibold text-purple-700 pb-3">
                Quem viu este produto também comprou
              </h1>
              <div className="w-full grid grid-cols-2 gap-2">
                {produtoPorCategoria.map((filteredProduct) => (
                  <CardsLancamento
                    key={filteredProduct.id}
                    img={
                      Array.isArray(filteredProduct.images)
                        ? filteredProduct.images
                        : [{ src: filteredProduct.images }]
                    } // Converta a string em um array de `Images`
                    price={filteredProduct.price}
                    title={filteredProduct.name}
                    slug={filteredProduct.slug}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <span
          className={`fixed bottom-0 transition-transform duration-500 bg-purple-900 w-3/4 h-10 flex justify-center items-center rounded-t-md text-center text-sm text-zinc-50 mx-auto ${
            isCardVisible ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <>{modalMessage}</>
        </span>
      </div>
    </section>
  );
};

export default ProdutosDetails;
