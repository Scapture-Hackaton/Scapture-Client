import React from 'react';
import styles from '../scss/community.module.scss';
import { PopularVideos } from '../../../apis/dto/community.dto';
// import { getPopularVideos } from '../../../apis/api/community.api';

interface PopularVideoListProps {
  videos: PopularVideos[];
  changeVideo: (id: number) => void;
}

const PopularVideoList: React.FC<PopularVideoListProps> = ({
  videos = [],
  changeVideo,
}) => {
  return (
    <div className={styles.videoList}>
      {videos.length >= 2
        ? videos.map((video: PopularVideos) => (
            <div
              className={styles.subVideoContainer}
              key={video.videoId}
              onClick={() => changeVideo(video.videoId)}
            >
              <div className={styles.video}>
                <img
                  src={video.image}
                  alt={video.name}
                  width="410px"
                  height="230px"
                />
              </div>
              <div className={styles.description}>
                <div className={styles.title}>{video.name}</div>
                <div className={styles.subDes}>
                  <div>
                    {video.stadiumName} | {video.fieldName}
                  </div>
                  <div>
                    조회수 {video.views}회 | {video.date}
                  </div>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default PopularVideoList;
