import React, { useEffect, useRef, useState } from 'react';
import styles from '../scss/alertModal.module.scss';

import cancelIcon from '../../assets/Icon/Cancel.svg';
import SuccessIcon from '../../assets/image/successIcon.svg';

interface AlertModalProps {
  message: string;
  onClose: () => void; // 부모 컴포넌트에서 닫기 제어
}

const AlertModal: React.FC<AlertModalProps> = ({ message, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(true); // 모달 상태 관리

  const closeModal = () => {
    const dialog = dialogRef.current;
    if (dialog && dialog.open) {
      dialog.close(); // dialog 닫기
      setIsOpen(false); // 상태 업데이트
      onClose(); // 부모 컴포넌트에 알리기
    }
  };

  const handleDialogClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (event.target === dialog) {
      closeModal(); // 모달 외부 클릭 시 닫기
    }
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal(); // 모달 열기
      setIsOpen(true);
    }
  }, []);

  return (
    isOpen && (
      <dialog
        ref={dialogRef}
        id={styles.alertModal}
        onClick={handleDialogClick}
      >
        <div className={styles.header}>
          <div></div>
          <p>Notice</p>
          <img
            src={cancelIcon}
            alt="Cancel"
            width="24px"
            height="24px"
            loading="lazy"
            onClick={closeModal} // cancelIcon 클릭 시 닫기
          />
        </div>

        <div className={styles.container}>
          <img
            src={SuccessIcon}
            alt="Success"
            width="80px"
            height="80px"
            loading="lazy"
          />
          <div className={styles.contents}>
            <div className={styles.notice}>{message}</div>
          </div>
        </div>
      </dialog>
    )
  );
};

export default AlertModal;
