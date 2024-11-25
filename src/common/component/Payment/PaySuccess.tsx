import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../../Page/Header/components/Header';
import Footer from '../../../Page/Footer/components/Footer';

import styles from '../../scss/paySuccess.module.scss';

import SuccessIcon from '../../../assets/image/Success.svg';
import { loginData, loginDataAtom } from '../../../Page/Header/Atom/atom';
import { useRecoilValue } from 'recoil';

const PaySuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // 쿼리 파라미터 값이 결제 요청할 때 보낸 데이터와 동일한지 반드시 확인하세요.
    // 클라이언트에서 결제 금액을 조작하는 행위를 방지할 수 있습니다.
    const requestData = {
      orderId: searchParams.get('orderId'),
      amount: searchParams.get('amount'),
      paymentKey: searchParams.get('paymentKey'),
    };

    const confirm = async () => {
      const response = await fetch('/api/payments/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const json = await response.json();

      if (!response.ok) {
        // 결제 실패 비즈니스 로직을 구현하세요.
        navigate(`/fail?message=${json.message}&code=${json.code}`);
        return;
      }

      // 결제 성공 비즈니스 로직을 구현하세요.
    };
    confirm();
  }, []);

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
          <img src={SuccessIcon} alt="" width="80px" height="80px"></img>
          <div id={styles.title}>결제가 완료되었습니다!</div>
          <div id={styles.des}>이제 하이라이트 영상을 간직할 수 있어요.</div>
        </div>
        <div className={styles.btns}>
          <div id={styles.goPage} onClick={() => goToMyPage()}>
            마이페이지로 이동
          </div>
          <div id={styles.okay} onClick={() => confirm()}>
            확인
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default PaySuccess;
