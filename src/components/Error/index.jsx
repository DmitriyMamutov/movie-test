import Title from "../Title";
import styles from "./styles.module.scss";

const Error = () => {
  return (
    <Title
      className={styles["error"]}
      level={1}
      size="h1"
      color="secondary-black"
      font="Lexend"
    >
      Error
    </Title>
  );
};

export default Error;
