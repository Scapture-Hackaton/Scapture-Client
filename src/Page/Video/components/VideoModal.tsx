import { forwardRef, Ref, useEffect, useState } from 'react';
// import { modalNotice } from '../functions/ModalFunction';

import cancelIcon from '../../../assets/Icon/Cancel.svg';

import styles from '../scss/video-modal.module.scss';

import { useQuery } from '@tanstack/react-query';
import { getBananaCnt } from '../../../apis/api/user.api';
// import Payments from '../../../common/component/Payment/Payments';
import { loginData, loginDataAtom } from '../../Header/Atom/atom';
import { useRecoilValue } from 'recoil';
import ChargeBanana from '../../MyPage/MyPage/components/ChargeBanana';

interface ModalProps {
  ref: Ref<HTMLDialogElement>;
  handleDownloadClick: (banana: number) => Promise<void>;
  videoDetail: any | null;
  type: string;
}
// interface ModalCheckProps extends ModalProps {
//   extendRef: React.RefObject<HTMLDialogElement>;
// }

export const VideoModal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ type, handleDownloadClick, videoDetail }, ref) => {
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

    const isLoginState = useRecoilValue<loginData>(loginDataAtom);

    const { data: bananaCnt, refetch: refetchBananaCnt } = useQuery({
      queryKey: ['bananaCnt'],
      queryFn: () => getBananaCnt(),
    });

    useEffect(() => {
      const refetchBanana = async () => {
        await refetchBananaCnt();
      };

      if (isLoginState.state) {
        refetchBanana();
      }
    }, [videoDetail]);

    const [isCnt, setCnt] = useState(0);

    useEffect(() => {
      if (bananaCnt && bananaCnt.data) {
        setCnt(bananaCnt.data.balance);
      }
    }, [bananaCnt]);

    // const paymentModalRef = useRef<HTMLDivElement>(null);

    // const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    // const handlePaymentStart = () => {
    //   setIsPaymentModalOpen(true);
    // };

    // const paymentModalClose = () => {
    //   setIsPaymentModalOpen(false);
    // };

    // 화면 밖 클릭 시 모달 닫기
    // useEffect(() => {
    //   const handleOutsideClick = (event: MouseEvent) => {
    //     if (
    //       paymentModalRef.current &&
    //       !paymentModalRef.current.contains(event.target as Node)
    //     ) {
    //       setIsPaymentModalOpen(false);
    //     }
    //   };

    //   document.addEventListener('mousedown', handleOutsideClick);
    //   return () => {
    //     document.removeEventListener('mousedown', handleOutsideClick);
    //   };
    // }, []);

    // 버내너 충전 모달 관련
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
      setIsOpen(!isOpen);
    };

    return (
      <>
        {type === 'highlight' ? (
          <dialog ref={ref} id={styles.videoModal} onClick={handleDialogClick}>
            <div className={styles.header}>
              <div></div>
              <p>영상 다운로드</p>
              <img
                src={cancelIcon}
                alt=""
                width="24px"
                height="24px"
                onClick={closeModal}
              ></img>
            </div>
            <div className={styles.contents}>
              <div className={styles.video}></div>
              <div className={styles.text}>
                <div>영상을 다운로드 하기 위해서는</div>
                <div>
                  {videoDetail && videoDetail?.price ? (
                    <span>
                      {videoDetail.price.basic - videoDetail.price.discount}개
                    </span>
                  ) : (
                    <span>3개</span>
                  )}
                  의 버내너가 필요해요
                </div>
              </div>

              <div className={styles.group}>
                <div>
                  보유한 버내너
                  <span>{isCnt}개</span>
                </div>

                {videoDetail &&
                videoDetail?.price &&
                isCnt >=
                  videoDetail.price.basic - videoDetail.price.discount ? (
                  <button
                    onClick={() =>
                      handleDownloadClick(
                        videoDetail.price.basic - videoDetail.price.discount,
                      )
                    }
                  >
                    사용하기
                  </button>
                ) : (
                  <button
                    // onClick={() => {
                    //   if (ref && typeof ref !== 'function' && ref.current) {
                    //     ref.current.close();
                    //   }
                    //   // handlePaymentStart();
                    // }}
                    onClick={() => {
                      if (ref && typeof ref !== 'function' && ref.current) {
                        ref.current.close();
                      }
                      toggleModal();
                    }}
                  >
                    충전하기
                  </button>
                )}
              </div>
            </div>
          </dialog>
        ) : (
          <dialog ref={ref} id={styles.videoModal} onClick={handleDialogClick}>
            <div className={styles.header}>
              <div></div>
              <p>영상 다운로드</p>
              <img
                src={cancelIcon}
                alt=""
                width="24px"
                height="24px"
                onClick={closeModal}
              ></img>
            </div>
            <div className={styles.contents}>
              <div className={styles.video}></div>
              <div className={styles.text}>
                <div>영상을 다운로드 하기 위해서는</div>
                <div>
                  <span>25</span>개 의 버내너가 필요해요
                </div>
              </div>

              <div className={styles.group}>
                <div>
                  보유한 버내너
                  <span>{isCnt}개</span>
                </div>

                {isCnt >= 25 ? (
                  <button onClick={() => handleDownloadClick(25)}>
                    사용하기
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (ref && typeof ref !== 'function' && ref.current) {
                        ref.current.close();
                      }
                      toggleModal();
                    }}
                  >
                    충전하기
                  </button>
                )}
              </div>
            </div>
          </dialog>
        )}

        {/* 버내너 충전 모달 */}
        {isOpen && <ChargeBanana toggleModal={toggleModal}></ChargeBanana>}
        {/* {isPaymentModalOpen && (
          <Payments
            payValue={3_500}
            paymentModalClose={paymentModalClose}
            orderName="하이라이트 영상 1개"
            type="HIGHLIGHT"
            resource="0"
          />
        )} */}
      </>
    );
  },
);
