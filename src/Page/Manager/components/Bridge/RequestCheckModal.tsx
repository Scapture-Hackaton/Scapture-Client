import React, { useEffect, useRef, useState } from 'react';

import cancelIcon from '../../../../assets/Icon/Cancel.svg';
import dateIcon from '../../../../assets/Icon/dateIcon.svg';
import stadiumIcon from '../../../../assets/Icon/stadiumIcon.svg';
import clockIcon from '../../../../assets/Icon/Clock.svg';
import CoinIcon from '../../../../assets/Icon/CoinIcon.svg';

import styles from '../../scss/requestCheckModal.module.scss';
// import { postHighlight } from '../../../../apis/api/user.api';
import RequestSuccessModal from './RequestSuccessModal';
import Payments from '../../../../common/component/Payment/Payments';

interface RequestCheckModalProps {
  scheduleId: number;
  isOpen: boolean;
  onClose: () => void;
  fieldName: string;
  formattedDate: string;
  selectedTime: string;
  refetchData: () => void;
}

const RequestCheckModal: React.FC<RequestCheckModalProps> = ({
  scheduleId,
  isOpen,
  onClose,
  fieldName,
  formattedDate,
  selectedTime,
  refetchData,
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
    // await postHighlight(scheduleId);

    // 현재 모달 닫기
    closeModal();
    setIsPaymentModalOpen(true);

    refetchData();

    // 성공 모달 표시
    // setSuccessModalVisible(true);
  };

  const paymentModalRef = useRef<HTMLDivElement>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // 화면 밖 클릭 시 모달 닫기
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        paymentModalRef.current &&
        !paymentModalRef.current.contains(event.target as Node)
      ) {
        setIsPaymentModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const paymentModalClose = () => {
    setIsPaymentModalOpen(false);
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
          <div className={styles.noticeDes}>
            <span>24시간</span> 이내로 알림톡이 발송될 예정입니다.
          </div>
          <div className={styles.noticeDes}>
            링크를 통해 영상을 쉽게 확인하실 수 있어요!
          </div>
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
            <li className={styles.line}>
              <img
                src={CoinIcon}
                alt=""
                width="20px"
                height="20px"
                loading="lazy"
              />
              <div>1,000원</div>
            </li>
          </ul>
        </div>
        <div className={styles.footDes}>
          요청자는 <span>더 저렴하게 영상을 다운로드</span> 할 수 있습니다!
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

      {isPaymentModalOpen && scheduleId && (
        <Payments
          payValue={1000}
          paymentModalClose={paymentModalClose}
          orderName="하이라이트 추출 요청"
          type="HIGHLIGHT"
          resource={`${scheduleId}`}
        />
      )}
    </>
  );
};

export default RequestCheckModal;
