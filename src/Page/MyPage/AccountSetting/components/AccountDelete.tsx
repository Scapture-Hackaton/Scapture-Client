import Footer from '../../../Footer/components/Footer';
import styles from '../scss/account.module.scss';
import Header from '../../../Header/components/Header';
import Clock from '../image/Clock.svg';
import { useNavigate } from 'react-router-dom';

const AccountDelete = () => {
  return (
    <div className={styles.test}>
      <Header index={0}></Header>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <img className={styles.backButton} src={Clock}></img>
          <div className={styles.title}>회원탈퇴</div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AccountDelete;
