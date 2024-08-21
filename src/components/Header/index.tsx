// Header.tsx
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { IoBagAddOutline } from "react-icons/io5";
import { RiHome3Fill, RiUserShared2Line } from "react-icons/ri";
import Pesquisa from "../Pesquisa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiSolidShoppingBags } from "react-icons/bi";
import { MdOutlineRoundaboutLeft } from "react-icons/md";
import TypeSelect from "./typeSelect";
import { useCart } from "../../store/useCart";
import { IoBagCheckOutline } from "react-icons/io5"; //se tiver item no carrinho
import { useFavorite } from "../../store/useFavorite";
import { useData } from "../../store/useData";

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { products, fetchProducts } = useData();
  const { cart } = useCart();
  const { favoritos } = useFavorite();
  // No componente Header, adicione um log para verificar os produtos

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);


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
      <header className="w-full h-20 flex justify-between items-center bg-purple-900 text-zinc-50 px-4">
        <span className="w-20">
          {menuVisible ? (
            <AiOutlineMenuFold onClick={handleCloseMenu} className="size-9" />
          ) : (
            <AiOutlineMenuUnfold onClick={handleOpenMenu} className="size-9" />
          )}
        </span>

        {menuVisible ? (
          <div className="sm:hidden absolute w-3/5 top-24 z-20 left-2 bg-gradient-to-b from-neutral-800 via-primary to-neutral-900 text-white flex justify-start px-3 rounded-md">
            <nav className="flex flex-col gap-3 text-zinc-300 text-lg py-5">
              <Link
                onClick={handleLinkClick}
                className="flex items-center gap-2 hover:scale-105 hover:underline underline-offset-4 decoration-pink-400 text-zinc-50 border-b border-zinc-600 pb-2"
                to="/"
              >
                <RiHome3Fill className="size-8 text-purple-700" />
                Home
              </Link>
              {products.map((produto) => (
                <TypeSelect
                  key={produto.id}
                  categories={produto.categories} // Passando array de categorias
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
          <Link to={"/favorite"} className="relative">
            <span className="absolute -top-1 bg-white text-purple-700 rounded-full size-5 flex items-center justify-center font-semibold text-xs -right-3">
              {favoritos.length}
            </span>
            <FaRegHeart className="size-7" />
          </Link>
          <span>
            <RiUserShared2Line className="size-7" />
          </span>
          <Link className="relative" to={"/cart"}>
            <span className="absolute -top-1 bg-white text-purple-700 rounded-full size-5 flex items-center justify-center font-semibold text-xs -right-3">
              {cart.length}
            </span>
            {cart.length > 0 ? (
              <IoBagCheckOutline className="size-7" />
            ) : (
              <IoBagAddOutline className="size-7" />
            )}
          </Link>
        </div>
      </header>
      <Pesquisa />
    </div>
  );
};

export default Header;
