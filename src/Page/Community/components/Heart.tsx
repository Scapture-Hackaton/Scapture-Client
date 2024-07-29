import React, { useState } from 'react';
import styles from '../scss/community.module.scss';

import fullHeart from '../image/fullHeart.png';
import emptyHeart from '../image/emptyHeart.png';

interface HeartProps {
  isLiked: boolean;
  likeCount: number;
}

const Heart: React.FC<HeartProps> = ({ isLiked, likeCount }) => {
  const [isHeart, setHeart] = useState<boolean>(isLiked);
  const [isCnt, setCnt] = useState<number>(likeCount);

  const toggleHeart = () => {
    // 좋아요가 눌러진 상태
    if (isHeart) {
      setCnt(isCnt - 1);
    } else {
      setCnt(isCnt + 1);
    }

    setHeart(!isHeart);
  };

  return (
    <>
      {isHeart ? (
        <img
          src={fullHeart}
          alt=""
          onClick={toggleHeart}
          className={styles.onHeart}
        />
      ) : (
        <img src={emptyHeart} alt="" onClick={toggleHeart} />
      )}
      <div className={styles.cnt}>{isCnt}</div>
    </>
  );
};

export default Heart;
