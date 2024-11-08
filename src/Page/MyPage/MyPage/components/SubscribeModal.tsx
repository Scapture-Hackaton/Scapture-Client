import React, { useEffect, useRef, useState } from 'react';
import styles from '../scss/my-page.module.scss';

import Cancel from '../image/cancel.svg';
// import Vector from '../image/Vector9.svg';
import benefit1 from '../image/benefit1.svg';
import benefit2 from '../image/benefit2.svg';
import benefit3 from '../image/benefit3.svg';
import benefit4 from '../image/benefit4.svg';
import Payments from '../../../../common/component/Payment/Payments';

interface SubscribeModalProps {
  toggleModal2: () => void;
}

const SubscribeModal: React.FC<SubscribeModalProps> = ({ toggleModal2 }) => {
  const paymentModalRef = useRef<HTMLDivElement>(null);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const paymentModalClose = () => {
    setIsPaymentModalOpen(false);
  };

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

  return (
    <>
      <div className={styles.benefitContainer}>
        <div className={styles.benefit}>
          <div className={styles.modalHeader}>
            <div className={styles.modalHeaderText}>구독 혜택</div>
            <img
              className={styles.close}
              src={Cancel}
              onClick={() => {
                toggleModal2();
              }}
            ></img>
          </div>
          {/* <img src={Vector} /> */}
          <div className={styles.hr}></div>
          <div className={styles.detailContainer}>
            <div className={styles.detail}>
              <img
                src={benefit1}
                alt=""
                className={styles.img}
                width="32px"
                height="32px"
              ></img>
              <div className={styles.text}>
                고화질 영상 무제한 무료 다운로드
              </div>
            </div>
            <div className={styles.detail}>
              <img
                src={benefit2}
                alt=""
                className={styles.img}
                width="32px"
                height="32px"
              ></img>
              <div className={styles.text}>1080p 화질로 무한 시청</div>
            </div>
            <div className={styles.detail}>
              <img
                src={benefit3}
                alt=""
                className={styles.img}
                width="32px"
                height="32px"
              ></img>
              <div className={styles.text}>영상 무제한 저장</div>
            </div>
            <div className={styles.detail}>
              <img
                src={benefit4}
                alt=""
                className={styles.img}
                width="32px"
                height="32px"
              ></img>
              <div className={styles.text}>광고 제거</div>
            </div>
            <div
              className={styles.button}
              onClick={() => {
                setIsPaymentModalOpen(true);
              }}
            >
              구독하러 가기
            </div>
          </div>
        </div>
      </div>
      {isPaymentModalOpen && (
        <Payments payValue={29_900} paymentModalClose={paymentModalClose} />
      )}
    </>
  );
};

export default SubscribeModal;
