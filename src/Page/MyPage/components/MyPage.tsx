import Header from '../../Header/components/Header';
import Footer from '../../Footer/components/Footer';

import { test } from '../functions/function';
import styles from '../scss/my-page.module.scss';

const MyPage = () => {
  return (
    <div className={styles.test}>
      <Header />
      <div>{test()}</div>
      <div>MyPage.tsx</div>
      <Footer />
    </div>
  );
};

export default MyPage;
