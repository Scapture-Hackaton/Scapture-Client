import React, { useEffect, useRef, useState } from 'react';
import Cancel from '../image/cancel.svg';
import Banana from '../image/banana.svg';

import styles from '../scss/chargeBanana.module.scss';
import Payments from '../../../../common/component/Payment/Payments';

interface ChargeBananaProps {
  toggleModal: () => void;
}

const ChargeBanana: React.FC<ChargeBananaProps> = ({ toggleModal }) => {
  const paymentModalRef = useRef<HTMLDivElement>(null);

  const [selectedButtonId, setSelectedButtonId] = useState<number | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleClick = (id: number) => {
    setSelectedButtonId(id); // 클릭된 버튼의 ID를 상태로 설정
  };
  const handlePaymentClick = () => setIsPaymentModalOpen(true);

  const bananas = [
    { id: 1, quantity: 10, price: 4_990 },
    { id: 2, quantity: 25, price: 9_990 },
    { id: 3, quantity: 50, price: 19_900 },
    { id: 4, quantity: 100, price: 39_900 },
  ];

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
      <div className={styles.modalContainer}>
        <div className={styles.modalCard}>
          <div className={styles.modalHeader}>
            <div className={styles.modalHeaderText}>버내너 충전하기</div>
            <img
              className={styles.close}
              src={Cancel}
              onClick={() => {
                toggleModal();
                setSelectedButtonId(null);
              }}
              width="24px"
              height="24px"
            ></img>
          </div>
          <div className={styles.hr}></div>
          <div className={styles.contentContainer}>
            <div className={styles.modalImg}>
              <img src={Banana} width="80px" height="80px" loading="lazy"></img>
            </div>
            <div className={styles.modalText}>
              버내너 갯수만큼<br></br>원하는 영상을 다운로드 할 수 있어요!
            </div>
            {bananas.map(banana => (
              <div
                key={banana.id}
                className={styles.bananaContainer}
                onClick={() => handleClick(banana.id)}
              >
                <div className={styles.numOfBanana}>
                  <div
                    className={`${styles.button} ${selectedButtonId === banana.id ? styles.clicked : ''}`}
                  >
                    <div
                      className={`${selectedButtonId === banana.id ? styles.clicked : ''}`}
                    ></div>
                  </div>
                  <div className={styles.banana}>버내너</div>
                  <div className={styles.bananaNum}>{banana.quantity}개</div>
                </div>
                <div className={styles.price}>
                  {banana.price.toLocaleString()}원
                </div>
              </div>
            ))}
            <div className={styles.alertTxt}>
              *위 상품의 최대 이용기간은 1년입니다.
            </div>
            <div
              className={`${styles.payment} ${selectedButtonId != null ? styles.clicked : ''}`}
              onClick={handlePaymentClick}
            >
              결제하기
            </div>
          </div>
        </div>
      </div>
      {isPaymentModalOpen && (
        <Payments
          payValue={selectedButtonId ? bananas[selectedButtonId - 1].price : 0}
          paymentModalClose={paymentModalClose}
          orderName={
            selectedButtonId
              ? `버내너 ${bananas[selectedButtonId - 1].quantity}개`
              : '버내너 0개'
          }
          type="BANANA"
          resource={`${selectedButtonId ? bananas[selectedButtonId - 1].quantity : 0}`}
        />
      )}
    </>
  );
};

export default ChargeBanana;
