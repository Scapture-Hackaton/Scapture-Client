import React from 'react';
import styles from '../scss/selectInfoBox.module.scss';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getVideoScheduled } from '../../../apis/api/stadium.api';
import { ScheduleVideo } from '../../../apis/dto/scapture.dto';

// import { useNavigate } from 'react-router-dom';

import noDataIcon from '../../Video/image/tooltip.svg';

interface VideoListProps {
  scheduleId: number | null;
  stadiumId: number;
  toVideo: (videoId: number) => void;
}

const VideoList: React.FC<VideoListProps> = ({ scheduleId, toVideo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false); // 두 번째 모달 상태

  // Fetch video data with react-query
  const { data: videos } = useQuery<ScheduleVideo[]>({
    queryKey: ['videoScheduled', scheduleId],
    queryFn: () => {
      if (scheduleId !== null) {
        return getVideoScheduled(scheduleId);
      }
      return Promise.resolve([]);
    },
    enabled: scheduleId !== null,
  });

  const handleFirstModalClose = () => {
    setIsModalOpen(false); // 첫 번째 모달 닫기
    setIsSecondModalOpen(true); // 두 번째 모달 열기
  };

  // const navigate = useNavigate();

  // const toVideo = (videoId: number) => {
  //   navigate('/video', { state: { videoId, stadiumId } });
  // };

  return (
    <>
      <div className={styles.downloadAllBtn}>
        <div
          className={styles.downloadTitle}
          onClick={() => setIsModalOpen(true)}
        >
          풀경기 영상 전체 다운로드
        </div>
      </div>
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
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
              <div>
                이 경기의 풀영상을 <br />
                <div className={styles.textContainer}>
                  <p className={styles.blueText}>모두 다운로드</p> 하고 싶다면?
                </div>
              </div>
              <button
                className={styles.downloadButton}
                onClick={handleFirstModalClose} // 버튼 클릭 시 두 번째 모달 열기
              >
                고화질 풀경기 영상 전체 다운로드
              </button>
              <div className={styles.noticeText}>
                <img src={noDataIcon} className={styles.icon} />
                대용량 영상 다운로드시, PC 또는 안정적인 환경에서 다운로드
                권장드립니다.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* {isSecondModalOpen && (
        <VideoModal
          styles={modal}
          ref={modalRef}
          handleDownloadClick={handleDownloadClick}
          videoDetail={videoDetail}
        />
      )} */}
    </>
  );
};

export default VideoList;
