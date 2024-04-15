import { useParams } from "react-router-dom";
import { useGetMovieByIdQuery } from "src/redux/reducers/apiSlice";
import Loader from "src/components/Loader";
import Error from "src/components/Error";
import Title from "src/components/Title";
import cn from "classnames";

import styles from "./styles.module.scss";

const Detailed =()=> {
  const { id } = useParams();

  const { data, isError, isLoading } = useGetMovieByIdQuery(id);

  if (isError) return <Error />;

  if (isLoading) return <Loader />;

return (
    <section className={styles["detailed"]}>
      <div className="container">
        <div className={styles["detailed-content"]}>
          <div className={styles["detailed-content__image"]}>
            <img src={data.image} alt={data.id} />
          </div>
          <div className={styles["detailed-content-right"]}>
            <Title
              className={styles["detailed-content-right__title"]}
              level={2}
              size="h1"
              color="secondary-black"
              font="Lexend"
            >
              {data.title}
            </Title>
            <div
              className={cn(
                styles["detailed-content-right__description"],
                styles["detailed__text"],
              )}
            >
              {data.description}
            </div>

            <div
              className={cn(
                styles["detailed-content-right__director"],
                styles["detailed__text"],
              )}
            >
              <span>Director: </span>
              {data.director}
            </div>

            <div
              className={cn(
                styles["detailed-content-right-card"],
                styles["detailed__text"],
              )}
            >
              <span>Actors: </span>
              {Array.isArray(data.actors) ? (
                <ul>
                  {data.actors.map((name, idx) => {
                    return <li key={idx}>{name}</li>;
                  })}
                </ul>
              ) : (
                data.actors
              )}
            </div>

            <div
              className={cn(
                styles["detailed-content-right-card"],
                styles["detailed__text"],
              )}
            >
              <span>Genres: </span>
              {Array.isArray(data.genre) ? (
                <ul>
                  {data.genre.map((text, idx) => {
                    return <li key={idx}>{text}</li>;
                  })}
                </ul>
              ) : (
                data.genre
              )}
            </div>

            <div className={styles["detailed__text"]}>
              <span>Rating: </span>
              {data.rating}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Detailed;
