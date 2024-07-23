import Header from '../../Header/components/Header';
import Footer from '../../Footer/components/Footer';

import { test } from '../functions/function';
import styles from '../scss/reservation.module.scss';

const Reservation = () => {
  return (
    <div className={styles.test}>
      <Header />
      <div>{test()}</div>
      <div>Reservation.tsx</div>
      <Footer />
    </div>
  );
};

export default Reservation;
