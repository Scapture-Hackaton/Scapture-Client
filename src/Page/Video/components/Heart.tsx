import React, { useEffect, useState } from 'react';
import styles from '../scss/video.module.scss';
import fullHeart from '../image/fullHeart.png';
import emptyHeart from '../image/emptyHeart.png';
// import { likesVideo, unLikeVideo } from '../../../apis/api/stadium.api';
// import { likesVideo, unLikeVideo } from '../../../apis/api/community.api';

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

export default Heart;
