import React, { useState, useEffect } from 'react';
import styles from '../scss/community.module.scss';
import fullHeart from '../image/fullHeart.png';
import emptyHeart from '../image/emptyHeart.png';

interface HeartProps {
  videoId: number;
  isLiked: boolean;
  likeCount: number;
  onToggleLike: (isLiked: boolean) => void;
}

const VideoHeart: React.FC<HeartProps> = ({
  isLiked,
  likeCount,
  onToggleLike,
}) => {
  const [isHeart, setHeart] = useState<boolean>(isLiked);
  const [isCnt, setCnt] = useState<number>(likeCount);

  useEffect(() => {
    // Props가 변경될 때 상태를 업데이트
    setHeart(isLiked);
    setCnt(likeCount);
  }, [isLiked, likeCount]);

  return (
    <>
      {isHeart ? (
        <img
          src={fullHeart}
          alt="liked"
          onClick={() => onToggleLike(isLiked)}
          className={styles.onHeart}
        />
      ) : (
        <img
          src={emptyHeart}
          onClick={() => onToggleLike(isLiked)}
          alt="not liked"
        />
      )}
      <div className={styles.cnt}>{isCnt}</div>
    </>
  );
};

export default VideoHeart;
