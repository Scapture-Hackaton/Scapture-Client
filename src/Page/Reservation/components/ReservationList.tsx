import React, { useRef, useState } from 'react';
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
import { reserveField } from '../../../apis/api/reservation.api';
import { useMutation } from '@tanstack/react-query';
import { ReservationCheckModal, ReservationModal } from './ReservationModal';
import modal from '../scss/reservation-modal.module.scss';
import check from '../scss/reservation-check-modal.module.scss';

interface ReservationListProps {
  reserveList: ReservationDto[][];
  queryClient: any;
  stadiumId: number;
  selectedFieldId: number | undefined;
  formattedDate: string;
}

const ReservationList: React.FC<ReservationListProps> = ({
  reserveList,
  queryClient,
  stadiumId,
  selectedFieldId,
  formattedDate,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const modalCheckRef = useRef<HTMLDialogElement>(null);

  const [selectedReservation, setSelectedReservation] =
    useState<ReservationDto | null>(null);

  const mutation = useMutation({
    mutationFn: async (scheduleId: number) => {
      const res = await reserveField(scheduleId);

      if (res.status == 400 || res.status == 403) {
        modalRef.current?.close();
        modalNotice(loginModalRef);
      } else {
        modalRef.current?.close();
        modalNotice(modalCheckRef);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        'reservations',
        stadiumId,
        selectedFieldId,
        formattedDate,
      ]);
    },
    onError: (error: any) => {
      if (error.status == 400 || error.status == 403) {
        modalNotice(loginModalRef);
      }
    },
  });

  const reserve = async (reservation: ReservationDto) => {
    setSelectedReservation(reservation);
    modalNotice(modalRef);
  };

  const loginModalRef = useRef<HTMLDialogElement>(null);
  //Object
  const AUTH_URLS = {
    kakao: KAKAO_AUTH_URL,
    google: GOOGLE_AUTH_URL,
    naver: NAVER_AUTH_URL,
  };

  const handleReserveConfirm = (scheduleId: number) => {
    mutation.mutate(scheduleId);
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
                      reserve(item);
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
      {/* modalRef */}
      <ReservationModal
        styles={modal}
        ref={modalRef}
        reservation={selectedReservation}
        onConfirm={handleReserveConfirm}
      />
      {/* modalCheckRef */}
      <ReservationCheckModal
        styles={check}
        ref={modalCheckRef}
        reservation={selectedReservation}
      />
    </>
  );
};

export default ReservationList;
