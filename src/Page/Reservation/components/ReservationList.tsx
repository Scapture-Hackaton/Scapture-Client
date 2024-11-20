import React, { useRef, useState } from 'react';
import styles from '../scss/reservation.module.scss';
import { ReservationDto } from '../../../apis/dto/reservation.dto';
import { LoginModal } from '../../Header/components/LoginModal';

import { modalNotice } from '../functions/ModalFunction';
import { reserveField } from '../../../apis/api/reservation.api';
import { useMutation } from '@tanstack/react-query';
import { ReservationCheckModal, ReservationModal } from './ReservationModal';
import modal from '../scss/reservation-modal.module.scss';
import check from '../scss/reservation-check-modal.module.scss';

import noDataIcon from '../../../assets/Icon/noDataIcon.svg';

interface ReservationListProps {
  reserveList: ReservationDto[];
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

  // const successReserve = () => {
  //   modalNotice(modalCheckRef);
  // };

  const handleReserveConfirm = (scheduleId: number) => {
    mutation.mutate(scheduleId);
  };
  return (
    <>
      <div className={styles.group}>
        {Array.isArray(reserveList) && reserveList.length > 0 ? (
          reserveList.map((list: ReservationDto) => (
            <div className={styles.compontent} key={list.scheduleId}>
              <div className={styles.title}>
                <div className={styles.field}>{list.name}</div>
              </div>
              <div className={styles.info}>
                <div>{list.hours}</div>
                <div>{list.type}</div>
              </div>
              {list.isReserved ? (
                <div className={styles.booked}>예약마감</div>
              ) : (
                <button
                  onClick={() => {
                    reserve(list);
                  }}
                >
                  예약하기
                </button>
              )}
            </div>
          ))
        ) : (
          <div className={styles.noData}>
            <img
              src={noDataIcon}
              alt="검색 결과가 없습니다."
              width="180px"
              height="180px"
            />
            <div>검색 결과가 없어요</div>
          </div>
        )}

        {/* <div className={styles.group}>
        <div className={styles.compontent}>
          <div className={styles.field}>A구장장장장장장</div>

          <div className={styles.info}>
            <div className={styles.date}>10:00 ~ 12:00</div>
            <div className={styles.versus}>6 vs 6</div>

            <button
              onClick={() => {
                modalNotice(modalRef);
              }}
            >
              예약하기
            </button>
          </div>
        </div>

        <div className={styles.compontent}>
          <div className={styles.field}>A구장</div>

          <div className={styles.info}>
            <div className={styles.date}>10:00 ~ 12:00</div>
            <div className={styles.versus}>6 vs 6</div>

            <button className={styles.booked} disabled>
              예약하기
            </button>
          </div>
        </div>
      </div> */}

        <LoginModal modalRef={loginModalRef}></LoginModal>
        {/* modalRef */}
        <ReservationModal
          styles={modal}
          ref={modalRef}
          reservation={selectedReservation}
          // onSuccess={successReserve}
          onConfirm={handleReserveConfirm}
        />
        {/* modalCheckRef */}
        <ReservationCheckModal
          styles={check}
          ref={modalCheckRef}
          reservation={selectedReservation}
        />
      </div>
    </>
  );
};

export default ReservationList;
