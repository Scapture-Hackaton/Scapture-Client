import React from 'react';
import styles from '../scss/stadium.module.scss';
import { useQuery } from '@tanstack/react-query';
import { getVideoScheduled } from '../../../apis/api/stadium.api';
import { ScheduleVideo } from '../../../apis/dto/scapture.dto';

interface VideoListProps {
  scheduleId: number | undefined;
}

const VideoList: React.FC<VideoListProps> = ({ scheduleId }) => {
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

  return (
    <>
      {videos && videos.length > 0
        ? videos.map((video: ScheduleVideo) => (
            <div className={styles.videoList} key={video.videoId}>
              <div className={styles.stadium}>
                <div className={styles.container}>
                  <div className={styles.videoImage}>
                    <img src={video.image} alt={video.name} />
                  </div>
                  <div id={styles.video}>
                    <div className={styles.info}>
                      <div className={styles.group}>
                        <span id={styles.name}>
                          <b>{video.name}</b>
                        </span>
                        <span className={styles.title} id={styles.video}>
                          골 영상
                        </span>
                      </div>
                      <div className={styles.group}>
                        <span className={styles.title} id={styles.location}>
                          {video.stadiumName}
                        </span>
                        <span className={styles.title} id={styles.date}>
                          {video.date} / {video.hours}
                        </span>
                      </div>
                    </div>
                    {/* css 적용 후 추가 예정 */}
                  </div>
                </div>
              </div>
            </div>
          ))
        : null}
    </>
  );
};

export default VideoList;
