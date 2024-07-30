import { useState } from 'react';
import GoogleIcon from '../image/google-img.png';
import KakaoIcon from '../image/kakao-img.png';
import NaverIcon from '../image/naver-img.png';

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
  const [isLoginState, setLoginState] = useState('');
  return (
    <dialog ref={modalRef}>
      <div className={styles.contents}>
        <button
          onClick={() => {
            closeLoginModal();
            // window.location.href = AUTH_URLS.google;
          }}
        >
          <img src={GoogleIcon} alt="" />
          구글로 로그인하기
        </button>
        <button
          onClick={() => {
            closeLoginModal();
            // window.location.href = AUTH_URLS.naver;
            console.log('NAVER 로그인은 상태값이 필요합니다.');
          }}
        >
          <img src={NaverIcon} alt="" />
          네이버로 로그인하기
        </button>
        <button
          onClick={() => {
            closeLoginModal();
            // window.location.href = AUTH_URLS.kakao;
          }}
        >
          <img src={KakaoIcon} alt="" />
          카카오로 로그인하기
        </button>
      </div>
    </dialog>
  );
};
