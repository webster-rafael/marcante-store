import { Link } from "react-router-dom";

interface Props {
  img: string;
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
      <img className="w-3/5 h-full pb-3" src={img} alt="" />
      <div className="grid grid-cols-6 gap-2">
        <img className="hover:border border-zinc-900" src={img} alt={title} />
        <img className="hover:border border-zinc-900" src={img} alt={title} />
        <img className="hover:border border-zinc-900" src={img} alt={title} />
        <img className="hover:border border-zinc-900" src={img} alt={title} />
        <img className="hover:border border-zinc-900" src={img} alt={title} />
        <img className="hover:border border-zinc-900" src={img} alt={title} />
      </div>
    </Link>
  );
};

export default CardsDetails;
