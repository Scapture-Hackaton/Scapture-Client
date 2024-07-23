import styles from '../scss/header.module.scss';
import ScaptureLogo from '../image/scapture-logo.png';
const Header = () => {
  return (
    <div className={styles.header}>
      <div id={styles.image}>
        <img src={ScaptureLogo} alt="" />
      </div>
      <div className={styles.option} id={styles.BtnEffect}>
        <div>서비스 소개</div>
      </div>
      <div className={styles.option} id={styles.BtnEffect}>
        <div>SCAPTURE</div>
      </div>
      <div className={styles.option} id={styles.BtnEffect}>
        <div>커뮤니티</div>
      </div>
      <div id={styles.login}>로그인</div>
    </div>
  );
};

export default Header;
