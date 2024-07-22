import Header from '../../Header/components/Header';
import Footer from '../../Footer/components/Footer';

import { test } from '../functions/function';
import styles from '../scss/main.module.scss';

const Main = () => {
  return (
    <div className={styles.test}>
      <Header />
      <div>{test()}</div>
      <div>Main.tsx</div>
      <Footer />
    </div>
  );
};

export default Main;
