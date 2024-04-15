import Label from "src/components/Label";
import Button from "src/components/Button";

import styles from "./styles.module.scss";

const Form = (props) => {
  const {
    register,
    list,
    errors,
    isSubmitting,
    isSuccess,
    isError,
    error,
    onSubmit,
successText
  } = props;

  return (
    <form className={styles["form"]} onSubmit={onSubmit}>
      {list.map(({ id, type, placeholder }) => {
        return (
          <Label
            placeholder={placeholder}
            key={id}
            register={register}
            id={id}
            type={type}
            errors={errors[`${id}`]?.message}
          />
        );
      })}

      <Button
        type="submit"
        variant="primary"
        width="max"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Loading..." : "Submit"}
      </Button>
      {isError && (
        <div className={styles["form__error"]}>{`Error "${error.status}"`}</div>
      )}
      {isSuccess && <div className={styles["form__added"]}>{successText}</div>}
    </form>
  );
};

export default Form;
