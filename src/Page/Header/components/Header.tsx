import styles from '../scss/header.module.scss';
import {
  KAKAO_AUTH_URL,
  GOOGLE_AUTH_URL,
  NAVER_AUTH_URL,
} from '../../../apis/config/login.config';

import { LoginModal } from './LoginModal';

import ScaptureLogo from '../image/scapture-logo.png';
import { useEffect, useRef, useState } from 'react';
import useAuth from '../Hook/useAuth';
import {
  LoginKAKAOToken,
  LoginNAVERToken,
  LoginGOOGLEToken,
} from '../../../apis/api/login.api';

const Header = () => {
  const [isLoginType, setLoginType] = useState<string>('');

  useEffect(() => {
    if (isLoginType) {
      console.log('loginType', isLoginType);
    } else {
      console.log('Not Type');
    }
  });

  useAuth(LoginKAKAOToken);

  const modalRef = useRef<HTMLDialogElement>(null);

  const openLoginModal = () => {
    modalRef.current?.showModal();
  };

  const AUTH_URLS = {
    kakao: KAKAO_AUTH_URL,
    google: GOOGLE_AUTH_URL,
    naver: NAVER_AUTH_URL,
    // 여기에 API를 객체로 전달 할 수 있게
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
          AUTH_URLS={AUTH_URLS}
          modalRef={modalRef}
          loginType={setLoginType}
        ></LoginModal>
      </div>
    </div>
  );
};

export default Header;
