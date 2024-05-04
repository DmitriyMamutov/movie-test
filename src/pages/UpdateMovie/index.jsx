import { useEffect, useState, useMemo } from "react";
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
import schema from "src/static/utils/validations";
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

  const [defaultValues, setDefaultValues] = useState({});

  useEffect(() => {
    if (data) {
      setDefaultValues({
        ...data,
        actors: data.actors.join(", "),
        genre: data.genre.join(", "),
      });
    }
  }, []);

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        actors: data.actors.join(", "),
        genre: data.genre.join(", "),
      });
    }
  }, [data]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: useMemo(() => {
      return defaultValues
    }, [defaultValues]),
  });

  const onSubmit = async (value) => {
    await updateMovie({
      ...data,
      title: value.title,
      description: value.description,
      rating: value.rating,
      genre: value.genre.replace(/\s*,\s*/g, ",").split(","),
      actors: value.actors.replace(/\s*,\s*/g, ",").split(","),
      release_date: value.release_date,
      director: value.director,
    }).unwrap();

    setTimeout(() => {
      navigateTo(`/`);
    }, 2000);
  };

  if ((isCurrentMovieLoading || isLoading) && !isSubmitting) return <Loader />;

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
