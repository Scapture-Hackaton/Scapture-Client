import React from 'react';
import styles from '../scss/my-reservation.module.scss';
import backArrow from '../image/backArrow.png';

const MyReservation = () => {
  return (
    <div className={styles.test}>
      <div className={styles.myReserve}>
        <div className={styles.backBtn}>
          <img src={backArrow} alt=""></img>
          <p>예약 내역 확인하기</p>
        </div>

        <div className={styles.container}>
          <div className={styles.header}>나의 예약</div>

          <div className={styles.row}>
            <p>예약 날짜</p>
            <p>2024.08.03.토</p>
          </div>
          <div className={styles.row}>
            <p>구장 명</p>
            <p>A구장</p>
          </div>
          <div className={styles.row}>
            <p>사용 시간</p>
            <p>20:00 ~ 22:00</p>
          </div>
        </div>

        {/* <div className={styles.noData}>
          <p>아직 예약 내역이 없음</p>
        </div> */}
      </div>
    </div>
  );
};

export default MyReservation;
