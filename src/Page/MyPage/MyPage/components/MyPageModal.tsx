import React, { forwardRef } from 'react';
import { modalNotice } from '../functions/ModalFunction';
import cancel from '../image/cancel.png';
import checkbox from '../image/checkbox.png';
import checkBanana from '../image/check-banana.png';
interface ModalProps {
  styles: { [key: string]: string };
  ref: React.RefObject<HTMLDialogElement>;
}

interface ModalCheckProps extends ModalProps {
  extendRef: React.RefObject<HTMLDialogElement>;
}

export const BananaModal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ styles }, ref) => {
    return (
      <dialog ref={ref}>
        <div className={styles.contents}>
          <button
            onClick={() => {
              (ref as React.RefObject<HTMLDialogElement>).current?.close();
            }}
          >
            <img src={cancel} alt="" />
          </button>
          <div className={styles.container}>
            <div className={styles.group}>
              <div className={styles.select}>
                <label htmlFor="check-a">
                  <input
                    type="radio"
                    id="check-a"
                    name="banana-options"
                  ></input>
                </label>
                <img src={checkBanana} alt="버내너" />
                <span>버내너 1개</span>
              </div>
              <span>₩ 2,990</span>
            </div>
            <div className={styles.group}>
              <div className={styles.select}>
                <label htmlFor="check-b">
                  <input
                    type="radio"
                    id="check-b"
                    name="banana-options"
                  ></input>
                </label>
                <img src={checkBanana} alt="버내너" />
                <span>버내너 5개</span>
              </div>
              <span>₩ 9,990</span>
            </div>
            <div className={styles.group}>
              <div className={styles.select}>
                <label htmlFor="check-c">
                  <input
                    type="radio"
                    id="check-c"
                    name="banana-options"
                  ></input>
                </label>
                <img src={checkBanana} alt="버내너" />
                <span>버내너 10개</span>
              </div>
              <span>₩ 19,990</span>
            </div>
          </div>
          <button
            id={styles.checkBoxButton}
            onClick={() =>
              (ref as React.RefObject<HTMLDialogElement>).current?.close()
            }
          >
            결제하기
          </button>
        </div>
      </dialog>
    );
  },
);

export const SubscribeModal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ styles }, ref) => {
    return (
      <dialog ref={ref} id={styles.subModal}>
        <div className={styles.contents}>
          <button
            onClick={() => {
              (ref as React.RefObject<HTMLDialogElement>).current?.close();
            }}
          >
            <img src={cancel} alt="" />
          </button>
          <div id={styles.group}></div>
          <div className={styles.container}>
            <button
              id={styles.checkBoxButton}
              onClick={() =>
                (ref as React.RefObject<HTMLDialogElement>).current?.close()
              }
            >
              구독하러 가기
            </button>
          </div>
        </div>
      </dialog>
    );
  },
);
