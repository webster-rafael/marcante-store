import {
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
} from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { IoBagAddOutline } from "react-icons/io5";
import { RiHome3Fill, RiUserShared2Line } from "react-icons/ri";
import Pesquisa from "../Pesquisa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BiSolidShoppingBags } from "react-icons/bi";
import { MdOutlineRoundaboutLeft } from "react-icons/md";
import data from "../../data/data.json";
import TypeSelect from "./typeSelect";
// import { RiUserReceivedLine } from "react-icons/ri"; //se tiver logado
// import { IoBagCheckOutline } from "react-icons/io5"; //se tiver item no carrinho

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const produtos = data
    .filter((produto) => produto.type || produto.id)
    .map((produto) => ({ id: produto.id, type: produto.type }));

  function handleOpenMenu() {
    setMenuVisible(true);
  }

  function handleCloseMenu() {
    setMenuVisible(false);
  }

  function handleLinkClick() {
    setMenuVisible(false);
  }

  return (
    <div className="fixed top-0 w-full h-20 z-10">
      <header className=" w-full h-20 flex justify-between items-center bg-purple-900 text-zinc-50 px-4">
        <span className="w-20">
          {menuVisible ? (
            <AiOutlineMenuFold onClick={handleCloseMenu} className="size-9" />
          ) : (
            <AiOutlineMenuUnfold onClick={handleOpenMenu} className="size-9" />
          )}
        </span>

        {menuVisible ? (
          <div className="sm:hidden absolute w-2/4 top-24 z-20 left-2 bg-gradient-to-b from-neutral-800 via-primary to-neutral-900 text-white flex justify-center rounded-md">
            <nav className="flex flex-col gap-3 text-zinc-300 text-lg py-5">
              <Link
                onClick={handleLinkClick}
                className="flex items-center gap-2 hover:scale-105 hover:underline underline-offset-4 decoration-pink-400 text-zinc-50"
                to="/"
              >
                <RiHome3Fill className="size-8 text-purple-700" />
                Home
              </Link>
              {produtos.map((produto) => (
                <TypeSelect
                  key={produto.id}
                  type={produto.type}
                  handleLinkClick={handleLinkClick}
                />
              ))}

              <a
                onClick={handleLinkClick}
                className="flex items-center gap-2 hover:scale-105 hover:underline underline-offset-4 decoration-pink-400"
                href="/#ofertas"
              >
                <BiSolidShoppingBags className="size-8 text-zinc-50" />
                Ofertas
              </a>
              <Link
                onClick={handleLinkClick}
                className="flex items-center gap-2 hover:scale-105 hover:underline underline-offset-4 decoration-pink-400"
                to="/sobre"
              >
                <MdOutlineRoundaboutLeft className="size-8 text-zinc-50" />
                Sobre
              </Link>
            </nav>
          </div>
        ) : (
          ""
        )}

        <div className="w-full flex flex-1 justify-center">
          <img className="w-20" src="/logo.png" alt="Logo" />
        </div>

        <div className="flex gap-3">
          <span>
            <FaRegHeart className="size-6" />
          </span>
          <span>
            <RiUserShared2Line className="size-6" />
          </span>
          <span>
            <IoBagAddOutline className="size-6" />
          </span>
        </div>
      </header>
      <Pesquisa />
    </div>
  );
};

export default Header;
