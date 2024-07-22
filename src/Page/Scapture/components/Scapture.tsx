import Header from '../../Header/components/Header';
import Footer from '../../Footer/components/Footer';

import { test } from '../functions/function';
import styles from '../scss/scapture.module.scss';

const Scapture = () => {
  return (
    <div className={styles.test}>
      <Header />
      <div>{test()}</div>
      <div>Scapture.tsx</div>
      <Footer />
    </div>
  );
};

export default Scapture;
