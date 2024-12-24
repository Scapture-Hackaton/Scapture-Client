import React, { useEffect, useRef, useState } from 'react';
import styles from '../scss/downloadModal.module.scss';
import noDataIcon from '../../Video/image/tooltip.svg';
import {
  checkAuthDownloadOriginal,
  getOriginalVideos,
} from '../../../apis/api/video.api';
import { useQuery } from '@tanstack/react-query';
import { OriginalVideos } from '../../../apis/dto/video.dto';
import { VideoModal } from '../../Video/components/VideoModal';
import { useRecoilValue } from 'recoil';
import { loginData, loginDataAtom } from '../../Header/Atom/atom';
import { modalNotice } from '../../Video/functions/ModalFunction';
import { LoginModal } from '../../Header/components/LoginModal';

interface DownloadOriginalVideoProps {
  scheduleId: number | null;
  isDownload: boolean | undefined;
  refetchData: () => void;
}

const DownloadOriginalVideo: React.FC<DownloadOriginalVideoProps> = ({
  scheduleId,
  isDownload,
  refetchData,
}) => {
  // 영상 다운로드 확인 모달
  const modalRef = useRef<HTMLDivElement>(null);

  // 로그인 모달
  const loginModalRef = useRef<HTMLDialogElement>(null);

  const isLoginState = useRecoilValue<loginData>(loginDataAtom);

  // 버내너 사용하기 모달
  const videoModalRef = useRef<HTMLDialogElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(false);

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

  // 영상 다운로드 더블체크 (첫 다운로드)
  const checkAuthDownLoadVideo = async (banana: number) => {
    try {
      // 첫 번째 모달 닫기
      setIsModalOpen(false);

      const authResponse = await checkAuthDownloadOriginal(scheduleId!, banana);
      if (authResponse.status === 200 || authResponse.status === 409) {
        downloadVideo();
        refetchData();
      } else if (authResponse.status === 402) {
        alert('버내너가 부족합니다!');
      } else if (authResponse.status === 404 || authResponse.status === 400) {
        modalNotice(loginModalRef);
      }
    } catch (error) {
      console.error('비디오 다운로드 중 오류가 발생했습니다.', error);
    } finally {
      videoModalRef.current?.close(); // 다운로드 완료 후 모달 닫기
    }
  };

  // 처음 다운로드 하는 경우
  const handleDownloadClick = async (banana: number) => {
    await checkAuthDownLoadVideo(banana);
  };

  const handelOpenDownloadModal = () => {
    const token = localStorage.getItem('TOKEN');
    const type = localStorage.getItem('LoginType');

    if (isLoginState.state || (token && type)) {
      if (isDownload) {
        downloadVideo();
      } else {
        modalNotice(videoModalRef);
      }
    } else {
      modalNotice(loginModalRef);
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
                onClick={handelOpenDownloadModal} // 버튼 클릭 시 다운로드 실행
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
      <LoginModal modalRef={loginModalRef}></LoginModal>
      <VideoModal
        ref={videoModalRef}
        handleDownloadClick={handleDownloadClick}
        videoDetail={null}
        type="original"
      />
    </>
  );
};

export default DownloadOriginalVideo;
