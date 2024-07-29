import GoogleIcon from '../image/google-img.png';
import KakaoIcon from '../image/kakao-img.png';
import NaverIcon from '../image/naver-img.png';

interface LoginModalProps {
  styles: { [key: string]: string };
  AUTH_URL: string;
  modalRef: React.RefObject<HTMLDialogElement>;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  styles,
  AUTH_URL,
  modalRef,
}) => {
  const closeLoginModal = () => {
    modalRef.current?.close();
  };
  return (
    <dialog ref={modalRef}>
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
};
