import { useEffect, useState } from 'react';
import styles from '../scss/my-reservation.module.scss';
import backArrow from '../image/backArrow.png';
import { getReservation } from '../../../../apis/api/mypage.api';
import { Link } from 'react-router-dom';
import { reservationData } from '../../dto/atom.interface';

const MyReservation = () => {
  //어떻게 나눌지 고민...
  const reservationObject = {
    data: '',
    date: '',
    name: '',
    hours: '',
    message: '',
  };
  const [isReservationState, setReservationState] =
    useState<reservationData>(reservationObject);

  useEffect(() => {
    const fetchReservationInfo = async () => {
      const res = await getReservation();
      console.log(res?.message);
      if (res?.data) {
        setReservationState(prev => ({
          ...prev,
          data: res.data,
          date: res.data.date,
          name: res.data.name,
          hours: res.data.hours,
          message: res.message,
        }));
      }
    };
    fetchReservationInfo();
  });
  return (
    <div className={styles.test}>
      <div className={styles.myReserve}>
        <div className={styles.backBtn}>
          <img src={backArrow} alt=""></img>
          <p>
            <Link
              className={styles.reservation}
              style={{ textDecoration: 'none' }}
              to="/mypage"
            >
              예약 내역 확인하기
            </Link>
          </p>
        </div>
        {isReservationState.data ? (
          <div className={styles.container}>
            <div className={styles.header}>나의 예약</div>

            <div className={styles.row}>
              <p>예약 날짜</p>
              <p>2024.08.03.토/{isReservationState.date}</p>
            </div>
            <div className={styles.row}>
              <p>구장 명</p>
              <p>A구장/{isReservationState.name}</p>
            </div>
            <div className={styles.row}>
              <p>사용 시간</p>
              <p>20:00 ~ 22:00/{isReservationState.hours}</p>
            </div>
          </div>
        ) : (
          <div className={styles.noData}>
            <p>아직 예약 내역이 없음</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReservation;
