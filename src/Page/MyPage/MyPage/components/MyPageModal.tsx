import React, { forwardRef, useState } from 'react';
import { bananaDataAtom, subscribedAtom } from '../../Atom/atom';
import cancel from '../image/cancel.svg';
import checkBanana from '../image/check-banana.svg';
import {
  postBanana,
  postSubscribe,
  // putSubscribe,  //추후 추가 예정
} from '../../../../apis/api/mypage.api';
import { useRecoilState, useSetRecoilState } from 'recoil';
// import { bananaData } from '../../dto/atom.interface';
interface ModalProps {
  styles: { [key: string]: string };
  ref: React.RefObject<HTMLDialogElement>;
}

// interface ModalCheckProps extends ModalProps {
//   extendRef: React.RefObject<HTMLDialogElement>;
// }
//Reservation 참조
const subscribeData = {
  startDate: '2024-07-22 00:00',
  endDate: '2024-08-22 00:00',
};
// const banana = 5;

// 버내너 API
export const BananaModal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ styles }, ref) => {
    // Recoil
    const setBanana = useSetRecoilState(bananaDataAtom);
    // useState
    const [isBananaState, setBananaState] = useState<number>(1);
    const banana = isBananaState;

    const Banana = async () => {
      const resBanana = await postBanana(banana);
      if (resBanana?.data.balance) {
        setBanana(prev => ({
          ...prev,
          balance: resBanana.data.balance,
        }));
      }
    };
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
                    onClick={() => {
                      setBananaState(1);
                      return console.log('1');
                    }}
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
                    onClick={() => {
                      setBananaState(5);
                      return console.log('5');
                    }}
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
                    onClick={() => {
                      setBananaState(10);
                      return console.log('10');
                    }}
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
            onClick={() => {
              (ref as React.RefObject<HTMLDialogElement>).current?.close();
              Banana();
            }}
          >
            결제하기
          </button>
        </div>
      </dialog>
    );
  },
);

// 구독 API
export const SubscribeModal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ styles }, ref) => {
    // Recoil
    const [isSubscribed, setSubscribed] = useRecoilState(subscribedAtom);

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
              onClick={() => {
                (ref as React.RefObject<HTMLDialogElement>).current?.close();
                // subscribe API
                postSubscribe(subscribeData);
                setSubscribed(prev => ({ ...prev, subscribed: true }));
                // console.log(isSubscribed);
              }}
            >
              구독하러 가기
            </button>
          </div>
        </div>
      </dialog>
    );
  },
);
