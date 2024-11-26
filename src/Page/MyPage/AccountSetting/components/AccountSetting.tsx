import Footer from '../../../Footer/components/Footer';
import styles from '../scss/account.module.scss';
import Header from '../../../Header/components/Header';
import Clock from '../image/Clock.svg';
import { useNavigate } from 'react-router-dom';
import { userDataAtom } from '../../Atom/atom';
import { loginDataAtom } from '../../../Header/Atom/atom';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

const AccountSetting = () => {
  const navigate = useNavigate();

  const toDeletePage = () => {
    navigate('/mypage/account/delete');
  };

  const toMyPage = () => {
    navigate('/mypage');
  };
  const setLoginState = useSetRecoilState(loginDataAtom);
  const resetUserData = useResetRecoilState(userDataAtom);

  const toggleLogout = () => {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('LoginType');
    setLoginState({ state: false });
    resetUserData();

    navigate('/');
  };

  return (
    <div className={styles.test}>
      <Header index={0}></Header>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <img
            className={styles.backButton}
            src={Clock}
            onClick={toMyPage}
          ></img>
          <div className={styles.title}>계정 설정</div>
        </div>
        <div className={styles.accountContainer}>
          <div className={styles.account}>계정</div>
          <div className={styles.logout} onClick={toggleLogout}>
            로그아웃
          </div>
          <div className={styles.line}></div>
          <div className={styles.delete} onClick={toDeletePage}>
            회원탈퇴
          </div>
          <div className={styles.line}></div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AccountSetting;
