import { Oval } from "react-loader-spinner";
import styles from "./styles.module.scss";

const Loader = () => {
  return (
      <Oval
        visible={true}
        height="120"
        width="120"
        color="#7101ff"
        secondaryColor="#ababab"
        ariaLabel="oval-loading"
        wrapperClass={styles['loader']}
      />
  );
};

export default Loader;
