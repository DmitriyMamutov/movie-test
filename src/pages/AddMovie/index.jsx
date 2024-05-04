import { useAddMovieMutation } from "src/redux/reducers/apiSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Title from "src/components/Title";
import { v4 as uuidv4 } from "uuid";
import Form from "src/components/Form";
import Loader from "src/components/Loader";
import Error from "src/components/Error";
import schema from "src/static/utils/validations";
import { useNavigate } from "react-router-dom";
import { FORM_LIST } from "src/static/utils/constants";

import styles from "./styles.module.scss";

const AddMovie = () => {
  const [addMovie, { isError, error, isSuccess, isLoading }] =
    useAddMovieMutation();

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
    await addMovie({
      id: uuidv4(),
      title: value.title,
      description: value.description,
      rating: value.rating,
      genre: value.genre.replace(/\s*,\s*/g, ",").split(","),
      actors: value.actors.replace(/\s*,\s*/g, ",").split(","),
      release_date: value.release_date,
      director: value.director,
      image: "src/static/images/common/default-poster.png",
    }).unwrap();

    reset();

    setTimeout(() => {
      navigateTo("/");
    }, 3000);
  };

  if (isError) return <Error />;

  if (isLoading) return <Loader />;

  return (
    <section className={styles["add"]}>
      <div className="container">
        <Title
          className={styles["add__title"]}
          level={1}
          size="h1"
          color="secondary-black"
          font="Lexend"
        >
          Add Movie
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
          successText="Movie Added"
        />
      </div>
    </section>
  );
};

export default AddMovie;
