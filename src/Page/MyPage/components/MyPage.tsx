import { test } from '../functions/function';
import styles from '../scss/my-page.module.scss';
const MyPage = () => {
  return (
    <div className={styles.test}>
      <div>{test()}</div>
      <div>MyPage.tsx</div>
    </div>
  );
};

export default MyPage;
