import React, { useEffect, useState } from 'react';
import styles from '../scss/video.module.scss';
import fullHeart from '../image/fullHeart.png';
import emptyHeart from '../../../assets/Icon/heartIcon.svg';

interface HeartProps {
  id: number;
  isLiked: boolean;
  likeCount: number;
  onToggleLike: (isLiked: boolean) => void;
}

const Heart: React.FC<HeartProps> = ({ isLiked, likeCount, onToggleLike }) => {
  const [isHeart, setHeart] = useState<boolean>(isLiked);
  const [isCnt, setCnt] = useState<number>(likeCount);

  useEffect(() => {
    setHeart(isLiked);
    setCnt(likeCount);
  }, [isLiked, isCnt]);

  return (
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
  );
};

export default Heart;
