import { test } from '../functions/function';
import styles from '../scss/reservation.module.scss';
        
const Reservation = () => {
  return (
    <div className={styles.test}>
      <div>{test()}</div>
      <div>Reservation.tsx</div>
    </div>
  );
};

export default Reservation;
