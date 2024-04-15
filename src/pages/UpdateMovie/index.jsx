import {
  useUpdateMovieMutation,
  useGetMovieByIdQuery,
} from "src/redux/reducers/apiSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loader from "src/components/Loader";
import { FORM_LIST } from "src/static/utils/constants";
import schema from "src/static/utils/validations/updateMovie";
import Title from "src/components/Title";
import Form from "src/components/Form";

import styles from "./styles.module.scss";

const UpdateMovie = () => {
  const { id: idx } = useParams();

  const [updateMovie, { isError, error, isLoading, isSuccess }] =
    useUpdateMovieMutation();

  const { data, isLoading: isCurrentMovieLoading } =
    useGetMovieByIdQuery(idx) || {};

  const navigateTo = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (value) => {
    await updateMovie({
      id: data.id,
      title: value.title.length === 0 ? data.title : value.title,
      description:
        value.description.length === 0 ? data.description : value.description,
      rating: value.rating.length === 0 ? data.rating : value.rating,
      genre:
        value.rating.length === 0
          ? data.genre
          : value.genre.replace(/\s*,\s*/g, ",").split(","),
      actors:
        value.actors.length === 0
          ? data.actors
          : value.actors.replace(/\s*,\s*/g, ",").split(","),
      release_date:
        value.release_date.length === 0
          ? data.release_date
          : value.release_date,
      director: value.director.length === 0 ? data.director : value.director,
    }).unwrap();

    reset();
    setTimeout(() => {
      navigateTo(`/`);
    }, 2000);
  };

  if (isCurrentMovieLoading || isLoading) return <Loader />;

  return (
    <section className={styles["update"]}>
      <Title
        className={styles["update__title"]}
        level={1}
        size="h1"
        color="secondary-black"
        font="Lexend"
      >
        Update movie
      </Title>

      <Form
        register={register}
        list={FORM_LIST}
        isSubmitting={isSubmitting}
        isSuccess={isSuccess}
        isError={isError}
        errors={errors}
        error={error}
        onSubmit={handleSubmit(onSubmit)}
        successText="Movie Updated"
      />
    </section>
  );
};

export default UpdateMovie;
