import { forwardRef } from 'react';
import { modalNotice } from '../functions/ModalFunction';
interface ModalProps {
  styles: { [key: string]: string };
  ref: React.RefObject<HTMLDialogElement>;
}

interface ModalCheckProps extends ModalProps {
  extendRef: React.RefObject<HTMLDialogElement>;
}

export const ReservationModal = forwardRef<HTMLDialogElement, ModalCheckProps>(
  ({ styles, extendRef }, ref) => {
    return (
      <dialog ref={ref}>
        <div className={styles.contents}>
          <div className={styles.notice}>
            <span>구장명</span>
            <span>을 예약하시겠어요?</span>
          </div>
          <div className={styles.info}>
            <span>예약정보</span>
            <div className={styles.group}>
              <span>예약 날짜</span>
              <span>2024.08.03.토</span>
            </div>
            <div className={styles.group}>
              <span>구장명</span>
              <span>A구장</span>
            </div>
            <div className={styles.group}>
              <span>사용 시간</span>
              <span>20:00 ~ 22:00</span>
            </div>
            <div className={styles.group}>
              <span>금액</span>
              <span>120,000원</span>
            </div>
          </div>
          <button
            onClick={() => {
              (ref as React.RefObject<HTMLDialogElement>).current?.close();
              modalNotice(extendRef);
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
  ({ styles }, ref) => {
    return (
      <dialog ref={ref}>
        <div className={styles.contents}>
          <div className={styles.notice}>
            <span>구장명</span>
            <span>예약완료!</span>
          </div>
          <div className={styles.info}>
            <span>예약정보</span>
            <div className={styles.group}>
              <span>예약 날짜</span>
              <span>2024.08.03.토</span>
            </div>
            <div className={styles.group}>
              <span>구장명</span>
              <span>A구장</span>
            </div>
            <div className={styles.group}>
              <span>사용 시간</span>
              <span>20:00 ~ 22:00</span>
            </div>
            <div className={styles.group}>
              <span>금액</span>
              <span>120,000원</span>
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
