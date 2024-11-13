import React, { useEffect, useRef } from 'react';

import cancelIcon from '../../../../../assets/Icon/Cancel.svg';
import dateIcon from '../../../../../assets/Icon/dateIcon.svg';
import stadiumIcon from '../../../../../assets/Icon/stadiumIcon.svg';

import clockIcon from '../../../../../assets/Icon/Clock.svg';
import styles from '../../scss/recordCheckModal.module.scss';

interface RecordCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  checkAndStartRecording: () => void;
  selectedField: string;
  selectedTime: number;
}

const RecordCheckModal: React.FC<RecordCheckModalProps> = ({
  isOpen,
  onClose,
  checkAndStartRecording,
  selectedField,
  selectedTime,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen) {
      dialog?.showModal();
    } else {
      dialog?.close();
    }
  }, [isOpen]);

  const closeModal = () => {
    onClose();
  };

  const handleDialogClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      closeModal();
    }
  };

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
  };

  return (
    <dialog
      ref={dialogRef}
      id={styles.reservationModal}
      onClick={handleDialogClick}
    >
      <div className={styles.header}>
        <div></div>
        <p>녹화 시작하기</p>
        <img
          src={cancelIcon}
          alt=""
          width="24px"
          height="24px"
          loading="lazy"
          onClick={() => {
            closeModal();
          }}
        ></img>
      </div>
      <div className={styles.contents}>
        <div className={styles.notice}>다음 조건으로 녹화하시겠어요?</div>
        <div className={styles.noticeDes}>
          녹화가 시작되면 설정한 시간이 지날 때까지
        </div>
        <div className={styles.noticeDes}>중단할 수 없습니다.</div>
        <ul className={styles.info}>
          <li className={styles.line}>
            <img
              src={dateIcon}
              alt=""
              width="20px"
              height="20px"
              loading="lazy"
            />
            {/* <div>{reservation?.date}</div> */}
            <div>{getCurrentDate()}</div>
          </li>
          <li className={styles.line}>
            <img
              src={stadiumIcon}
              alt=""
              width="20px"
              height="20px"
              loading="lazy"
            />
            <div>{selectedField}</div>
            {/* <div>구장명 입니다.</div> */}
          </li>
          <li className={styles.line}>
            <img
              src={clockIcon}
              alt=""
              width="20px"
              height="20px"
              loading="lazy"
            />
            <div>{selectedTime}분</div>
            {/* <div>00:00 ~ 00:00</div> */}
          </li>
        </ul>
      </div>
      <div className={styles.footer}>
        <button
          className={styles.changeInfo}
          onClick={() => {
            closeModal();
          }}
        >
          조건 수정하기
        </button>
        <button
          className={styles.startRecord}
          onClick={() => {
            closeModal();
            checkAndStartRecording();
          }}
        >
          녹화 시작하기
        </button>
      </div>
    </dialog>
  );
};

export default RecordCheckModal;
