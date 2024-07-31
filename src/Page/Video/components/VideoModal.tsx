import { forwardRef } from 'react';
import { modalNotice } from '../functions/ModalFunction';
import banana from '../image/banana.png';
interface ModalProps {
  styles: { [key: string]: string };
  ref: React.RefObject<HTMLDialogElement>;
}

interface ModalCheckProps extends ModalProps {
  extendRef: React.RefObject<HTMLDialogElement>;
}

export const VideoModal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ styles }, ref) => {
    return (
      <dialog ref={ref}>
        <div className={styles.contents}>
          <div className={styles.video}></div>
          <div className={styles.group}>
            <div className={styles.banana}>
              <img src={banana} alt="" />
              <span>버내너 10개</span>
            </div>
            <button
              onClick={() =>
                (ref as React.RefObject<HTMLDialogElement>).current?.close()
              }
            >
              사용하기
            </button>
          </div>
        </div>
      </dialog>
    );
  },
);
