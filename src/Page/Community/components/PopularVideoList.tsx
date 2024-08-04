import React from 'react';
import styles from '../scss/community.module.scss';
import { PopularVideos } from '../../../apis/dto/community.dto';
// import { getPopularVideos } from '../../../apis/api/community.api';

interface PopularVideoListProps {
  videos: [PopularVideos];
}

const PopularVideoList: React.FC<PopularVideoListProps> = ({ videos = [] }) => {
  return (
    <>
      {videos.length >= 2
        ? (videos ?? []).map((video: PopularVideos) => (
            <div className={styles.subVideoContainer} key={video.videoId}>
              <div className={styles.video}>
                <img src={video.image} alt="" />
              </div>
              <div className={styles.group}>
                <div className={styles.title}>{video.name}</div>
                <div className={styles.info}>
                  <div className={styles.cnt}>조회수 {video.views}회</div>
                  <p>{video.date}</p>
                </div>

                <div className={styles.field}>
                  <div className={styles.profileImg}>
                    <img src="" alt=""></img>
                  </div>
                  <div className={styles.name}>{video.stadiumName}</div>
                </div>
              </div>
            </div>
          ))
        : null}
    </>
  );
};

export default PopularVideoList;
