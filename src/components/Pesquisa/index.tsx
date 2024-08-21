import { GoSearch } from "react-icons/go";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Produtos } from "../../types/types";
import { IoIosClose } from "react-icons/io";
import { useData } from "../../store/useData";

const Pesquisa = () => {
  const [busca, setBusca] = useState("");
  const { products } = useData();

  // Filtrando os produtos com base na busca
  const produtos = products.filter((produto: Produtos) =>
    produto.name.toLowerCase().includes(busca.toLowerCase()) ||
    produto.categories.some((category) =>
      category.name.toLowerCase().includes(busca.toLowerCase())
    )
  );

  // Função para limpar a busca
  const deleteValue = () => setBusca("");

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
          <span onClick={deleteValue} className="w-16 flex justify-center cursor-pointer">
            <IoIosClose className="text-purple-800 text-2xl" />
          </span>
        )}

        <span className="w-16 flex justify-center border-l border-zinc-300">
          <GoSearch className="text-zinc-500 text-xl" />
        </span>
      </div>

      {busca && (
        <ul className="w-full lg:w-2/4 max-h-80 overflow-auto flex flex-col space-y-1 p-1 bg-zinc-100 absolute z-20 rounded-b-md shadow-md">
          {produtos.length > 0 ? (
            produtos.map((produto) => (
              <Link
                onClick={deleteValue}
                key={produto.id}
                to={`/produtos/${produto.slug}`}
              >
                <li className="w-full flex gap-2  justify-between items-center pr-5 border-b p-1">
                  <img 
                    className="w-16 mix-blend-multiply"
                    src={produto.images[0]?.src}
                    alt={produto.name}
                  />
                  <h1 className="w-64 truncate">{produto.name}</h1>
                  <span>
                    {Number(produto.price).toLocaleString("pt-BR", {
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
