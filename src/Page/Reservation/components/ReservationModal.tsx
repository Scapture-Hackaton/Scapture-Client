import { forwardRef } from 'react';
import { ReservationDto } from '../../../apis/dto/reservation.dto';
interface ModalProps {
  styles: { [key: string]: string };
  ref: React.RefObject<HTMLDialogElement>;
  reservation?: ReservationDto | null;
}

interface ModalCheckProps extends ModalProps {
  reservation?: ReservationDto | null;
  onConfirm: (scheduleId: number) => void;
}

export const ReservationModal = forwardRef<HTMLDialogElement, ModalCheckProps>(
  ({ styles, reservation, onConfirm }, ref) => {
    return (
      <dialog ref={ref} id={styles.reservationModal}>
        <div className={styles.contents}>
          <div className={styles.notice}>
            <span>구장명</span>
            <span>을 예약하시겠어요?</span>
          </div>
          <div className={styles.info}>
            <span>예약정보</span>
            <div className={styles.group}>
              <span>예약 날짜</span>
              <span>{reservation?.date}</span>
            </div>
            <div className={styles.group}>
              <span>구장명</span>
              <span>{reservation?.name}</span>
            </div>
            <div className={styles.group}>
              <span>사용 시간</span>
              <span>{reservation?.hours}</span>
            </div>
            <div className={styles.group}>
              <span>금액</span>
              <span>{reservation?.price.toLocaleString()}원</span>
            </div>
          </div>
          <button
            onClick={() => {
              if (reservation) {
                onConfirm(reservation.scheduleId);
              }
            }}
          >
            예약하기
          </button>
        </div>
      </dialog>
    );
  },
);

export const ReservationCheckModal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ styles, reservation }, ref) => {
    return (
      <dialog ref={ref} id={styles.reservationCheckModal}>
        <div className={styles.contents}>
          <div className={styles.notice}>
            <span>구장명</span>
            <span>예약완료!</span>
          </div>
          <div className={styles.info}>
            <span>예약정보</span>
            <div className={styles.group}>
              <span>예약 날짜</span>
              <span>{reservation?.date}</span>
            </div>
            <div className={styles.group}>
              <span>구장명</span>
              <span>{reservation?.name}</span>
            </div>
            <div className={styles.group}>
              <span>사용 시간</span>
              <span>{reservation?.hours}</span>
            </div>
            <div className={styles.group}>
              <span>금액</span>
              <span>{reservation?.price.toLocaleString()}원</span>
            </div>
          </div>
          <button
            onClick={() =>
              (ref as React.RefObject<HTMLDialogElement>).current?.close()
            }
          >
            예약확인
          </button>
        </div>
      </dialog>
    );
  },
);
