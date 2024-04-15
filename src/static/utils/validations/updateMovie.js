import * as yup from "yup";

const schema = yup
  .object()
  .shape({
    title: yup.string(),
    description: yup.string(),
    rating: yup.string(),
    release_date: yup.string(),
    director: yup.string(),
    actors: yup.string(),
    genre: yup.string(),
  })
  .required();

export default schema;
