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
import { useRecoilState, useResetRecoilState } from 'recoil';
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

  const resetUserData = useResetRecoilState(userDataAtom);

  useEffect(() => {
    let isMounted = true; // 컴포넌트가 마운트된 상태인지 확인하는 플래그

    const fetchProfileInfo = async () => {
      try {
        const res = await getProfile();

        if (isMounted && res?.data) {
          // 컴포넌트가 마운트되어 있을 때만 상태 업데이트
          setProfile(prev => ({
            ...prev,
            endDate: res?.data.endDate || 'unknown', // 데이터가 없을 경우 대비
            image: res?.data.image,
            location: res?.data.location || 'unknown',
            name: res?.data.name || 'unknown',
            role: res?.data.role || 'unknown',
            team: res?.data.team || 'unknown',
          }));
          setLoginState({ state: true });

          if (res?.status === 403 || res?.status === 404) {
            localStorage.removeItem('TOKEN');
            localStorage.removeItem('LoginType');
            setLoginState({ state: false });
            resetUserData();
          }
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);

        localStorage.removeItem('TOKEN');
        localStorage.removeItem('LoginType');
        setLoginState({ state: false });
        resetUserData();
      }
    };

    if (TOKEN && loginType) {
      fetchProfileInfo();
    }

    return () => {
      isMounted = false; // 컴포넌트 언마운트 시 플래그를 false로 설정
    };
  }, [loginType, TOKEN]);

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
          {isLoginState.state && isProfile.name != 'undefined' ? (
            // <button
            //   onClick={() => {
            //     navigate('/mypage');
            //   }}
            // >
            //   {/* {isProfile.name}님 */}
            //   {name}님
            // </button>

            <img
              src={
                isProfile.image
                  ? `${isProfile.image}?timestamp=${new Date().getTime()}`
                  : noProfile
              }
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
