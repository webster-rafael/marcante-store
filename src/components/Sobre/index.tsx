import { Link } from "react-router-dom";

const Sobre = () => {
  return (
    <section className="h-full w-full flex flex-col items-center justify-center py-10 px-1">
      <h1 className="text-xl font-semibold text-purple-800 text-center uppercase">
        Quem somos?
      </h1>
      <img className="w-full py-4" src="/sobre.webp" alt="" />
      <div className="w-[98%] bg-zinc-100 py-4 shadow-md rounded-md">
        <h1 className="text-lg text-center text-purple-700 font-semibold">BEM-VINDO À MARCANTE SEXSHOP E LINGERIE!</h1>
        <p className="w-[95%] mx-auto p-4">
          A <strong>Marcante SexShop e Lingerie</strong> é uma loja virtual dedicada a oferecer
          produtos eróticos de alta qualidade a preços acessíveis. Nossa missão
          é proporcionar a homens e mulheres mais prazer e autoconhecimento
          sobre suas sexualidades, promovendo uma experiência mais enriquecedora
          e satisfatória. Nosso compromisso vai além da venda de produtos;
          queremos formar uma rede de parceiros e colaboradores especialistas na
          revenda de artigos eróticos. Acreditamos que todos merecem uma
          oportunidade de melhorar sua vida financeira, e nossa proposta de
          revenda oferece uma excelente chance de gerar renda extra.
        </p>
        <div className="w-full flex justify-center items-center">
            <Link className="bg-zinc-900 hover:bg-zinc-800 hover:scale-105 text-purple-500 px-10 py-2 rounded-md" to={'/sobre'}>Saiba mais</Link>
        </div>
      </div>
    </section>
  );
};

export default Sobre;
