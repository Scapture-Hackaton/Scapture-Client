import Header from '../../Header/components/Header';
import Footer from '../../Footer/components/Footer';

import { test } from '../functions/function';
import styles from '../scss/stadium.module.scss';

const Stadium = () => {
  return (
    <div className={styles.test}>
      <Header />
      <div>{test()}</div>
      <div>Stadium.tsx</div>
      <Footer />
    </div>
  );
};

export default Stadium;
