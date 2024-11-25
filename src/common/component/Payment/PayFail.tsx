import Header from '../../../Page/Header/components/Header';
import Footer from '../../../Page/Footer/components/Footer';

import styles from '../../scss/paySuccess.module.scss';

import FailIcon from '../../../assets/image/successIcon.svg';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginData, loginDataAtom } from '../../../Page/Header/Atom/atom';

const PayFail = () => {
  // const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isLoginState = useRecoilValue<loginData>(loginDataAtom);

  const goToMyPage = () => {
    if (isLoginState.state) {
      navigate('/myPage');
    } else {
      navigate('/');
    }
  };

  const confirm = () => {
    const redirect = localStorage.getItem('payRedirect');

    if (redirect) {
      window.location.href = redirect;
    } else {
      navigate('/');
    }
  };

  return (
    <div className={styles.result}>
      <Header index={0}></Header>
      <div className={styles.box_section}>
        <div className={styles.content}>
          <img src={FailIcon} alt="" width="80px" height="80px"></img>
          <div id={styles.title}>결제에 실패했습니다!</div>
          <div id={styles.des}>잠시 후 다시 시도해주세요.</div>
        </div>
        <div className={styles.btns}>
          <div id={styles.goPage} onClick={() => goToMyPage()} />
          <div id={styles.goPage} onClick={() => confirm()} />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default PayFail;
