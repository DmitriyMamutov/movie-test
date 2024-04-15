import Loader from "src/components/Loader";
import Error from "src/components/Error";
import Title from "src/components/Title";
import Card from "src/components/Card";
import {
  useDeleteFavoriteMutation,
  useGetFavoritesQuery,
} from "src/redux/reducers/favoritesSlice";
import styles from "./styles.module.scss";

const Favorites = () => {
  const { data: favoriteMovies, isLoading, isError } = useGetFavoritesQuery();

  const [deleteFavorite] = useDeleteFavoriteMutation();

  const handleDeleteMovie = async (id) => {
    await deleteFavorite(id).unwrap();
  };

  if (isError) return <Error />;

  if (isLoading) return <Loader />;

  return (
    <section className={styles["favorites"]}>
      <div className="container">
        <Title
          className={styles["favorites__title"]}
          level={1}
          size="h1"
          color="secondary-black"
          font="Lexend"
        >
          Favorite movies
        </Title>

        <div>
          {favoriteMovies.length === 0 ? (
            <div className={styles["favorites__empty"]}>Empty</div>
          ) : (
            <div className={styles["favorites-list"]}>
              {favoriteMovies.map(
                ({ id, title, rating, image, release_date }) => (
                  <Card
                    key={id}
                    id={id}
                    title={title}
                    rating={rating}
                    image={image}
                    release_date={release_date}
                    onDelete={() => handleDeleteMovie(id)}
                  />
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Favorites;
