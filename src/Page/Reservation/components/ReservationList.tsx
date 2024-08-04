import React from 'react';
import styles from '../scss/reservation.module.scss';
import { ReservationDto } from '../../../apis/dto/reservation.dto';

interface ReservationListProps {
  reserveList: ReservationDto[][];
}

const ReservationList: React.FC<ReservationListProps> = ({ reserveList }) => {
  const reserve = (scheduleId: number) => {
    console.log(scheduleId);
  };
  return (
    <>
      {Array.isArray(reserveList) && reserveList.length > 0 ? (
        reserveList.map((list: ReservationDto[], groupIndex: number) => (
          <div className={styles.group} key={groupIndex}>
            {list.map((item: ReservationDto) => (
              <div className={styles.compontent} key={item.scheduleId}>
                <div className={styles.info}>
                  <div className={styles.field}>{item.name}</div>
                  <div className={styles.versus}>{item.type}</div>
                </div>
                <div className={styles.date}>{item.hours}</div>
                {item.isReserved ? (
                  <div className={styles.booked}>예약마감</div>
                ) : (
                  <button
                    onClick={() => {
                      reserve(item.scheduleId);
                    }}
                  >
                    예약하기
                  </button>
                )}
              </div>
            ))}
          </div>
        ))
      ) : (
        <div>No reservations available</div>
      )}
    </>
  );
};

export default ReservationList;
