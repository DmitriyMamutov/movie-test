import {
  useSearchMovieQuery,
  useDeleteMovieMutation,
} from "src/redux/reducers/apiSlice";
import {
  useAddFavoriteMutation,
  useGetFavoritesQuery,
} from "src/redux/reducers/favoritesSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import Card from "src/components/Card";
import Button from "src/components/Button";
import Loader from "src/components/Loader";
import Error from "src/components/Error";

import styles from "./styles.module.scss";

const Main = () => {
  const [search, setSearch] = useState("");

  const {
    data: searchMovie = [],
    isLoading,
    isError,
  } = useSearchMovieQuery(search);
  const { data: favoriteMovies = [] } = useGetFavoritesQuery();

  const [addFavorite] = useAddFavoriteMutation();
  const [deleteMovie] = useDeleteMovieMutation();

  const handleDeleteMovie = async (id) => {
    await deleteMovie(id).unwrap();
  };

  const handleAddFavorite = async (value) => {
    await addFavorite(value).unwrap();
  };

  if (isError) return <Error />;

  if (isLoading) return <Loader />;

  return (
    <section className={styles["main"]}>
      <div className="container">
        <div className={styles["main-header"]}>
          <Link to="/add" className={styles["main-header__button"]}>
            <Button width="max" variant="primary">
              Add Movie
            </Button>
          </Link>
          <input
            className={styles["main-header__search"]}
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link className={styles["main-header__favorite"]} to="/favorites">
            Favorite movies ({favoriteMovies.length})
          </Link>
        </div>

        {searchMovie.length === 0 ? (
          <div className={styles["main__empty"]}>Empty</div>
        ) : (
          <div className={styles["main-list"]}>
            {searchMovie.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                title={item.title}
                rating={item.rating}
                image={item.image}
                release_date={item.release_date}
                onDelete={() => handleDeleteMovie(item.id)}
                onAddToFavorites={() => handleAddFavorite(item)}
                isUpdateButton
                isAddButton
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Main;
