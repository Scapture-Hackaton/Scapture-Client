import React, { useState, useEffect, useRef } from 'react';
import styles from '../scss/community.module.scss';
import fullHeart from '../../../assets/Icon/heartIcon.svg';
import emptyHeart from '../../../assets/Icon/heartIcon.svg';
import { likesComment, unLikeComment } from '../../../apis/api/community.api';
import { LoginModal } from '../../Header/components/LoginModal';

import modal from '../../Header/scss/login-modal.module.scss';

import {
  KAKAO_AUTH_URL,
  GOOGLE_AUTH_URL,
  NAVER_AUTH_URL,
} from '../../../apis/config/login.config';

interface HeartProps {
  id: number;
  isLiked: boolean;
  likeCount: number;
  type: 'comment' | 'video';
  onToggleLike: (id: number, isLiked: boolean) => void;
}

const Heart: React.FC<HeartProps> = ({
  id,
  isLiked,
  likeCount,
  onToggleLike,
}) => {
  //DOM
  const modalRef = useRef<HTMLDialogElement>(null);

  //Object
  const AUTH_URLS = {
    kakao: KAKAO_AUTH_URL,
    google: GOOGLE_AUTH_URL,
    naver: NAVER_AUTH_URL,
  };

  const [isHeart, setHeart] = useState<boolean>(isLiked);
  const [isCnt, setCnt] = useState<number>(likeCount);

  useEffect(() => {
    // Props가 변경될 때 상태를 업데이트
    setHeart(isLiked);
    setCnt(likeCount);
  }, [isLiked, likeCount]);

  const toggleHeart = async () => {
    try {
      // 좋아요 상태 변경
      if (isHeart) {
        const res = await unLikeComment(id);
        if (res.status == 400 || res.status == 403) {
          modalRef.current?.showModal();
        } else {
          onToggleLike(id, false);
        }
      } else {
        const res = await likesComment(id);
        if (res.status == 400 || res.status == 403) {
          modalRef.current?.showModal();
        } else {
          onToggleLike(id, true);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className={styles.heartGroup} onClick={toggleHeart}>
        {isHeart ? (
          <img
            src={fullHeart}
            alt="liked"
            className={styles.onHeart}
            width="16px"
            height="16px"
            loading="lazy"
          />
        ) : (
          <img
            src={emptyHeart}
            alt="not liked"
            width="16px"
            height="16px"
            loading="lazy"
          />
        )}

        <div className={styles.cnt}>{isCnt}</div>
      </div>
      <LoginModal
        styles={modal}
        AUTH_URLS={AUTH_URLS}
        modalRef={modalRef}
      ></LoginModal>
    </>
  );
};

export default Heart;
