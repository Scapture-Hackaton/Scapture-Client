import styles from '../scss/header.module.scss';

// import { loginData } from '../../../apis/api/login.api';
import { KAKAO_AUTH_URL } from '../../../apis/config/login.config';

import { LoginModal } from './LoginModal';

import ScaptureLogo from '../image/scapture-logo.png';
import GoogleIcon from '../image/google-img.png';
import KakaoIcon from '../image/kakao-img.png';
import NaverIcon from '../image/naver-img.png';
import { useRef } from 'react';
const Header = () => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const openLoginModal = () => {
    modalRef.current?.showModal();
  };

  return (
    <div className={styles.header}>
      <div className={styles.container}>
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
        <div id={styles.login}>
          <button onClick={openLoginModal}>로그인</button>
        </div>
        <LoginModal
          styles={styles}
          AUTH_URL={KAKAO_AUTH_URL}
          ref={modalRef}
        ></LoginModal>
        {/* <dialog ref={modalRef}>
          <div className={styles.contents}>
            <button
              onClick={() => {
                modalRef.current?.close();
              }}
            >
              <img src={GoogleIcon} alt="" />
              구글로 로그인하기
            </button>
            <button onClick={() => modalRef.current?.close()}>
              <img src={NaverIcon} alt="" />
              네이버로 로그인하기
            </button>
            <button
              onClick={() => {
                modalRef.current?.close();
                window.location.href = KAKAO_AUTH_URL;
              }}
            >
              <img src={KakaoIcon} alt="" />
              카카오로 로그인하기
            </button>
          </div>
        </dialog> */}
      </div>
    </div>
  );
};

export default Header;
