import * as yup from "yup";

const schema = yup
.object()
.shape({
  title: yup.string().required("Field is required"),
  description: yup.string().required("Field is required"),
  rating: yup
    .number()
    .max(10, "Max number is 10")
    .min(0, "Min number is 0")
    .typeError("Please type a number")
    .required("Field is required"),
  release_date: yup.string().required("Field is required"),
  director: yup.string().required("Field is required"),
  actors: yup.string().required("Field is required"),
  genre: yup.string().required("Field is required"),
})
.required();

export default schema;
