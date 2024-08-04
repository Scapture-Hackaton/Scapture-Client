import React, { useState } from 'react';
import styles from '../scss/community.module.scss';
import fullHeart from '../image/fullHeart.png';
import emptyHeart from '../image/emptyHeart.png';
import {
  likesComment,
  unLikeComment,
  likesVideo,
  unLikeVideo,
} from '../../../apis/api/community.api';

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
  type,
  onToggleLike,
}) => {
  const [isHeart, setHeart] = useState<boolean>(isLiked);
  const [isCnt, setCnt] = useState<number>(likeCount);

  const toggleHeart = async () => {
    try {
      // 좋아요 상태 변경
      if (isHeart) {
        if (type === 'comment') {
          await unLikeComment(id);
        } else {
          await unLikeVideo(id);
        }
        setCnt(isCnt - 1);
        onToggleLike(id, false);
      } else {
        if (type === 'comment') {
          await likesComment(id);
        } else {
          await likesVideo(id);
        }
        setCnt(isCnt + 1);
        onToggleLike(id, true);
      }
      setHeart(!isHeart);
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
