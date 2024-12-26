import { useEffect, useRef, useState } from 'react';
// import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

// api
import {
  getStadiumDetail,
  getVideoDetail,
  likesVideo,
  unLikeVideo,
} from '../../../apis/api/stadium.api';
import {
  checkAuthDownloadVideo,
  // downloadVideo,
  storeVideo,
  unStoreVideo,
} from '../../../apis/api/video.api';

// components
import Header from '../../Header/components/Header';
import Footer from '../../Footer/components/Footer';
import Heart from './Heart';
import BookMark from './BookMark';
import { VideoModal } from './VideoModal';
import { LoginModal } from '../../Header/components/LoginModal';
import SelectInfoBox from '../../Stadium/components/SelectInfoBox';

// scss
import styles from '../scss/video.module.scss';

// svg
import share from '../image/ShareIcon.svg';
import beforeBtn from '../image/beforeBtn.svg';
import nextBtn from '../image/nextBtn.svg';

// dto
import { StadiumDetail, VideoDetail } from '../../../apis/dto/scapture.dto';

// func
import { modalNotice } from '../functions/ModalFunction';

// atom
import { loginData, loginDataAtom } from '../../Header/Atom/atom';
import VideoPlayer from '../../../common/component/VideoPlayer';
import ClipBoard from '../../../common/component/ClipBoard';

export interface PrevSelectDataProps {
  month: string;
  day: string;
  prevFieldId: string;
  prevScheduleId: number;
}

