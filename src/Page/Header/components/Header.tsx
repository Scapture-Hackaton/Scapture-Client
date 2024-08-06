import styles from '../scss/header.module.scss';
import modal from '../scss/login-modal.module.scss';
import {
  KAKAO_AUTH_URL,
  GOOGLE_AUTH_URL,
  NAVER_AUTH_URL,
} from '../../../apis/config/login.config';
import { LoginModal } from './LoginModal';
import ScaptureLogo from '../image/scapture-logo.svg';
import { useEffect, useRef } from 'react';
import useAuth from '../Hook/useAuth';
import { LoginToken } from '../../../apis/api/login.api';

import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginData, loginDataAtom } from '../Atom/atom';
import { userData } from '../../MyPage/dto/atom.interface';
import { userDataAtom } from '../../MyPage/Atom/atom';
import { getProfile } from '../../../apis/api/mypage.api';
const Header = () => {
  //localStorage
  const loginType = localStorage.getItem('LoginType');
  const TOKEN = localStorage.getItem('TOKEN');
  const name = localStorage.getItem('name');

  //DOM
  const modalRef = useRef<HTMLDialogElement>(null);

  //use components
  useAuth(LoginToken, loginType);

  //recoil
  const isLoginState = useRecoilValue<loginData>(loginDataAtom);
  const [isProfile, setProfile] = useRecoilState<userData>(userDataAtom);

  //modal function -> move to function
  const openLoginModal = () => {
    modalRef.current?.showModal();
  };

  //Object
  const AUTH_URLS = {
    kakao: KAKAO_AUTH_URL,
    google: GOOGLE_AUTH_URL,
    naver: NAVER_AUTH_URL,
  };

  useEffect(() => {
    console.log(isLoginState);
    //getprofile을 TOKEN과 LOGINTYPE이 정해지는 곳에서 다시 수행 또는 localstorage 변수를 useState로 변경
    const fetchProfileInfo = async () => {
      const res = await getProfile();
      // if (res?.data) {
      localStorage.setItem('name', res?.data.name);
      setProfile(prev => ({
        ...prev,
        endDate: res?.data.endDate,
        image: res?.data.image,
        location: res?.data.location,
        name: res?.data.name,
        role: res?.data.role,
        team: res?.data.team,
      }));
      // }
    };
    if (TOKEN && loginType) {
      fetchProfileInfo();
    }
  }, [isLoginState, setProfile, loginType, TOKEN]);

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div id={styles.image}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <img src={ScaptureLogo} alt="" />
          </Link>
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
          {isLoginState && isProfile.name != 'undefined' ? (
            <button>
              <Link to="/mypage" style={{ textDecoration: 'none' }}>
                {/* {isProfile.name}님 */}
                {name}님
              </Link>
            </button>
          ) : (
            <button onClick={openLoginModal}>로그인</button>
          )}
        </div>
        <LoginModal
          styles={modal}
          AUTH_URLS={AUTH_URLS}
          modalRef={modalRef}
        ></LoginModal>
      </div>
    </div>
  );
};

export default Header;
