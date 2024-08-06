import GoogleIcon from '../image/google-img.png';
import KakaoIcon from '../image/kakao-img.png';
import NaverIcon from '../image/naver-img.png';

interface LoginModalProps {
  styles: { [key: string]: string };
  AUTH_URLS: { kakao: string; google: string; naver: string };
  modalRef: React.RefObject<HTMLDialogElement>;
}

// 상태 토큰으로 사용할 랜덤 문자열 생성
const generateState = () => {
  const array = new Uint8Array(16);
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

export const LoginModal: React.FC<LoginModalProps> = ({
  styles,
  AUTH_URLS,
  modalRef,
}) => {
  const closeLoginModal = () => {
    modalRef.current?.close();
  };

  // 추후 리팩토링 후 작업 예정(MyPage)
  // const handleLoginType = () = > {

  // }

  return (
    <dialog ref={modalRef} id={styles.loginModal}>
      <div className={styles.contents}>
        <button
          onClick={() => {
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
            localStorage.setItem('LoginType', 'naver');
            closeLoginModal();
            window.location.href = `${AUTH_URLS.naver}&state=${generateState()}`;
            console.log('NAVER 로그인은 상태값이 필요합니다.');
          }}
        >
          <img src={NaverIcon} alt="" />
          네이버로 로그인하기
        </button>
        <button
          onClick={() => {
            localStorage.setItem('LoginType', 'kakao');
            closeLoginModal();
            window.location.href = AUTH_URLS.kakao;
          }}
        >
          <img src={KakaoIcon} alt="" />
          카카오로 로그인하기
        </button>
      </div>
    </dialog>
  );
};
