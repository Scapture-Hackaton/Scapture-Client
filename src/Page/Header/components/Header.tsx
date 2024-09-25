import styles from '../scss/header.module.scss';
import modal from '../scss/login-modal.module.scss';
import {
  KAKAO_AUTH_URL,
  GOOGLE_AUTH_URL,
  NAVER_AUTH_URL,
} from '../../../apis/config/login.config';
import { LoginModal } from './LoginModal';

import ScaptureLogo from '../image/scaptureLogo.svg';
import menuTopIcon from '../image/menuTopIcon.svg';
import noProfile from '../image/noProfile.svg';

import { useEffect, useRef, useState } from 'react';
import useAuth from '../Hook/useAuth';
import { LoginToken } from '../../../apis/api/login.api';

import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginData, loginDataAtom } from '../Atom/atom';
import { userData } from '../../MyPage/dto/atom.interface';
import { userDataAtom } from '../../MyPage/Atom/atom';
import { getProfile } from '../../../apis/api/mypage.api';

interface HeaderProps {
  index: number;
}

const Header: React.FC<HeaderProps> = ({ index }) => {
  const [isIndex, setIndex] = useState(index);

  useEffect(() => {
    setIndex(index);
  }, [index]);

  //localStorage
  const loginType = localStorage.getItem('LoginType');
  const TOKEN = localStorage.getItem('TOKEN');
  // const name = localStorage.getItem('name');

  //DOM
  const modalRef = useRef<HTMLDialogElement>(null);

  //use components
  useAuth(LoginToken, loginType);

  //recoil
  const [isLoginState, setLoginState] =
    useRecoilState<loginData>(loginDataAtom);

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
    // console.log(isLoginState);
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
      setLoginState({ state: true });
      // }
    };
    if (TOKEN && loginType) {
      fetchProfileInfo();
    }
  }, [isLoginState, setProfile, loginType, TOKEN]);

  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div id={styles.image}>
          <img
            src={ScaptureLogo}
            loading="lazy"
            alt=""
            onClick={() => {
              navigate('/');
            }}
            width="76px"
            height="28px"
          />
        </div>

        <div
          className={`${styles.option} ${isIndex === 1 ? styles.block : ''}`}
          onClick={() => {
            navigate('/');
          }}
        >
          <div className={styles.hoverd}>
            <img
              src={menuTopIcon}
              loading="lazy"
              alt=""
              width="14px"
              height="10px"
            />
          </div>
          <div>서비스</div>
        </div>

        <div
          className={`${styles.option} ${isIndex === 2 ? styles.block : ''}`}
          onClick={() => {
            navigate('/scapture');
          }}
        >
          <div className={styles.hoverd}>
            <img
              src={menuTopIcon}
              loading="lazy"
              alt=""
              width="14px"
              height="10px"
            />
          </div>
          <div>Scapture</div>
        </div>

        <div
          className={`${styles.option} ${isIndex === 3 ? styles.block : ''}`}
          onClick={() => {
            navigate('/community');
          }}
        >
          <div className={styles.hoverd}>
            <img
              src={menuTopIcon}
              loading="lazy"
              alt=""
              width="14px"
              height="10px"
            />
          </div>
          <div>커뮤니티</div>
        </div>

        <div id={styles.login}>
          {isLoginState && isProfile.name != 'undefined' ? (
            // <button
            //   onClick={() => {
            //     navigate('/mypage');
            //   }}
            // >
            //   {/* {isProfile.name}님 */}
            //   {name}님
            // </button>

            <img
              src={isProfile.image ? isProfile.image : noProfile}
              alt=""
              width="29px"
              height="29px"
              onClick={() => {
                navigate('/mypage');
              }}
            />
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
