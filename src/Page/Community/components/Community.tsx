import { useState, useEffect, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Header from '../../Header/components/Header';
import Footer from '../../Footer/components/Footer';
import styles from '../scss/community.module.scss';
import modal from '../../Header/scss/login-modal.module.scss';
import Comment from './Comment';

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

const Community = () => {
  //DOM
  const modalRef = useRef<HTMLDialogElement>(null);

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

  const [isBlobUrl, setBlobUrl] = useState('');

  const loadVideo = async () => {
    try {
      if (isBlobUrl) {
        // 기존 Blob URL을 해제하여 메모리 누수 방지
        URL.revokeObjectURL(isBlobUrl);
        setBlobUrl('');
      }

      // 비디오 데이터를 모두 다운로드
      const response = await fetch(videoDetailData.video);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const videoElement = document.getElementById(
        'communityVideo',
      ) as HTMLVideoElement;

      if (videoElement) {
        videoElement.src = url;

        // 비디오가 끝까지 재생된 후 Blob URL 해제
        videoElement.onended = () => {
          URL.revokeObjectURL(url);
          setBlobUrl(''); // 해제 후 상태 초기화
        };
      }

      // 새로운 Blob URL 상태 설정
      setBlobUrl(url);
    } catch (error) {
      console.error('비디오 로딩 중 오류가 발생했습니다.', error);
    }
  };

  useEffect(() => {
    if (videoDetailData && videoDetailData.video) {
      loadVideo();
    }
  }, [videoDetailData]);

  return (
    <div className={styles.test}>
      <Header />
      <div className={styles.community}>
        {isVideoDetailDataSuccess && videoDetailData ? (
          <>
            <div className={styles.videoContainer}>
              <div className={styles.video}>
                {/* <img src={videoDetailData.image} alt="" /> */}
                <video
                  id="communityVideo"
                  controls
                  controlsList="nodownload"
                  onContextMenu={e => e.preventDefault()}
                >
                  {/* <source src={videoDetailData.video} /> */}
                </video>
              </div>
              <div className={styles.title}>{videoDetailData.name}</div>
            </div>
            <div className={styles.fieldText}>
              {videoDetailData.stadium.name}
            </div>
            <div className={styles.heart}>
              <VideoHeart
                videoId={isVideoId}
                isLiked={videoDetailData.isLiked}
                likeCount={videoDetailData.likeCount}
                onToggleLike={handleToggleLike}
              />
            </div>
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
      <LoginModal
        styles={modal}
        AUTH_URLS={AUTH_URLS}
        modalRef={modalRef}
      ></LoginModal>
    </div>
  );
};

export default Community;
