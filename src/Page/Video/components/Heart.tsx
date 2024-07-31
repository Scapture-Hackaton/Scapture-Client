import React, { useState } from 'react';
import styles from '../scss/video.module.scss';
import fullHeart from '../image/fullHeart.png';
import emptyHeart from '../image/emptyHeart.png';
import { likesVideo, unLikeVideo } from '../../../apis/api/stadium.api';
// import { likesVideo, unLikeVideo } from '../../../apis/api/community.api';

interface HeartProps {
  id: number;
  isLiked: boolean;
  likeCount: number;
  //   onToggleLike: (id: number, isLiked: boolean) => void;
}

const Heart: React.FC<HeartProps> = ({ id, isLiked, likeCount }) => {
  const [isHeart, setHeart] = useState<boolean>(isLiked);
  const [isCnt, setCnt] = useState<number>(likeCount);

  const toggleHeart = async () => {
    try {
      // 좋아요 상태 변경
      if (isHeart) {
        const res = await unLikeVideo(id);
        console.log(res);

        if (res.status != 404) {
          setCnt(isCnt - 1);
          setHeart(!isHeart);
        }

        // onToggleLike(id, false);
      } else {
        const res = await likesVideo(id);
        if (res.status != 404) {
          setCnt(isCnt + 1);
          setHeart(!isHeart);
        }

        // onToggleLike(id, true);
      }
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
