import React, { useEffect, useRef, useState } from 'react';

import cancelIcon from '../../../../assets/Icon/Cancel.svg';
import dateIcon from '../../../../assets/Icon/dateIcon.svg';
import stadiumIcon from '../../../../assets/Icon/stadiumIcon.svg';
import clockIcon from '../../../../assets/Icon/Clock.svg';

import styles from '../../scss/requestCheckModal.module.scss';
import { postHighlight } from '../../../../apis/api/user.api';
import RequestSuccessModal from './RequestSuccessModal';

interface RequestCheckModalProps {
  scheduleId: number;
  isOpen: boolean;
  onClose: () => void;
  fieldName: string;
  formattedDate: string;
  selectedTime: string;
}

const RequestCheckModal: React.FC<RequestCheckModalProps> = ({
  scheduleId,
  isOpen,
  onClose,
  fieldName,
  formattedDate,
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

  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

  const handleRequestClick = async () => {
    await postHighlight(scheduleId);

    // 현재 모달 닫기
    closeModal();

    // 성공 모달 표시
    setSuccessModalVisible(true);
  };

  return (
    <>
      <dialog
        ref={dialogRef}
        id={styles.requestModal}
        onClick={handleDialogClick}
      >
        <div className={styles.header}>
          <div></div>
          <p>하이라이트 추출 요청하기</p>
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
          <div className={styles.notice}>오늘 경기 하이라이트 추출하기</div>
          <div className={styles.noticeDes}>알림톡을 통해 추출된 영상을</div>
          <div className={styles.noticeDes}>쉽게 확인하실 수 있어요!</div>
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
              <div>{formattedDate.replace(/-/g, '.')}</div>
            </li>
            <li className={styles.line}>
              <img
                src={stadiumIcon}
                alt=""
                width="20px"
                height="20px"
                loading="lazy"
              />
              <div>{fieldName}</div>
            </li>
            <li className={styles.line}>
              <img
                src={clockIcon}
                alt=""
                width="20px"
                height="20px"
                loading="lazy"
              />
              <div>{selectedTime}</div>
            </li>
          </ul>
        </div>
        <div className={styles.footer}>
          <div
            className={styles.cancel}
            onClick={() => {
              closeModal();
            }}
          >
            취소
          </div>
          <div className={styles.request} onClick={handleRequestClick}>
            요청하기
          </div>
        </div>
      </dialog>

      <RequestSuccessModal
        visible={isSuccessModalVisible}
        onHide={() => setSuccessModalVisible(false)}
      />
    </>
  );
};

export default RequestCheckModal;
