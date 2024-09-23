import React, { useState, useEffect } from 'react';
import styles from '../scss/community.module.scss';
import fullHeart from '../../../assets/Icon/pressedHeart.svg';
import emptyHeart from '../../../assets/Icon/heartIcon.svg';

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
      <li className={styles.heart} onClick={() => onToggleLike(isLiked)}>
        {isHeart ? (
          <img
            src={fullHeart}
            alt="liked"
            className={styles.onHeart}
            width="20px"
            height="20px"
          />
        ) : (
          <img src={emptyHeart} alt="not liked" width="20px" height="20px" />
        )}
        <p className={styles.cnt}>{isCnt}</p>
      </li>
    </>
  );
};

export default VideoHeart;
