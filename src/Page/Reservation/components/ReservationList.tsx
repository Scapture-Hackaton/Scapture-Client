import React, { useRef } from 'react';
import styles from '../scss/reservation.module.scss';
import loginModal from '../../Header/scss/login-modal.module.scss';
import { ReservationDto } from '../../../apis/dto/reservation.dto';
import { LoginModal } from '../../Header/components/LoginModal';
import {
  GOOGLE_AUTH_URL,
  KAKAO_AUTH_URL,
  NAVER_AUTH_URL,
} from '../../../apis/config/login.config';
import { modalNotice } from '../functions/ModalFunction';

interface ReservationListProps {
  reserveList: ReservationDto[][];
}

const ReservationList: React.FC<ReservationListProps> = ({ reserveList }) => {
  const reserve = (scheduleId: number) => {
    console.log(scheduleId);
  };

  const loginModalRef = useRef<HTMLDialogElement>(null);
  //Object
  const AUTH_URLS = {
    kakao: KAKAO_AUTH_URL,
    google: GOOGLE_AUTH_URL,
    naver: NAVER_AUTH_URL,
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
                      modalNotice(loginModalRef);
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
      <LoginModal
        styles={loginModal}
        AUTH_URLS={AUTH_URLS}
        modalRef={loginModalRef}
      ></LoginModal>
    </>
  );
};

export default ReservationList;
