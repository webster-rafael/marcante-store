import CardsFavorite from "../components/CardsFavorite";
import { useFavorite } from "../store/useFavorite";

const FavoritePage = () => {
  const { favoritos, removeFromFavorite } = useFavorite();
  return (
    <section className="h-dvh w-full pt-32 px-3">
      <div className="grid grid-cols-1">
        {favoritos.map((item) => {
          return (
            <CardsFavorite
              key={item.id}
              removeFromFavorite={removeFromFavorite}
              item={item}
            />
          );
        })}
      </div>
    </section>
  );
};

export default FavoritePage;
