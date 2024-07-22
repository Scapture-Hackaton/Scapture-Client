import { test } from '../functions/function';
import styles from '../scss/stadium.module.scss';

const Stadium = () => {
  return (
    <div className={styles.test}>
      <div>{test()}</div>
      <div>Stadium.tsx</div>
    </div>
  );
};

export default Stadium;
