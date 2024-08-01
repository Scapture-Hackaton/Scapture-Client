import { useEffect } from 'react';
import { LoginResponse } from '../Atom/atom';
import GoogleIcon from '../image/google-img.png';
import KakaoIcon from '../image/kakao-img.png';
import NaverIcon from '../image/naver-img.png';
import { useRecoilState } from 'recoil';
import useAuth from '../Hook/useAuth';
import { LoginKAKAOToken } from '../../../apis/api/login.api';

interface LoginModalProps {
  styles: { [key: string]: string };
  AUTH_URLS: { kakao: string; google: string; naver: string };
  modalRef: React.RefObject<HTMLDialogElement>;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  styles,
  AUTH_URLS,
  modalRef,
}) => {
  const closeLoginModal = () => {
    modalRef.current?.close();
  };
  const [isLoginType, setLoginType] = useRecoilState(LoginResponse);
  // const [isLoginState, setLoginState] = useRecoilState('');
  // useAuth(LoginKAKAOToken(loginType));
  useEffect(() => {
    if (isLoginType) {
      console.log('Updated login type:', isLoginType);
      alert(isLoginType); // 상태가 업데이트된 후의 값 확인
    }
  }, [isLoginType]);

  return (
    <dialog ref={modalRef}>
      <div className={styles.contents}>
        <button
          onClick={() => {
            setLoginType('google');
            localStorage.setItem('LoginType', 'google');
            closeLoginModal();
            window.location.href = AUTH_URLS.google;
          }}
        >
          <img src={GoogleIcon} alt="" />
          구글로 로그인하기
        </button>
        <button
          onClick={() => {
            // loginType('naver');
            setLoginType('naver');
            localStorage.setItem('LoginType', 'naver');
            closeLoginModal();
            window.location.href = AUTH_URLS.naver;
            console.log('NAVER 로그인은 상태값이 필요합니다.');
          }}
        >
          <img src={NaverIcon} alt="" />
          네이버로 로그인하기
        </button>
        <button
          onClick={() => {
            // loginType('kakao');
            setLoginType('kakao');
            localStorage.setItem('LoginType', 'kakao');
            closeLoginModal();
            window.location.href = AUTH_URLS.kakao;
            // console.log(AUTH_URLS.kakao);
          }}
        >
          <img src={KakaoIcon} alt="" />
          카카오로 로그인하기
        </button>
      </div>
    </dialog>
  );
};
