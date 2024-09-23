import { useState, useEffect, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Header from '../../Header/components/Header';
import Footer from '../../Footer/components/Footer';
import styles from '../scss/community.module.scss';
import modal from '../../Video/scss/video-modal.module.scss';
import loginModal from '../../Header/scss/login-modal.module.scss';
import Comment from './Comment';

import download from '../../../assets/Icon/downLoadIcon.svg';
import share from '../../../assets/Icon/shareIcon.svg';

import {
  KAKAO_AUTH_URL,
  GOOGLE_AUTH_URL,
  NAVER_AUTH_URL,
} from '../../../apis/config/login.config';

import {
  getPopularVideos,
  getVideoDetail,
  unLikeVideo,
} from '../../../apis/api/community.api';
import PopularVideoList from './PopularVideoList';
import { likesVideo } from '../../../apis/api/stadium.api';
import VideoHeart from './VideoHeart';
import { LoginModal } from '../../Header/components/LoginModal';
import BookMark from './BookMark';
import {
  checkAuthDownloadVideo,
  downloadVideo,
  storeVideo,
  unStoreVideo,
} from '../../../apis/api/video.api';
import { modalNotice } from '../functions/ModalFunction';
import { VideoModal } from '../../Video/components/VideoModal';

import locationImg from '../../../assets/Icon/location.svg';
import clock from '../../../assets/Icon/Clock.svg';
import parking from '../../../assets/Icon/parking.svg';

import dropDown from '../../../assets/Icon/dropDown.svg';
import upArrow from '../../../assets/Icon/upArrow.svg';

const Community = () => {
  //DOM
  const modalRef = useRef<HTMLDialogElement>(null);
  const loginModalRef = useRef<HTMLDialogElement>(null);

  //Object
  const AUTH_URLS = {
    kakao: KAKAO_AUTH_URL,
    google: GOOGLE_AUTH_URL,
    naver: NAVER_AUTH_URL,
  };

  const queryClient = useQueryClient();

  // 인기 동영상 가져오기
  const {
    data: popularVideoData = { data: [] },
    isSuccess: isPopularVideoDataSuccess,
  } = useQuery({
    queryKey: ['popular_videos'],
    queryFn: getPopularVideos,
    initialData: { data: [] },
  });

  // 1위 동영상
  const firstVideoId =
    isPopularVideoDataSuccess && popularVideoData.length > 0
      ? popularVideoData[0].videoId
      : null;

  const [isVideoId, setVideoId] = useState(firstVideoId);

  // 보여줄 영상의 디테일
  const { data: videoDetailData, isSuccess: isVideoDetailDataSuccess } =
    useQuery({
      queryKey: ['video_detail', isVideoId],
      queryFn: () => getVideoDetail(isVideoId),
      enabled: !!isVideoId, // isVideoId가 존재할 때만 쿼리 실행
      initialData: null,
    });

  useEffect(() => {
    if (
      setVideoId != null &&
      popularVideoData != null &&
      popularVideoData.length > 0
    ) {
      setVideoId(popularVideoData[0].videoId);
    }
  }, [popularVideoData]);

  useEffect(() => {
    if (isVideoId) {
      queryClient.invalidateQueries({ queryKey: ['video_detail', isVideoId] });
    }

    // if (
    //   setVideoId != null &&
    //   popularVideoData != null &&
    //   popularVideoData.length > 0
    // ) {
    //   setVideoId(popularVideoData[0].videoId);
    // }
  }, [isVideoId, queryClient]);

  // onToggleLike 함수 정의
  // const handleToggleLike = (videoId: number) => {
  //   // 성공적으로 API 호출 후 데이터 갱신
  //   queryClient.invalidateQueries({ queryKey: ['popular_videos'] });
  //   queryClient.invalidateQueries({ queryKey: ['video_detail', videoId] });
  // };

  const handleToggleLike = (isLiked: boolean) => {
    if (videoDetailData && !isLiked) {
      toggleLikeVideo(isVideoId);
    } else if (videoDetailData && isLiked) {
      toggleUnLikeVideo(isVideoId);
    }
  };

  // useMutation 훅을 사용하여 영상 좋아요/해제 처리
  const { mutate: toggleLikeVideo } = useMutation({
    mutationFn: async (videoId: number) => {
      const res = await likesVideo(videoId);
      if (res.status == 400 || res.status == 403) {
        modalRef.current?.showModal();
      }
    },
    onSuccess: () => {
      // 비디오 상세 정보 갱신
      queryClient.invalidateQueries({
        queryKey: ['video_detail', isVideoId],
      });
    },
    onError: error => {
      console.error('영상 저장 중 오류가 발생했습니다.', error);
    },
  });

  const { mutate: toggleUnLikeVideo } = useMutation({
    mutationFn: async (videoId: number) => {
      const res = await unLikeVideo(videoId);
      if (res.status == 400 || res.status == 403) {
        modalNotice(loginModalRef);
        // modalRef.current?.showModal();
      }
    },
    onSuccess: () => {
      // 비디오 상세 정보 갱신
      queryClient.invalidateQueries({
        queryKey: ['video_detail', isVideoId],
      });
    },
    onError: error => {
      console.error('영상 저장 해제 중 오류가 발생했습니다.', error);
    },
  });

  const changeVideo = (id: number) => {
    setVideoId(id);
    queryClient.invalidateQueries({ queryKey: ['comments', id] });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['comments', isVideoId] });
  }, [isVideoId, queryClient]);

  // const [isBlobUrl, setBlobUrl] = useState('');

  // const loadVideo = async () => {
  //   try {
  //     if (isBlobUrl) {
  //       // 기존 Blob URL을 해제하여 메모리 누수 방지
  //       URL.revokeObjectURL(isBlobUrl);
  //       setBlobUrl('');
  //     }

  //     // 비디오 데이터를 모두 다운로드
  //     const response = await fetch(videoDetailData.video);
  //     const blob = await response.blob();
  //     const url = URL.createObjectURL(blob);

  //     const videoElement = document.getElementById(
  //       'communityVideo',
  //     ) as HTMLVideoElement;

  //     if (videoElement) {
  //       videoElement.src = url;

  //       // 비디오가 끝까지 재생된 후 Blob URL 해제
  //       videoElement.onended = () => {
  //         URL.revokeObjectURL(url);
  //         setBlobUrl(''); // 해제 후 상태 초기화
  //       };
  //     }

  //     // 새로운 Blob URL 상태 설정
  //     setBlobUrl(url);
  //   } catch (error) {
  //     console.error('비디오 로딩 중 오류가 발생했습니다.', error);
  //   }
  // };

  // useMutation 훅을 사용하여 영상 저장/해제 처리
  const { mutate: toggleStore } = useMutation({
    mutationFn: async (videoId: number) => {
      const res = await storeVideo(videoId);
      if (res.status == 400 || res.status == 403) {
        modalNotice(modalRef);
      }
    },
    onSuccess: () => {
      // 비디오 상세 정보 갱신
      queryClient.invalidateQueries({
        queryKey: ['videoDetail', isVideoId],
      });
    },
    onError: error => {
      console.error('영상 저장 중 오류가 발생했습니다.', error);
    },
  });

  // 다운로드 기능
  const handleDownloadClick = async () => {
    try {
      const authResponse = await checkAuthDownloadVideo(isVideoId);

      if (authResponse.status === 200 || authResponse.status === 409) {
        const downloadResponse = await downloadVideo(isVideoId);

        if (downloadResponse.status === 200) {
          fetch(`${videoDetailData.video}`, {
            method: 'GET',
          })
            .then(response => response.blob())
            .then(blob => {
              const url = window.URL.createObjectURL(blob);
              const link = document.createElement('a');

              link.setAttribute('href', url);
              link.setAttribute('download', `${videoDetailData.name}.mp4`);

              document.body.appendChild(link);

              link.click();

              link.parentNode?.removeChild(link);

              window.URL.revokeObjectURL(url);
            });
        } else {
          alert('로그인이 필요합니다.');
          modalNotice(loginModalRef);
        }
      } else {
        modalNotice(loginModalRef);
      }
    } catch (error) {
      console.error('비디오 다운로드 중 오류가 발생했습니다.', error);
    } finally {
      modalRef.current?.close(); // 다운로드 완료 후 모달 닫기
    }
  };

  const { mutate: toggleUnStore } = useMutation({
    mutationFn: async (videoId: number) => {
      const res = await unStoreVideo(videoId);
      if (res.status == 400 || res.status == 403) {
        modalNotice(modalRef);
      }
    },
    onSuccess: () => {
      // 비디오 상세 정보 갱신
      queryClient.invalidateQueries({
        queryKey: ['videoDetail', isVideoId],
      });
    },
    onError: error => {
      console.error('영상 저장 해제 중 오류가 발생했습니다.', error);
    },
  });

  // 북마크를 눌렀을 때 처리
  const handleToggleStore = (isStore: boolean) => {
    if (videoDetailData && !isStore) {
      toggleStore(isVideoId);
    } else if (videoDetailData && isStore) {
      toggleUnStore(isVideoId);
    }
  };

  // useEffect(() => {
  //   if (videoDetailData && videoDetailData.video) {
  //     loadVideo();
  //   }
  // }, [videoDetailData]);

  const handelOpenDownloadModal = () => {
    modalNotice(modalRef);
  };

  // 버튼을 눌렀는지에 대한 상태
  const [open, setOpen] = useState(false);

  const selectRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.test}>
      <Header index={3} />
      <div className={styles.community}>
        {isVideoDetailDataSuccess && videoDetailData ? (
          <>
            <div className={styles.videoContainer}>
              <div className={styles.video}>
                <video
                  id="videoPlayer"
                  controls
                  controlsList="nodownload"
                  onContextMenu={e => e.preventDefault()}
                >
                  <source src={videoDetailData.video} type="video/mp4" />
                </video>
              </div>
              <div className={styles.group}>
                <div className={styles.title}>{videoDetailData.name}</div>
                <ul className={styles.icons}>
                  <li className={styles.heart}>
                    <VideoHeart
                      videoId={isVideoId}
                      isLiked={videoDetailData.isLiked}
                      likeCount={videoDetailData.likeCount}
                      onToggleLike={handleToggleLike}
                    />
                  </li>
                  <li>
                    <BookMark
                      stored={videoDetailData.isStored}
                      onToggleStore={handleToggleStore}
                    ></BookMark>
                  </li>
                  <li onClick={handelOpenDownloadModal}>
                    <img src={download} alt="" width="20px" height="20px"></img>
                    <p>다운로드</p>
                  </li>
                  <li>
                    <img src={share} alt="" width="20px" height="20px"></img>
                    <p>공유</p>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className={`${styles.infoBox}  ${open ? styles.open : ''}`}
              ref={selectRef}
            >
              <div className={styles.infoHeader}>
                <div>구장 정보</div>
                {open ? (
                  <img
                    src={upArrow}
                    alt=""
                    width="20px"
                    height="20px"
                    onClick={toggleDropdown}
                  ></img>
                ) : (
                  <img
                    src={dropDown}
                    alt=""
                    width="20px"
                    height="20px"
                    onClick={toggleDropdown}
                  ></img>
                )}
              </div>

              <div className={styles.infoGroup}>
                <div className={styles.topInfo}>
                  <div className={styles.isOutside}>
                    {videoDetailData.isOutside ? '실외' : '실내'}
                  </div>
                  <div className={styles.isParking}>
                    {videoDetailData.isParking ? '주차 가능' : '주차 불가능'}
                  </div>
                </div>

                <div id={styles.info}>
                  <div className={styles.line}>
                    <img src={locationImg} alt="" width="20px" height="20px" />

                    <div className={styles.info}>
                      {videoDetailData.stadium.location}
                    </div>
                  </div>

                  <div className={styles.line}>
                    <img src={clock} alt="" width="20px" height="20px" />

                    <span className={styles.info}>
                      {videoDetailData.stadium.hours}
                    </span>
                  </div>

                  <div className={styles.line}>
                    <img src={parking} alt="" width="20px" height="20px" />

                    <span className={styles.info}>
                      {videoDetailData.stadium.parking}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className={styles.fieldText}>
              {videoDetailData.stadium.name}
            </div> */}

            <div className={styles.commentContainer}>
              <Comment videoId={isVideoId} />
            </div>
          </>
        ) : (
          <></>
        )}

        <PopularVideoList videos={popularVideoData} changeVideo={changeVideo} />

        {/* <div className={styles.paging}>
          <img src={leftArrow} alt="" />
          <div className={styles.pageNum}>1</div>
          <img src={rightArrow} alt="" />
        </div> */}
      </div>
      <Footer />

      <VideoModal
        styles={modal}
        ref={modalRef}
        handleDownloadClick={handleDownloadClick}
      />
      <LoginModal
        styles={loginModal}
        AUTH_URLS={AUTH_URLS}
        modalRef={loginModalRef}
      ></LoginModal>
    </div>
  );
};

export default Community;
