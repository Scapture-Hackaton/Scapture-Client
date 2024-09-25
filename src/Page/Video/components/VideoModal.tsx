import { forwardRef, Ref, useEffect, useState } from 'react';
// import { modalNotice } from '../functions/ModalFunction';

import cancelIcon from '../../../assets/Icon/Cancel.svg';

import { useQuery } from '@tanstack/react-query';
import { getBananaCnt } from '../../../apis/api/user.api';

interface ModalProps {
  styles: { [key: string]: string };
  ref: Ref<HTMLDialogElement>;
  handleDownloadClick: () => Promise<void>;
}
// interface ModalCheckProps extends ModalProps {
//   extendRef: React.RefObject<HTMLDialogElement>;
// }

export const VideoModal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ styles, handleDownloadClick }, ref) => {
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

    const { data: bananaCnt } = useQuery({
      queryKey: ['bananaCnt'],
      queryFn: () => getBananaCnt(),
    });

    const [isCnt, setCnt] = useState(0);

    useEffect(() => {
      if (bananaCnt && bananaCnt.data) {
        setCnt(bananaCnt.data.balance);
      }
    }, [bananaCnt]);

    return (
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
              <span>1개</span>의 버내너가 필요해요
            </div>
          </div>

          <div className={styles.group}>
            <div>
              보유한 버내너
              <span>{isCnt}개</span>
            </div>

            <button onClick={() => handleDownloadClick()}>사용하기</button>
          </div>
        </div>
      </dialog>
    );
  },
);
