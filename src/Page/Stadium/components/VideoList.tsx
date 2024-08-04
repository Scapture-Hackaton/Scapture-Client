import React from 'react';
import styles from '../scss/video.module.scss';
import { useQuery } from '@tanstack/react-query';
import { getVideoScheduled } from '../../../apis/api/stadium.api';
import { ScheduleVideo } from '../../../apis/dto/scapture.dto';
import { useNavigate } from 'react-router-dom';

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
    navigate('/video', { state: { videoId, stadiumId } });
  };

  return (
    <div className={styles.videoList}>
      {videos && videos.length > 0
        ? videos.map((video: ScheduleVideo) => (
            <div
              className={styles.container}
              key={video.videoId}
              onClick={() => toVideo(video.videoId)}
            >
              <div className={styles.video}>
                <img src={video.image} alt={video.name} />
              </div>
              <div className={styles.description}>
                <div className={styles.titles}>
                  <div id={styles.first}>{video.name}</div>
                  <div id={styles.second}>골영상</div>
                </div>

                <div className={styles.info}>
                  <div> {video.stadiumName}</div>
                  <div>
                    {video.date} / {video.hours}
                  </div>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default VideoList;
