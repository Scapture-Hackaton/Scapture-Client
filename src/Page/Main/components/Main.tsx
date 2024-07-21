import { test } from "../functions/function";
import styles from "../scss/main.module.scss";

const Main = () => {
  return (
    <div className={styles.test}>
      <div>{test()}</div>
      <div>Main.tsx</div>
    </div>
  );
};

export default Main;
