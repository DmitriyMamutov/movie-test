import styles from "./styles.module.scss";

const Label = (props) => {
  const { id, errors, register, placeholder, type, step } = props;

  return (
    <label key={id} className={styles["label"]}>
      <input
        className={styles["label__input"]}
        {...register(id)}
        type={type}
        placeholder={placeholder}
        step={!!step ? step : null}
      />
      <span className={styles["label__error"]}>{errors}</span>
    </label>
  );
};

export default Label;
