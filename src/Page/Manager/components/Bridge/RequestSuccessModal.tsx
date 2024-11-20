import React, { useEffect, useRef, useState } from 'react';

import cancelIcon from '../../../../assets/Icon/Cancel.svg';
import SuccessIcon from '../../image/successIcon.svg';

import styles from '../../scss/requestSuccessModal.module.scss';

const RequestSuccessModal = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      setIsVisible(true); // 애니메이션 시작
      dialog?.showModal();
    }

    // 1초 뒤 애니메이션 시작 후 닫기
    const timer = setTimeout(() => {
      setIsVisible(false); // 페이드 아웃 시작
      setTimeout(() => {
        dialog?.close();
      }, 1000); // fadeOut 애니메이션 지속 시간과 맞춤
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleDialogClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (event.target === dialogRef.current) {
      dialog?.close();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      id={styles.requestSuccessModal}
      onClick={handleDialogClick}
      className={isVisible ? styles.fadeIn : styles.fadeOut}
    >
      <div className={styles.header}>
        <div></div>
        <p>Notice</p>
        <img
          src={cancelIcon}
          alt=""
          width="24px"
          height="24px"
          loading="lazy"
          onClick={() => {
            const dialog = dialogRef.current;
            dialog?.close();
          }}
        ></img>
      </div>

      <div className={styles.container}>
        <img
          src={SuccessIcon}
          alt=""
          width="80px"
          height="80px"
          loading="lazy"
        />
        <div className={styles.contents}>
          <div className={styles.notice}>요청이 완료되었습니다!</div>
          <div className={styles.noticeDes}>알림톡에서 신청한 영상을</div>
          <div className={styles.noticeDes}>확인하실 수 있습니다!</div>
        </div>
      </div>
    </dialog>
  );
};

export default RequestSuccessModal;
