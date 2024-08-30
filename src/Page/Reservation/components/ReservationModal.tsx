import { forwardRef } from 'react';
import { ReservationDto } from '../../../apis/dto/reservation.dto';

import cancelIcon from '../../../assets/Icon/Cancel.svg';
import dateIcon from '../image/dateIcon.svg';
import stadiumIcon from '../image/stadiumIcon.svg';
import clockIcon from '../../../assets/Icon/Clock.svg';
import peopleIcon from '../image/peopleIcon.svg';

import successReserveIcon from '../image/successReserveIcon.svg';

interface ModalProps extends ModalCheckProps {
  onSuccess: () => void;
  onConfirm: (scheduleId: number) => void;
}

interface ModalCheckProps {
  styles: { [key: string]: string };
  ref: React.RefObject<HTMLDialogElement>;
  reservation?: ReservationDto | null;
}

export const ReservationModal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ styles, reservation, onSuccess, onConfirm }, ref) => {
    const closeModal = () => {
      // ref가 MutableRefObject이면 current 속성에 접근하고, 함수 형태이면 호출하여 사용
      if (ref && typeof ref !== 'function' && ref.current) {
        ref.current.close();
      } else if (typeof ref === 'function') {
        ref(null); // 함수 형태의 ref는 ref(instance)를 통해 처리
      }
    };

    const handleDialogClick = (event: React.MouseEvent<HTMLDialogElement>) => {
      const dialog = ref && typeof ref !== 'function' ? ref.current : null;
      if (dialog && event.target === dialog) {
        closeModal();
      }
    };

    return (
      <dialog
        ref={ref}
        id={styles.reservationModal}
        onClick={handleDialogClick}
      >
        <div className={styles.header}>
          <div></div>
          <p>예약하기</p>
          <img
            src={cancelIcon}
            alt=""
            width="24px"
            height="24px"
            loading="lazy"
            onClick={() => {
              closeModal();
            }}
          ></img>
        </div>
        <div className={styles.contents}>
          <div className={styles.notice}>다음 조건으로 예약하시겠어요?</div>
          <ul className={styles.info}>
            <li className={styles.line}>
              <img
                src={dateIcon}
                alt=""
                width="20px"
                height="20px"
                loading="lazy"
              />
              {/* <div>{reservation?.date}</div> */}
              <div>0000.00.00</div>
            </li>
            <li className={styles.line}>
              <img
                src={stadiumIcon}
                alt=""
                width="20px"
                height="20px"
                loading="lazy"
              />
              {/* <div>{reservation?.name}</div> */}
              <div>구장명 입니다.</div>
            </li>
            <li className={styles.line}>
              <img
                src={clockIcon}
                alt=""
                width="20px"
                height="20px"
                loading="lazy"
              />
              {/* <div>{reservation?.hours}</div> */}
              <div>00:00 ~ 00:00</div>
            </li>
            <li className={styles.line}>
              <img
                src={peopleIcon}
                alt=""
                width="20px"
                height="20px"
                loading="lazy"
              />
              {/* <div>{reservation?.hours}</div> */}
              <div>00 vs 00</div>
            </li>
          </ul>
        </div>
        <div className={styles.footer}>
          <div className={styles.priceInfo}>
            <div id={styles.text}>총 금액</div>
            {/* <div>{reservation?.price.toLocaleString()}원</div> */}
            <div id={styles.price}>000,000</div>
          </div>
          <button
            onClick={() => {
              // if (reservation) {
              //   onConfirm(reservation.scheduleId);
              // }
              closeModal();
              onSuccess();
              if (reservation) {
                onConfirm(reservation.scheduleId);
              }

              console.log('test');
            }}
          >
            예약하기
          </button>
        </div>
      </dialog>
    );
  },
);

export const ReservationCheckModal = forwardRef<
  HTMLDialogElement,
  ModalCheckProps
>(({ styles, reservation }, ref) => {
  const closeModal = () => {
    // ref가 MutableRefObject이면 current 속성에 접근하고, 함수 형태이면 호출하여 사용
    if (ref && typeof ref !== 'function' && ref.current) {
      ref.current.close();
    } else if (typeof ref === 'function') {
      ref(null); // 함수 형태의 ref는 ref(instance)를 통해 처리
    }
  };

  const handleDialogClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = ref && typeof ref !== 'function' ? ref.current : null;
    if (dialog && event.target === dialog) {
      closeModal();
    }
  };

  return (
    <dialog
      ref={ref}
      id={styles.reservationCheckModal}
      onClick={handleDialogClick}
    >
      <div className={styles.header}>
        <div></div>
        <p>예약완료</p>
        <img
          src={cancelIcon}
          alt=""
          width="24px"
          height="24px"
          loading="lazy"
          onClick={() => {
            closeModal();
          }}
        ></img>
      </div>
      <div className={styles.contents}>
        <div id={styles.icon}>
          <img
            src={successReserveIcon}
            alt=""
            width="80px"
            height="80px"
            loading="lazy"
          />
        </div>
        <div className={styles.notice}>예약이 완료되었습니다!</div>
        <ul className={styles.info}>
          <li className={styles.line}>
            <img
              src={dateIcon}
              alt=""
              width="20px"
              height="20px"
              loading="lazy"
            />
            {/* <div>{reservation?.date}</div> */}
            <div>0000.00.00</div>
          </li>
          <li className={styles.line}>
            <img
              src={stadiumIcon}
              alt=""
              width="20px"
              height="20px"
              loading="lazy"
            />
            {/* <div>{reservation?.name}</div> */}
            <div>구장명 입니다.</div>
          </li>
          <li className={styles.line}>
            <img
              src={clockIcon}
              alt=""
              width="20px"
              height="20px"
              loading="lazy"
            />
            {/* <div>{reservation?.hours}</div> */}
            <div>00:00 ~ 00:00</div>
          </li>
          <li className={styles.line}>
            <img
              src={peopleIcon}
              alt=""
              width="20px"
              height="20px"
              loading="lazy"
            />
            {/* <div>{reservation?.hours}</div> */}
            <div>00 vs 00</div>
          </li>
        </ul>
      </div>
      <div className={styles.footer}>
        <div className={styles.priceInfo}>
          <div id={styles.text}>결제한 금액</div>
          {/* <div>{reservation?.price.toLocaleString()}원</div> */}
          <div id={styles.price}>000,000원</div>
        </div>
      </div>
    </dialog>
  );
});
