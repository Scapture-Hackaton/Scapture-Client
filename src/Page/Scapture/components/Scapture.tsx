import { test } from '../functions/function';
import '../scss/scapture.scss';
import styles from '../scss/scapture.module.scss';

const Scapture = () => {
  return (
    <div className={styles.test}>
      <div>{test()}</div>
      <div>Scapture.tsx</div>
    </div>
  );
};

export default Scapture;
