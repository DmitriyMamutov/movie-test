import { useGetFavoritesQuery } from "src/redux/reducers/favoritesSlice";
import { Link } from "react-router-dom";
import Title from "src/components/Title";
import Button from "src/components/Button";

import styles from "./styles.module.scss";

const Card = (props) => {
  const {
    id,
    image,
    title,
    rating,
    release_date,
    onDelete,
    onAddToFavorites,
    isUpdateButton,
    isAddButton,
  } = props;

  const { data: favoriteMovies = [] } = useGetFavoritesQuery();

  const idsList = favoriteMovies.map(({ id }) => id);

  const condition = idsList.includes(id);

  return (
    <div key={id} className={styles["card"]}>
      <a href={`/${id}`} className={styles["card__image"]}>
        <img src={image} alt={id} />
      </a>
      <div className={styles["card-content"]}>
        <Title
          level={2}
          size="h2"
          color="secondary-black"
          font="Lexend"
          className={styles["card-content__title"]}
        >
          <a href={`/${id}`}>{title}</a>
        </Title>

        <div className={styles["card-content__rating"]}>{rating}</div>
        <div className={styles["card-content__date"]}>{release_date}</div>

        <Button
          className={styles["card-content__button"]}
          width="max"
          variant="secondary"
          onClick={onDelete}
        >
          Delete
        </Button>

        {isAddButton && (
          <Button
            className={styles["card-content__button"]}
            width="max"
            variant="black"
            onClick={onAddToFavorites}
            disabled={condition ? true : false}
          >
            {condition ? "Added" : "Add to Favorites"}
          </Button>
        )}

        {isUpdateButton && (
          <Link to={`/${id}/update`}>
            <Button
              className={styles["card-content__button"]}
              width="max"
              variant="primary"
            >
              Update Movie
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Card;
