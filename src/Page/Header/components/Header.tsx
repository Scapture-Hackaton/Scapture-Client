import styles from '../scss/header.module.scss';
import ScaptureLogo from '../image/scapture-logo.png';
import GoogleIcon from '../image/google-img.png';
import KakaoIcon from '../image/kakao-img.png';
import NaverIcon from '../image/naver-img.png';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const modalLogin = () => {
    modalRef.current?.showModal();
  };

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div id={styles.image}>
          <img src={ScaptureLogo} alt="" />
        </div>
        <div className={styles.option} id={styles.BtnEffect}>
          <div>
            <Link to="/" style={{ textDecoration: 'none' }}>
              서비스 소개
            </Link>
          </div>
        </div>
        <div className={styles.option} id={styles.BtnEffect}>
          <div>
            <Link to="/scapture" style={{ textDecoration: 'none' }}>
              SCAPTURE
            </Link>
          </div>
        </div>
        <div className={styles.option} id={styles.BtnEffect}>
          <div>
            <Link to="/community" style={{ textDecoration: 'none' }}>
              커뮤니티
            </Link>
          </div>
        </div>
        <div id={styles.login}>
          <button onClick={modalLogin}>로그인</button>
        </div>

        <dialog ref={modalRef}>
          <div className={styles.contents}>
            <button onClick={() => modalRef.current?.close()}>
              <img src={GoogleIcon} alt="" />
              구글로 로그인하기
            </button>
            <button onClick={() => modalRef.current?.close()}>
              <img src={NaverIcon} alt="" />
              네이버로 로그인하기
            </button>
            <button onClick={() => modalRef.current?.close()}>
              <img src={KakaoIcon} alt="" />
              카카오로 로그인하기
            </button>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Header;
