import { forwardRef } from 'react';
import GoogleIcon from '../image/google-img.png';
import KakaoIcon from '../image/kakao-img.png';
import NaverIcon from '../image/naver-img.png';

export const LoginModal = forwardRef<
  HTMLDialogElement,
  { styles: any; AUTH_URL: string }
>(({ styles, AUTH_URL }, ref) => {
  const closeLoginModal = () => {
    if (ref && 'current' in ref && ref.current) {
      ref.current?.close();
    }
  };
  return (
    <dialog ref={ref}>
      <div className={styles.contents}>
        <button onClick={closeLoginModal}>
          <img src={GoogleIcon} alt="" />
          구글로 로그인하기
        </button>
        <button onClick={closeLoginModal}>
          <img src={NaverIcon} alt="" />
          네이버로 로그인하기
        </button>
        <button
          onClick={() => {
            closeLoginModal();
            window.location.href = AUTH_URL;
          }}
        >
          <img src={KakaoIcon} alt="" />
          카카오로 로그인하기
        </button>
      </div>
    </dialog>
  );
});