const Video = () => {
  const navigate = useNavigate();

  const { stadiumId: stadiumIdFromParams, videoId: videoIdFromParams } =
    useParams<{
      stadiumId: string;
      videoId: string;
    }>();

  // 상태로 전달된 stadiumId 확인
  // const stadiumIdFromState = location.state?.stadiumId;

  // 상태나 파라미터 중 하나에서 stadiumId를 가져옴
  const stadiumId = parseInt(stadiumIdFromParams!);
  const videoId = parseInt(videoIdFromParams!);

  const {
    // stadiumId: stadiumId,
    // videoId: videoId,
    month: paramMonth,
    day: paramDay,
    prevFieldId: paramField,
    prevScheduleId: paramPrevScheduleId,
  } = useParams();

  const modalRef = useRef<HTMLDialogElement>(null);
  const loginModalRef = useRef<HTMLDialogElement>(null);
  const queryClient = useQueryClient();

  const location = useLocation();

  const month = paramMonth || location.state.month;
  const day = paramDay || location.state.day;
  const prevFieldId = paramField || location.state.prevFieldId;
  const prevScheduleId =
    Number(paramPrevScheduleId) || location.state.prevScheduleId;

  const prevSelectDataProps = {
    month,
    day,
    prevFieldId,
    prevScheduleId,
  };

  const { data: stadiumDetail } = useQuery({
    queryKey: ['stadiumDetail', stadiumId],
    queryFn: () => getStadiumDetail(stadiumId),
    initialData: {} as StadiumDetail,
  });

  const {
    data: videoDetail,
    refetch: refetchVideoDetail,
    isSuccess: isVideoDetailSuccess,
  } = useQuery({
    queryKey: ['videoDetail', videoId],
    queryFn: () => getVideoDetail(videoId),
    initialData: {} as VideoDetail,
  });

  const isLoginState = useRecoilValue<loginData>(loginDataAtom);

  const handelOpenDownloadModal = () => {
    const token = localStorage.getItem('TOKEN');
    const type = localStorage.getItem('LoginType');

    if (isLoginState.state || (token && type)) {
      // 다운로드 이력이 있다면 영상 다운로드
      if (videoDetail.isDownload) {
        downLoadVideo();
      } else {
        modalNotice(modalRef);
      }
    } else {
      modalNotice(loginModalRef);
    }
  };

  // 영상 다운로드 로직
  const downLoadVideo = () => {
    fetch(`${videoDetail.video}/MP4/${videoDetail.fileName}.mp4`, {
      method: 'GET',
    })
      // fetch(`${videoDetail.video}`, {
      //   method: 'GET',
      // })
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.setAttribute('href', url);
        link.setAttribute('download', `${videoDetail.name}.mp4`);

        document.body.appendChild(link);

        link.click();

        link.parentNode?.removeChild(link);

        window.URL.revokeObjectURL(url);
      });
  };

  // 영상 다운로드 더블체크 (첫 다운로드)
  const checkAuthDownLoadVideo = async (banana: number) => {
    try {
      const authResponse = await checkAuthDownloadVideo(videoId, banana);
      if (authResponse.status === 200) {
        downLoadVideo();
        await refetchVideoDetail();
      } else if (authResponse.status === 402) {
        alert('버내너가 부족합니다!');
      } else if (authResponse.status === 404 || authResponse.status === 400) {
        modalNotice(loginModalRef);
      }
    } catch (error) {
      console.error('비디오 다운로드 중 오류가 발생했습니다.', error);
    } finally {
      modalRef.current?.close(); // 다운로드 완료 후 모달 닫기
    }
  };

  // 처음 다운로드 하는 경우
  const handleDownloadClick = async (banana: number) => {
    await checkAuthDownLoadVideo(banana);
  };

  // useMutation 훅을 사용하여 좋아요/좋아요 취소 처리
  const { mutate: toggleLike } = useMutation({
    mutationFn: async (videoId: number) => {
      const res = await likesVideo(videoId);
      if (res.status == 400 || res.status == 403) {
        modalNotice(loginModalRef);
      }
    },
    onSuccess: () => {
      // 비디오 상세 정보 갱신
      queryClient.invalidateQueries({
        queryKey: ['videoDetail', videoId],
      });
    },
    onError: error => {
      console.error('좋아요 처리 중 오류가 발생했습니다.', error);
    },
  });

  const { mutate: toggleUnLike } = useMutation({
    mutationFn: async (videoId: number) => {
      const res = await unLikeVideo(videoId);
      if (res.status == 400 || res.status == 403) {
        modalNotice(loginModalRef);
      }
    },
    onSuccess: () => {
      // 비디오 상세 정보 갱신
      queryClient.invalidateQueries({
        queryKey: ['videoDetail', videoId],
      });
    },
    onError: error => {
      console.error('좋아요 처리 중 오류가 발생했습니다.', error);
    },
  });

  // 좋아요를 눌렀을 때 처리
  const handleToggleLike = (isLiked: boolean) => {
    if (isLoginState.state) {
      if (videoDetail && !isLiked) {
        toggleLike(videoId);
      } else if (videoDetail && isLiked) {
        toggleUnLike(videoId);
      }
    } else {
      modalNotice(loginModalRef);
    }
  };

  // useMutation 훅을 사용하여 영상 저장/해제 처리
  const { mutate: toggleStore } = useMutation({
    mutationFn: async (videoId: number) => {
      const res = await storeVideo(videoId);
      if (res.status == 400 || res.status == 403) {
        modalNotice(loginModalRef);
      }
    },
    onSuccess: () => {
      // 비디오 상세 정보 갱신
      queryClient.invalidateQueries({
        queryKey: ['videoDetail', videoId],
      });
    },
    onError: error => {
      console.error('영상 저장 중 오류가 발생했습니다.', error);
    },
  });

  const { mutate: toggleUnStore } = useMutation({
    mutationFn: async (videoId: number) => {
      const res = await unStoreVideo(videoId);
      if (res.status == 400 || res.status == 403) {
        modalNotice(loginModalRef);
      }
    },
    onSuccess: () => {
      // 비디오 상세 정보 갱신
      queryClient.invalidateQueries({
        queryKey: ['videoDetail', videoId],
      });
    },
    onError: error => {
      console.error('영상 저장 해제 중 오류가 발생했습니다.', error);
    },
  });

  // 북마크를 눌렀을 때 처리
  const handleToggleStore = (isStore: boolean) => {
    if (isLoginState.state) {
      if (videoDetail && !isStore) {
        toggleStore(videoId);
      } else if (videoDetail && isStore) {
        toggleUnStore(videoId);
      }
    } else {
      modalNotice(loginModalRef);
    }
  };

  const [isClipboardVisible, setClipboardVisible] = useState(false);

  const handleShareClick = () => {
    const shareUrl = `${window.location.origin}/video/${stadiumId}/${videoId}/${prevScheduleId}/${month}/${day}/${prevFieldId}`;
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        setClipboardVisible(true);
      })
      .catch(err => {
        console.error('링크 복사 중 오류 발생:', err);
      });
  };

  // 다음 영상으로 이동
  const nextVideo = (changeVideoId: number) => {
    navigate(
      `/video/${stadiumId}/${changeVideoId}/${prevScheduleId}/${month}/${day}/${prevFieldId}`,
    ); // URL 변경 (새로고침 없이)
  };

  // URL이 변경되면 useEffect로 데이터를 새로 로드
  useEffect(() => {
    refetchVideoDetail(); // React Query로 새로운 videoId의 데이터 가져오기
  }, [videoId]); // currentVideoId가 변경될 때마다 실행

  return (
    <div className={styles.test}>
      <Header index={2} />
      <div className={styles.community}>
        <div className={styles.videoContainer}>
          {isVideoDetailSuccess && videoDetail && videoDetail.video ? (
            <>
              <div className={styles.video}>
                {videoDetail.videos.beforeVideo ? (
                  <img
                    src={beforeBtn}
                    alt=""
                    width="12px"
                    height="18px"
                    className={styles.beforeBtn}
                    onClick={() => nextVideo(videoDetail.videos.beforeVideo)}
                  />
                ) : null}

                {/* <video
                  id="videoPlayer"
                  controls
                  controlsList="nodownload"
                  src={videoDetail.video.replace(
                    'd1yr3xnm7vncof.cloudfront.net',
                    'd1f9epsweambhy.cloudfront.net',
                  )}
                  onContextMenu={e => e.preventDefault()}
                ></video> */}

                <VideoPlayer
                  videoSrc={videoDetail.video}
                  contentId={videoDetail.fileName}
                ></VideoPlayer>

                {videoDetail.videos.afterVideo ? (
                  <img
                    src={nextBtn}
                    alt=""
                    width="12px"
                    height="18px"
                    onClick={() => nextVideo(videoDetail.videos.afterVideo)}
                    className={styles.nextBtn}
                  />
                ) : null}
              </div>

              <div className={styles.group}>
                <div className={styles.title}>{videoDetail.name}</div>
                <div className={styles.videoOpt}>
                  <ul className={styles.icons}>
                    <Heart
                      id={videoId}
                      isLiked={videoDetail.isLiked}
                      likeCount={videoDetail.likeCount}
                      onToggleLike={handleToggleLike}
                    />

                    <BookMark
                      stored={videoDetail.isStored}
                      onToggleStore={handleToggleStore}
                    ></BookMark>

                    {/* <li onClick={handelOpenDownloadModal}>
                  <img src={download} alt="" width="20px" height="20px"></img>
                  <p>다운로드</p>
                </li> */}
                    {/* <li>
                  <img src={share} alt="" width="20px" height="20px"></img>
                  <p>공유</p>
                </li> */}
                  </ul>
                  {videoDetail?.stadium.isDownloadable &&
                  videoDetail?.isDownloadable ? (
                    <div
                      id={styles.downLoadVideo}
                      onClick={handelOpenDownloadModal}
                    >
                      영상 다운로드
                    </div>
                  ) : null}
                </div>
              </div>
              <div className={styles.shareVideo}>
                <div className={styles.shareDes}>
                  <div id={styles.shareImg}>
                    <img src={share} alt="" />
                  </div>
                  <div id={styles.des}>
                    편집된 영상을
                    <br />
                    바로 공유할 수 있는 기회!
                  </div>
                </div>
                <div id={styles.shareVideo} onClick={handleShareClick}>
                  영상 공유하기
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <SelectInfoBox
          stadiumDetail={stadiumDetail}
          stadiumId={stadiumId}
          prevSelectDataProps={prevSelectDataProps}
        ></SelectInfoBox>

        {/* <div className={styles.paging}>
          <img src={leftArrow} alt=""></img>
          <div className={styles.pageNum}>1</div>
          <img src={rightArrow} alt=""></img>
        </div> */}

        <VideoModal
          ref={modalRef}
          handleDownloadClick={handleDownloadClick}
          videoDetail={videoDetail}
          type="highlight"
        />
        <LoginModal modalRef={loginModalRef}></LoginModal>
      </div>
      <Footer />

      <ClipBoard
        visible={isClipboardVisible}
        onHide={() => setClipboardVisible(false)}
      ></ClipBoard>
    </div>
  );
};

export default Video;
