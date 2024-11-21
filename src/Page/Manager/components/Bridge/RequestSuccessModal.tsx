import React, { useEffect, useRef } from 'react';

import cancelIcon from '../../../../assets/Icon/Cancel.svg';
import SuccessIcon from '../../../../assets/image/successIcon.svg';

import styles from '../../scss/requestSuccessModal.module.scss';

interface RequestSuccessModalProps {
  visible: boolean;
  onHide: () => void;
}

const RequestSuccessModal: React.FC<RequestSuccessModalProps> = ({
  visible,
  onHide,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => onHide(), 2000); // 2초 후 사라짐
      return () => clearTimeout(timer);
    }
  }, [visible, onHide]);

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
      className={`${visible ? styles.show : ''}`}
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
