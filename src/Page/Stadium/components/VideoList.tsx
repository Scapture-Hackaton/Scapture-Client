import React from 'react';
import styles from '../scss/selectInfoBox.module.scss';

import { useQuery } from '@tanstack/react-query';
import { getVideoScheduled } from '../../../apis/api/stadium.api';
import {
  ScheduleVideo,
  ScheduleVideosDTO,
} from '../../../apis/dto/scapture.dto';

// import { useNavigate } from 'react-router-dom';

import noDataIcon from '../../../../src/assets/Icon/noDataIcon.svg';
import DownloadOriginalVideo from './DownloadOriginalVideo';

interface VideoListProps {
  scheduleId: number | null;
  stadiumId: number;
  toVideo: (videoId: number) => void;
  isDownloadableOriginVideo: boolean | null;
}

const VideoList: React.FC<VideoListProps> = ({
  scheduleId,
  toVideo,
  isDownloadableOriginVideo,
}) => {
  // Fetch video data with react-query
  const { data: videos, refetch } = useQuery<ScheduleVideosDTO>({
    queryKey: ['videoScheduled', scheduleId],
    queryFn: () => {
      if (scheduleId !== null) {
        return getVideoScheduled(scheduleId);
      }
      return Promise.resolve([]);
    },
    enabled: scheduleId !== null,
  });

  // const navigate = useNavigate();

  // const toVideo = (videoId: number) => {
  //   navigate('/video', { state: { videoId, stadiumId } });
  // };

  const refetchData = async () => {
    await refetch();
  };

  return (
    <>
      {scheduleId !== null && isDownloadableOriginVideo ? (
        <DownloadOriginalVideo
          isDownload={videos?.isDownload}
          scheduleId={scheduleId}
          refetchData={refetchData}
        ></DownloadOriginalVideo>
      ) : null}
      <div className={styles.videoList}>
        {videos?.videos && videos?.videos?.length > 0 ? (
          videos?.videos?.map((video: ScheduleVideo) => (
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
                  height="230"
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
              width="180px"
              height="180px"
            />
            <div>검색 결과가 없어요</div>
          </div>
        )}
      </div>
    </>
  );
};

export default VideoList;
