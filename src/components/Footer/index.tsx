const Footer = () => {
  return (
    <section className="w-full h-full px-3 bg-purple-900 pt-7">
      <div className="flex flex-col py-1">
        <h1 className="text-xl uppercase text-center text-zinc-100 font-semibold">Newsletter</h1>
        <p className="text-xs text-center text-zinc-200">Cadastre seu e-mail e receba nossas ofertas!</p>
      </div>
      <form className="w-3/4 mx-auto flex flex-col gap-2 justify-center items-center pb-4">
        <input className="h-8 px-2 w-[90%] outline-none rounded-sm text-xs" type="text" placeholder="Nome" />
        <input className="h-8 px-2 w-[90%] outline-none rounded-sm text-xs" type="text" placeholder="E-mail" />
        <button className="text-zinc-100 w-36 bg-purple-950 hover:bg-purple-800 hover:border-2 hover:border-purple-700 hover:scale-110 h-8 rounded-sm">Enviar</button>
      </form>
      <div className="w-full border-b"></div>
      <footer>
        <div className="flex justify-between items-center px-3">
          <img className="w-16" src="/logo.png" alt="" />
          <nav className="flex gap-2 text-xs items-end h-8 text-zinc-100">
            <a className="hover:underline underline-offset-2" href="">Sobre</a>
            <a className="hover:underline underline-offset-2" href="">Política e Privacidade</a>
            <a className="hover:underline underline-offset-2" href="">Desenvolvimento</a>
          </nav>
        </div>

        <div className="flex justify-center pb-4">
          <span className="text-zinc-100 text-sm">
            Desenvolvido por{" "}
            <a className="underline underline-offset-2" href="https://websterdeveloper.pro">Webster Dev</a>
          </span>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
