import { useEffect, useState } from 'react';
import styles from '../scss/my-reservation.module.scss';
import backArrow from '../image/backArrow.png';
import { getReservation } from '../../../../apis/api/mypage.api';
import { Link } from 'react-router-dom';
import { reservationData } from '../../dto/atom.interface';

const MyReservation = () => {
  //어떻게 나눌지 고민...
  const reservationObject = [
    {
      data: '',
      date: '',
      name: '',
      hours: '',
      message: '',
    },
  ];
  const [isReservationState, setReservationState] =
    useState<reservationData>(reservationObject);
  useEffect(() => {
    const fetchReservationInfo = async () => {
      const res = await getReservation();
      console.log(res?.message);
      console.log(res?.data[0]);
      if (res?.data[0]) {
        setReservationState(res.data);
      }
    };
    console.log(isReservationState);
    fetchReservationInfo();
  }, [setReservationState]);

  return (
    <div className={styles.test}>
      <div className={styles.myReserve}>
        <div className={styles.backBtn}>
          <Link
            className={styles.reservation}
            style={{ textDecoration: 'none' }}
            to="/mypage"
          >
            <div>
              <img src={backArrow} alt=""></img>
              <p>예약 내역 확인하기</p>
            </div>
          </Link>
        </div>
        {isReservationState.length > 0 ? (
          isReservationState.map((element, index) => (
            <div className={styles.container} key={index}>
              <div className={styles.header}>나의 예약</div>

              <div className={styles.row}>
                <p>예약 날짜</p>
                <p>{element.date}</p>
              </div>
              <div className={styles.row}>
                <p>구장 명</p>
                <p>{element.name}</p>
              </div>
              <div className={styles.row}>
                <p>사용 시간</p>
                <p>{element.hours}</p>
              </div>
            </div>
          ))
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
