import React, { useEffect, useRef, useState } from 'react';
import styles from '../scss/downloadModal.module.scss';
import noDataIcon from '../../Video/image/tooltip.svg';
import { getOriginalVideos } from '../../../apis/api/video.api';
import { useQuery } from '@tanstack/react-query';
import { OriginalVideos } from '../../../apis/dto/video.dto';

interface DownloadOriginalVideoProps {
  scheduleId: number | null;
}

const DownloadOriginalVideo: React.FC<DownloadOriginalVideoProps> = ({
  scheduleId,
}) => {
  //   const videoUrls = [
  //     'https://scapture-video.s3.ap-northeast-2.amazonaws.com/%EC%B2%9C%EB%A7%88_%ED%92%8B%EC%82%B4%ED%8C%8C%ED%81%AC/4%EA%B5%AC%EC%9E%A5/4121/original/%EC%B2%9C%EB%A7%88_%ED%92%8B%EC%82%B4%ED%8C%8C%ED%81%AC_4%EA%B5%AC%EC%9E%A5_1.mp4',
  //     'https://scapture-video.s3.ap-northeast-2.amazonaws.com/%EC%B2%9C%EB%A7%88_%ED%92%8B%EC%82%B4%ED%8C%8C%ED%81%AC/4%EA%B5%AC%EC%9E%A5/4121/original/%EC%B2%9C%EB%A7%88_%ED%92%8B%EC%82%B4%ED%8C%8C%ED%81%AC_4%EA%B5%AC%EC%9E%A5_2.mp4',
  //     'https://scapture-video.s3.ap-northeast-2.amazonaws.com/%EC%B2%9C%EB%A7%88_%ED%92%8B%EC%82%B4%ED%8C%8C%ED%81%AC/4%EA%B5%AC%EC%9E%A5/4121/original/%EC%B2%9C%EB%A7%88_%ED%92%8B%EC%82%B4%ED%8C%8C%ED%81%AC_4%EA%B5%AC%EC%9E%A5_3.mp4',
  //   ];

  const modalRef = useRef<HTMLDivElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  //   const [isDownloading, setIsDownloading] = useState(false);
  //   const [progress, setProgress] = useState(0);

  const handleCheckDownload = () => {
    downloadVideo();
    setIsModalOpen(false); // 첫 번째 모달 닫기
  };

  const { data: originalVideos } = useQuery({
    queryKey: ['stadiumDetail', scheduleId],
    queryFn: () => getOriginalVideos(scheduleId!),
    initialData: [{}] as OriginalVideos[],
  });

  const [isVideos, setVideos] = useState<OriginalVideos[]>([]);

  useEffect(() => {
    setVideos(originalVideos);
  }, [originalVideos]);

  // 화면 밖 클릭 시 모달 닫기
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false); // 모달 닫기
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const downloadVideo = async () => {
    const delay = (ms: number) =>
      new Promise(resolve => setTimeout(resolve, ms));

    for (let index = 0; index < isVideos.length; index++) {
      try {
        const link = document.createElement('a');
        link.href = isVideos[index].url;
        link.download = `video_${index + 1}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // 브라우저가 다운로드를 처리할 시간을 줌
        await delay(500);
      } catch (error) {
        console.error(`Error downloading video_${index + 1}:`, error);
      }
    }
  };

  return (
    <>
      <div
        className={styles.downloadAllBtn}
        onClick={() => setIsModalOpen(true)}
      >
        <div className={styles.downloadTitle}>풀경기 영상 전체 다운로드</div>
      </div>
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer} ref={modalRef}>
            <div className={styles.modalContent}>
              <div>
                이 경기의 풀영상을 <br />
                <div className={styles.textContainer}>
                  <p className={styles.blueText}>모두 다운로드</p> 하고 싶다면?
                </div>
              </div>
              <button
                className={styles.downloadButton}
                onClick={handleCheckDownload} // 버튼 클릭 시 다운로드 실행
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
    </>
  );
};

export default DownloadOriginalVideo;
