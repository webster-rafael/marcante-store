import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useParams } from "react-router-dom";

import data from "../data/data.json";

import { Produtos } from "../types/types";
import CardsDetails from "../components/CardsDetails";
import { IoAddOutline, IoCloseOutline, IoStarSharp } from "react-icons/io5";
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { HiOutlineTruck } from "react-icons/hi2";
import CardsLancamento from "../components/Oferta/cards";

const ProdutosDetails = () => {
  const [color, setColor] = useState("");
  const [tamanho, setTamanho] = useState("");
  const [modal, setModal] = useState(false);
  const { slug } = useParams<{ slug: string }>();
  const produtos: Produtos[] = data;

  if (!slug) {
    return <div>Parâmetro de produto inválido</div>;
  }

  const findProductBySlug = (slug: string): Produtos | undefined => {
    return produtos.find((p: Produtos) => p.slug === slug);
  };

  const produto = findProductBySlug(slug);

  if (!produto) {
    return <div>Produto não encontrado</div>;
  }

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
    <section id="topo" className="w-full h-full mt-32 px-3">
      <header className="w-full text-zinc-600 py-2">
        <nav className="flex items-center text-sm gap-1">
          <Link to="/" className="w-full flex-1 flex items-center gap-1">
            Home
            <MdKeyboardArrowRight />
          </Link>
          <Link
            to={`/${produto.type}`}
            className="flex flex-1 w-full items-center gap-1"
          >
            {produto.type.charAt(0).toUpperCase() + produto.type.slice(1)}
            <MdKeyboardArrowRight />
          </Link>
          <span className="flex text-start w-full truncate">
            {produto.title}
          </span>
        </nav>
      </header>

      <div className="relative w-full overflow-hidden">
        <div className="w-full flex transition-transform duration-300">
          <div className="w-full h-full gap-4 p-2">
            <div className="w-full flex items-center justify-center" key={produto.id}>
              <CardsDetails
                key={produto.id}
                img={produto.img}
                title={produto.title}
                price={produto.price}
                slug={produto.slug}
              />
            </div>

            <div className="w-full my-6 h-28">
              <p className="text-start w-full text-xl">{produto.title}</p>
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
                    {produto.price.toLocaleString("pt-BR", {
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
                <button
                  onClick={() => handleColor("Azul")}
                  className="size-10 border-2 border-zinc-400 rounded-full bg-blue-500 hover:scale-105"
                ></button>
                <button
                  onClick={() => handleColor("Laranja")}
                  className="size-10 border-2 border-zinc-400 rounded-full bg-orange-500 hover:scale-105"
                ></button>
                <button
                  onClick={() => handleColor("Vermelho")}
                  className="size-10 border-2 border-zinc-400 rounded-full bg-red-500 hover:scale-105"
                ></button>
                <button
                  onClick={() => handleColor("Verde")}
                  className="size-10 border-2 border-zinc-400 rounded-full bg-green-500 hover:scale-105"
                ></button>
                <button
                  onClick={() => handleColor("Rosa")}
                  className="size-10 border-2 border-zinc-400 rounded-full bg-pink-500 hover:scale-105"
                ></button>
              </div>
            </div>

            <div className="w-full flex flex-col gap-1 my-4">
              <p>Tamanho: {tamanho ? tamanho : "Selecione um tamanho"}</p>
              <div className="w-full flex gap-3">
                <button
                  onClick={() => handleTamanho("P")}
                  className="size-10 border border-purple-600 rounded-lg hover:scale-105 hover:bg-purple-200"
                >
                  P
                </button>
                <button
                  onClick={() => handleTamanho("M")}
                  className="size-10 border border-purple-600 rounded-lg hover:scale-105 hover:bg-purple-200"
                >
                  M
                </button>
                <button
                  onClick={() => handleTamanho("G")}
                  className="size-10 border border-purple-600 rounded-lg hover:scale-105 hover:bg-purple-200"
                >
                  G
                </button>
                <button
                  onClick={() => handleTamanho("GG")}
                  className="size-10 border border-purple-600 rounded-lg hover:scale-105 hover:bg-purple-200"
                >
                  GG
                </button>
              </div>
            </div>

            <div
              className={`${
                produto.estoque
                  ? "bg-green-200 text-green-700"
                  : "bg-red-200 text-red-600"
              } w-28 h-7 flex items-center justify-center font-bold px-1 my-4 rounded-md`}
            >
              {produto.estoque ? "Em estoque" : "Indisponível"}
            </div>

            <div className="w-full flex gap-2">
              <button className="bg-purple-700 w-full h-10 rounded-md text-zinc-100 hover:bg-purple-900">
                Comprar
              </button>
              <button className="rounded-md border border-zinc-600 size-10 p-2 flex justify-center items-center hover:scale-110">
                <CiHeart className="size-6 text-purple-700" />
              </button>
            </div>

            <div className="w-full py-4">
              <h1 className="text-sm">Calcular o prazo de entrega</h1>
              <div className="w-full flex justify-between items-center gap-2">
                <span>
                  <HiOutlineTruck className="size-8 text-zinc-500" />
                </span>
                <input
                  className="rounded-md outline-none border flex-1 px-2 text-sm h-10 focus:border-purple-800"
                  type="text"
                  placeholder="Digite seu CEP"
                />
                <button className="bg-zinc-900 hover:bg-zinc-700 hover:text-zinc-100 text-purple-500 h-10 w-24 rounded-md">
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
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Itaque aliquam magni beatae aliquid quidem maxime odio a
                    saepe magnam totam, in commodi! Nisi culpa quo saepe
                    corporis alias architecto optio.
                  </p>

                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Optio neque repellat molestias tempora asperiores ad velit
                    nobis illum quasi praesentium maxime, quia laudantium
                    aliquam esse officia animi quod beatae officiis!
                  </p>

                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Nostrum odit eius quae dolor nulla magni perspiciatis, ab
                    sed quia, vero cumque nam? Sequi voluptates consequatur id
                    exercitationem deserunt porro ipsa!
                  </p>

                  <h3 className="text-lg text-purple-700 font-bold uppercase pt-4">
                    Dimensões e Tamanhos Aproximados
                  </h3>
                  <ul className="list-disc py-4 flex flex-col gap-4">
                    <li className="">
                      <h1 className="font-bold">Tamanho P</h1>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Totam explicabo omnis asperiores nobis fuga reiciendis,
                        tempora perspiciatis alias perferendis distinctio veniam
                        fugit cum cupiditate odit hic!
                      </p>
                    </li>
                    <li className="">
                      <h1 className="font-bold">Tamanho M</h1>
                      <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Esse ullam ipsa, qui officiis quibusdam itaque
                        totam labore sequi, magni
                      </p>
                    </li>
                    <li className="">
                      <h1 className="font-bold">Tamanho G</h1>
                      <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Esse atque quibusdam quam eos, porro sint
                        voluptatem aut inventore accusantium magni amet
                        provident, eaque rem dignissimos.
                      </p>
                    </li>
                    <li className="">
                      <h1 className="font-bold">Tamanho GG</h1>
                      <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Voluptatibus officiis tenetur soluta culpa
                        repellendus eius suscipit. Tenetur officia, consequuntur
                        minima veritatis, omnis dolore commodi laboriosam.
                      </p>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="w-full h-full py-5">
              <h1 className="font-semibold text-purple-700">Quem viu este produto também comprou</h1>
              <div className="w-full grid grid-cols-2 gap-2">
                {produtos
                  .filter((p) => p.type === produto.type)
                  .map((filteredProduct) => (
                    <CardsLancamento
                      key={filteredProduct.id}
                      img={filteredProduct.img}
                      price={filteredProduct.price}
                      title={filteredProduct.title}
                      slug={filteredProduct.slug}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProdutosDetails;
