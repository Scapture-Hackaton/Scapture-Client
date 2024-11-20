// import GoogleIcon from '../image/googleIcon.svg';
import KakaoIcon from '../image/kakaoIcon.svg';
// import NaverIcon from '../image/naverIcon.svg';
import cancelIcon from '../../../assets/Icon/Cancel.svg';
import modalLogo from '../image/scaptureModalLogo.svg';

import styles from '../scss/login-modal.module.scss';

import {
  GOOGLE_AUTH_URL,
  KAKAO_AUTH_URL,
  NAVER_AUTH_URL,
} from '../../../apis/config/login.config';

interface LoginModalProps {
  modalRef: React.RefObject<HTMLDialogElement>;
}

// 상태 토큰으로 사용할 랜덤 문자열 생성
// const generateState = () => {
//   const array = new Uint8Array(16);
//   window.crypto.getRandomValues(array);
//   return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
// };

export const LoginModal: React.FC<LoginModalProps> = ({ modalRef }) => {
  //Object
  const AUTH_URLS = {
    kakao: KAKAO_AUTH_URL,
    google: GOOGLE_AUTH_URL,
    naver: NAVER_AUTH_URL,
  };

  const closeLoginModal = () => {
    modalRef.current?.close();
  };

  const handleDialogClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    const dialog =
      modalRef && typeof modalRef !== 'function' ? modalRef.current : null;
    if (dialog && event.target === dialog) {
      closeLoginModal();
    }
  };

  // 추후 리팩토링 후 작업 예정(MyPage)
  // const handleLoginType = () = > {

  // }

  return (
    <dialog ref={modalRef} id={styles.loginModal} onClick={handleDialogClick}>
      <div className={styles.header}>
        <div></div>
        <p>로그인</p>
        <img
          src={cancelIcon}
          alt=""
          width="24px"
          height="24px"
          loading="lazy"
          onClick={() => {
            closeLoginModal();
          }}
        ></img>
      </div>
      <div className={styles.contents}>
        <div className={styles.video}>
          <img
            src={modalLogo}
            alt=""
            width="180px"
            height="86px"
            loading="lazy"
          ></img>
        </div>
        <div className={styles.text}>
          <div>지금 로그인하고 손쉽게 나의 운동 영상을</div>
          <div>확인하고 저장하세요!</div>
        </div>

        <div className={styles.group}>
          {/* <button
            onClick={() => {
              localStorage.setItem('LoginType', 'google');
              closeLoginModal();
              window.location.href = AUTH_URLS.google;
            }}
            className={styles.google}
          >
            <img
              src={GoogleIcon}
              alt=""
              width="24px"
              height="24px"
              loading="lazy"
            />
            <div>Google 로그인</div>
          </button> */}
          <button
            onClick={() => {
              localStorage.setItem('LoginType', 'kakao');
              localStorage.setItem('Redirect', window.location.href);
              closeLoginModal();
              window.location.href = AUTH_URLS.kakao;
            }}
            className={styles.kakao}
          >
            <img
              src={KakaoIcon}
              alt=""
              width="24px"
              height="24px"
              loading="lazy"
            />
            <div>카카오 로그인</div>
          </button>
          {/* <button
            onClick={() => {
              localStorage.setItem('LoginType', 'naver');
              closeLoginModal();
              window.location.href = `${AUTH_URLS.naver}&state=${generateState()}`;
              console.log('NAVER 로그인은 상태값이 필요합니다.');
            }}
            className={styles.naver}
          >
            <img
              src={NaverIcon}
              alt=""
              width="24px"
              height="24px"
              loading="lazy"
            />
            <div>네이버 로그인</div>
          </button> */}
        </div>
      </div>

      <div className={styles.contents}>
        {/* <div
          id={styles.empty}
          onClick={() => {
            localStorage.setItem('LoginType', 'google');
            closeLoginModal();
            window.location.href = AUTH_URLS.google;
          }}
        >
        // <img src={GoogleIcon} alt="" />
          구글로 로그인하기
        </div> */}
      </div>
    </dialog>
  );
};
