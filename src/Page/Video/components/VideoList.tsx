import React from 'react';
import styles from '../scss/video.module.scss';
import { useQuery } from '@tanstack/react-query';
import { getVideoScheduled } from '../../../apis/api/stadium.api';
import { ScheduleVideo } from '../../../apis/dto/scapture.dto';
import { useNavigate } from 'react-router-dom';

import noDataIcon from '../../../assets/Icon/noDataIcon.svg';

interface VideoListProps {
  scheduleId: number | undefined;
  stadiumId: number;
}

const VideoList: React.FC<VideoListProps> = ({ scheduleId, stadiumId }) => {
  // Fetch video data with react-query
  const { data: videos } = useQuery<ScheduleVideo[]>({
    queryKey: ['videoScheduled', scheduleId],
    queryFn: () => {
      if (scheduleId !== undefined) {
        return getVideoScheduled(scheduleId);
      }
      return Promise.resolve([]);
    },
    enabled: scheduleId !== null,
  });

  const navigate = useNavigate();

  const toVideo = (videoId: number) => {
    navigate(`/video/${stadiumId}/${videoId}`);
  };

  return (
    <div className={styles.videoList}>
      {videos && videos.length > 0 ? (
        videos.map((video: ScheduleVideo) => (
          <div
            className={styles.videoContainer}
            key={video.videoId}
            onClick={() => toVideo(video.videoId)}
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
                <div>{video.stadiumName}</div>
                <div>
                  {video.date} | {video.hours}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className={styles.noData}>
          <img
            src={noDataIcon}
            alt="검색 결과가 없습니다."
            width="141px"
            height="180px"
          />
          <div>검색 결과가 없어요</div>
        </div>
      )}
      {/* <div className={styles.videoContainer}>
        <div className={styles.video}>
          <img src={noDataIcon} alt="" width="410px" height="230" />
        </div>
        <div className={styles.description}>
          <div className={styles.title}>테스트</div>
          <div className={styles.subDes}>
            <div>LBFS 경기장</div>
            <div>2024.08.29(목) / 18:00-20:00</div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default VideoList;
