import React, { useState } from 'react';
import styles from '../scss/community.module.scss';
import fullHeart from '../image/fullHeart.png';
import emptyHeart from '../image/emptyHeart.png';
import { likesComment, unLikeComment } from '../../../apis/api/community.api';

interface HeartProps {
  commentId: number;
  isLiked: boolean;
  likeCount: number;
  onToggleLike: (commentId: number, isLiked: boolean) => void;
}

const Heart: React.FC<HeartProps> = ({
  commentId,
  isLiked,
  likeCount,
  onToggleLike,
}) => {
  const [isHeart, setHeart] = useState<boolean>(isLiked);
  const [isCnt, setCnt] = useState<number>(likeCount);

  const toggleHeart = async () => {
    try {
      // 좋아요 상태 변경
      if (isHeart) {
        await unLikeComment(commentId);
        setCnt(isCnt - 1);
        setHeart(false);
        onToggleLike(commentId, false);
      } else {
        await likesComment(commentId);
        setCnt(isCnt + 1);
        setHeart(true);
        onToggleLike(commentId, true);
      }
      setHeart(!isHeart);
      // 부모 컴포넌트에 좋아요 상태 변경 알림
      onToggleLike(commentId, !isHeart);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {isHeart ? (
        <img
          src={fullHeart}
          alt="liked"
          onClick={toggleHeart}
          className={styles.onHeart}
        />
      ) : (
        <img src={emptyHeart} alt="not liked" onClick={toggleHeart} />
      )}
      <div className={styles.cnt}>{isCnt}</div>
    </>
  );
};

export default Heart;
