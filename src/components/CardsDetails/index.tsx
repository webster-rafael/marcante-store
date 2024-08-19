import { Link } from "react-router-dom";

// Ajuste o tipo para corresponder ao esperado
interface Image {
  src: string;
}

interface Props {
  img: Image[]; // Use um array de objetos `Image` para permitir múltiplas imagens
  title: string;
  price: number;
  slug: string | undefined;
}

const CardsDetails = ({ img, title, slug }: Props) => {
  return (
    <Link
      to={`/produtos/${slug}`}
      className="h-76 px-1 w-full flex flex-col justify-center items-center py-2"
    >
      {/* Exibe a primeira imagem principal */}
      {img.length > 0 && (
        <img className="w-3/5 h-full pb-3" src={img[0].src} alt={title} />
      )}
      <div className="grid grid-cols-3 gap-8">
        {/* Exibe as outras imagens, se disponíveis */}
        {img.slice(1, 4).map((image, index) => (
          <img
            key={index}
            className="hover:border border-zinc-900 h-36"
            src={image.src}
            alt={title}
          />
        ))}
      </div>
    </Link>
  );
};

export default CardsDetails;
