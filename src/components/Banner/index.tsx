const Banner = () => {
  return (
    <section className="w-full mt-32">
      <img className="w-full h-full" src="/banner.webp" alt="" />
      <div className="flex w-full justify-between items-center h-20 px-5">
        <div className="uppercase flex gap-1 items-center h-full w-full justify-end">
          <img className="size-12" src="/embalagem.webp" alt="" />
          <div className="text-sm flex flex-col justify-center w-2/3">
            <span className="text-zinc-500 text-xs leading-4">
              Entrega Rápida
            </span>
            <span className="text-purple-800 font-semibold text-sm leading-4">
              Embalagem Discreta
            </span>
          </div>
        </div>
        <div className="uppercase flex gap-1 items-center h-full justify-center w-full">
          <img className="size-20" src="/caminhão.png" alt="" />
          <div className="flex flex-col justify-center w-2/3">
            <span className="text-zinc-500 text-xs leading-4">
              Frete Grátis Brasil
            </span>
            <span className="text-purple-800 font-semibold text-sm leading-4">
              Consulte o Regulamento
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
