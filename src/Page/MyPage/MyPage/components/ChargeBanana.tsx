import React, { useState } from 'react';
import Cancel from '../image/cancel.svg';
import Banana from '../image/banana.svg';

import styles from '../scss/chargeBanana.module.scss';

interface ChargeBananaProps {
  toggleModal: () => void;
}

const ChargeBanana: React.FC<ChargeBananaProps> = ({ toggleModal }) => {
  const [selectedButtonId, setSelectedButtonId] = useState<number | null>(null);

  const handleClick = (id: number) => {
    setSelectedButtonId(id); // 클릭된 버튼의 ID를 상태로 설정
  };

  const bananas = [
    { id: 1, quantity: '10개', price: '4,990원' },
    { id: 2, quantity: '25개', price: '9,990원' },
    { id: 3, quantity: '50개', price: '19,990원' },
    { id: 4, quantity: '50개', price: '39,990원' },
  ];

  return (
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
                <div className={styles.bananaNum}>{banana.quantity}</div>
              </div>
              <div className={styles.price}>{banana.price}</div>
            </div>
          ))}
          <div
            className={`${styles.payment} ${selectedButtonId != null ? styles.clicked : ''}`}
          >
            결제하기
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChargeBanana;
