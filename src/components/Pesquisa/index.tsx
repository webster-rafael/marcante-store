import { GoSearch } from "react-icons/go";
import { Link } from "react-router-dom";
import data from "../../data/data.json";
import { useState } from "react";
import { Produtos } from "../../types/types";
import { IoIosClose } from "react-icons/io";

const Pesquisa = () => {
  const [busca, setBusca] = useState("");

  const produtos = data.filter(
    (produto: Produtos) =>
      produto.title.toLowerCase().includes(busca.toLowerCase()) ||
      produto.type.toLowerCase().includes(busca.toLowerCase())
  );

  const deletevalue = () => setBusca("");

  return (
    <div className="w-full h-12 fixed z-10">
      <div className="flex items-center w-full py-2 h-12 bg-zinc-50 pl-3 lg:mt-0 sm:mb-0">
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="text-zinc-500 p-2 w-full focus:outline-none bg-transparent placeholder:text-zinc-400 text-sm"
          placeholder="Buscar produtos"
          type="text"
        />

        {busca && (
          <span onClick={deletevalue} className="w-16 flex justify-center">
            <IoIosClose className="text-purple-800 size-5" />
          </span>
        )}

        <span className="w-16 flex justify-center border-l border-zinc-300">
          <GoSearch className="text-zinc-500 size-7" />
        </span>
      </div>

      {busca && (
        <ul className="w-full lg:w-2/4 max-h-80 overflow-auto flex space-y-1 flex-col justify-between p-1 bg-zinc-100 absolute z-20 rounded-b-md shadow-md">
          {produtos.length > 0 ? (
            produtos.map((produto) => (
              <Link
                onClick={deletevalue}
                key={produto.id}
                to={`/produtos/${produto.slug}`}
              >
                <li className="w-full flex justify-between items-center pr-5 border-b p-1">
                  <img
                    className="w-16 mix-blend-multiply"
                    src={produto.img}
                    alt={produto.type}
                  />
                  <h1>{produto.title}</h1>
                  <span>
                    {produto.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </li>
              </Link>
            ))
          ) : (
            <li className="w-full text-center p-2 text-gray-500">
              Produto não encontrado
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Pesquisa;
