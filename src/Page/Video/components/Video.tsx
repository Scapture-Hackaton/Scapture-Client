import Header from '../../Header/components/Header';
import Footer from '../../Footer/components/Footer';
import styles from '../scss/video.module.scss';

import modal from '../scss/video-modal.module.scss';
import loginModal from '../../Header/scss/login-modal.module.scss';

import download from '../../../assets/Icon/downLoadIcon.svg';
import share from '../../../assets/Icon/shareIcon.svg';

import { useLocation } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getStadiumDetail,
  getStadiumDHours,
  getVideoDetail,
  likesVideo,
  unLikeVideo,
} from '../../../apis/api/stadium.api';
import {
  StadiumDetail,
  StadiumFileds,
  // StadiumHoursData,
  VideoDetail,
} from '../../../apis/dto/scapture.dto';
import { useEffect, useState } from 'react';
import SelectBtn from './SelectBtn';
// import StadiumHours from './StadiumHours';
import VideoList from './VideoList';
import Heart from './Heart';
import {
  checkAuthDownloadVideo,
  downloadVideo,
  storeVideo,
  unStoreVideo,
} from '../../../apis/api/video.api';
import BookMark from './BookMark';

import { useRef } from 'react';
// import { modalNotice } from '../functions/ModalFunction';
import { VideoModal } from './VideoModal';
import { modalNotice } from '../functions/ModalFunction';
import {
  GOOGLE_AUTH_URL,
  KAKAO_AUTH_URL,
  NAVER_AUTH_URL,
} from '../../../apis/config/login.config';
import { LoginModal } from '../../Header/components/LoginModal';
import { useRecoilValue } from 'recoil';
import { loginData, loginDataAtom } from '../../Header/Atom/atom';

const Video = () => {
  //Object
  const AUTH_URLS = {
    kakao: KAKAO_AUTH_URL,
    google: GOOGLE_AUTH_URL,
    naver: NAVER_AUTH_URL,
  };

  const modalRef = useRef<HTMLDialogElement>(null);
  const loginModalRef = useRef<HTMLDialogElement>(null);
  const queryClient = useQueryClient();
  const location = useLocation();
  const stadiumId = location.state.stadiumId;
  const videoId = location.state.videoId;

  const { data: stadiumDetail } = useQuery({
    queryKey: ['stadiumDetail', stadiumId],
    queryFn: () => getStadiumDetail(stadiumId),
    initialData: {} as StadiumDetail,
  });

  const { data: videoDetail, isSuccess: isVideoDetailSuccess } = useQuery({
    queryKey: ['videoDetail', videoId],
    queryFn: () => getVideoDetail(videoId),
    initialData: {} as VideoDetail,
  });

  // 현재 날짜 추출
  const today = new Date();
  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 7);

  // 추출한 날짜를 기반으로 월/일 리스트 생성
  const generateDateLists = (startDate: Date, endDate: Date) => {
    const monthList = new Set<string>();
    const dayMap = new Map<string, string[]>();

    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const month = `${currentDate.getMonth() + 1}월`;
      const day = `${currentDate.getDate()}일`;

      monthList.add(month);

      if (!dayMap.has(month)) {
        dayMap.set(month, []);
      }
      dayMap.get(month)?.push(day);

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return { monthList: Array.from(monthList), dayMap };
  };

  const { monthList, dayMap } = generateDateLists(weekAgo, today);

  // 기본 날짜 값 설정
  const [isMonth, setMonth] = useState(monthList[0]);
  const [isDay, setDay] = useState(dayMap.get(isMonth)?.[0] || '');

  const handleMonthChange = (month: string) => {
    setMonth(month);
    const days = dayMap.get(month);
    if (days && days.length > 0) {
      setDay(days[0]);
    }
  };

  const handleDayChange = (day: string) => {
    setDay(day);
  };

  // 기본 구장 설정
  const [fieldList, setFieldList] = useState<string[]>([]);
  const [isField, setField] = useState<string | undefined>(undefined);

  // stadiumDetail 값을 가져오면 기본 구장 설정
  useEffect(() => {
    if (stadiumDetail.fields) {
      const fields = stadiumDetail.fields.map(
        (field: StadiumFileds) => field.name,
      );
      setFieldList(fields);
      setField(fields[0]); // 기본값 설정
    }
  }, [stadiumDetail]);

  const handleFieldChange = (field: string) => {
    setField(field);
  };

  // 선택된 구장 id 추출
  const selectedField = stadiumDetail.fields?.find(
    (field: StadiumFileds) => field.name === isField,
  );
  const selectedFieldId = selectedField?.fieldId;

  // 날짜 포맷팅
  const selectedMonth = parseInt(isMonth.replace('월', ''));
  const selectedDay = parseInt(isDay.replace('일', ''));

  const selectedDate = new Date(
    today.getFullYear(),
    selectedMonth - 1,
    selectedDay + 1,
  );
  const formattedDate = selectedDate.toISOString().split('T')[0];

  // 운영시간 리스트
  // const [isStadiumHourList, setStadiumHourList] = useState<StadiumHoursData[]>(
  //   [],
  // );

  // 운영 시간 리스트 가져오기
  useEffect(() => {
    if (selectedFieldId && formattedDate) {
      const fetchData = async () => {
        const data = await getStadiumDHours(selectedFieldId, formattedDate);

        // setStadiumHourList(data);

        if (data && data.length >= 1) {
          setScheduleId(data[0].scheduleId);
        }
      };
      fetchData();
    }
  }, [selectedFieldId, formattedDate]);

  // 운영 시간 아이디
  const [isScheduleId, setScheduleId] = useState<number>();
  // const chooseSchedule = (scheduleId: number) => {
  //   setScheduleId(scheduleId);
  // };

  const handelOpenDownloadModal = () => {
    modalNotice(modalRef);
  };

  const isLoginState = useRecoilValue<loginData>(loginDataAtom);

  // 다운로드 기능
  const handleDownloadClick = async () => {
    try {
      const authResponse = await checkAuthDownloadVideo(videoId);

      if (authResponse.status === 200 || authResponse.status === 409) {
        const downloadResponse = await downloadVideo(videoId);

        if (downloadResponse.status === 200) {
          fetch(`${videoDetail.video}`, {
            method: 'GET',
          })
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
        } else {
          alert('로그인이 필요합니다.');
          modalNotice(loginModalRef);
        }
      } else {
        if (isLoginState.state) {
          alert('버내너가 부족합니다!');
        } else {
          modalNotice(loginModalRef);
        }
      }
    } catch (error) {
      console.error('비디오 다운로드 중 오류가 발생했습니다.', error);
    } finally {
      modalRef.current?.close(); // 다운로드 완료 후 모달 닫기
    }
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
    if (videoDetail && !isLiked) {
      toggleLike(videoId);
    } else if (videoDetail && isLiked) {
      toggleUnLike(videoId);
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
    if (videoDetail && !isStore) {
      toggleStore(videoId);
    } else if (videoDetail && isStore) {
      toggleUnStore(videoId);
    }
  };

  const [isBlobUrl, setBlobUrl] = useState('');

  const loadVideo = async () => {
    try {
      if (isBlobUrl) {
        // 기존 Blob URL을 해제하여 메모리 누수 방지
        URL.revokeObjectURL(isBlobUrl);
        setBlobUrl('');
      }

      // 비디오 데이터를 모두 다운로드
      const response = await fetch(videoDetail.video);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const videoElement = document.getElementById(
        'videoPlayer',
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
    if (videoDetail && videoDetail.video) {
      loadVideo();
    }
  }, [videoDetail]);

  return (
    <div className={styles.test}>
      <Header index={2} />
      <div className={styles.community}>
        {isVideoDetailSuccess && videoDetail && videoDetail.video ? (
          <div className={styles.videoContainer}>
            <div className={styles.video}>
              <video
                id="videoPlayer"
                controls
                controlsList="nodownload"
                onContextMenu={e => e.preventDefault()}
              ></video>
            </div>
            <div className={styles.group}>
              <div className={styles.title}>{videoDetail.name}</div>
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
        ) : (
          <></>
        )}

        <div className={styles.option}>
          <div className={styles.container}>
            <div className={styles.title}>
              <div id={styles.mainTitle}>내 영상 빠르게 찾기</div>
              <div id={styles.subTitle}>
                내가 운동했던 조건을 선택하면 빠르게 내 영상을 찾을 수 있어요!
              </div>
            </div>

            <div className={styles.select}>
              <SelectBtn
                selectList={fieldList}
                selectedOption={isField || ''}
                onOptionChange={handleFieldChange}
              />
              <SelectBtn
                selectList={monthList}
                selectedOption={isMonth}
                onOptionChange={handleMonthChange}
              />
              <SelectBtn
                selectList={dayMap.get(isMonth) || []}
                selectedOption={isDay}
                onOptionChange={handleDayChange}
              />
            </div>
          </div>
        </div>

        <VideoList scheduleId={isScheduleId} stadiumId={stadiumId}></VideoList>

        {/* <div className={styles.paging}>
          <img src={leftArrow} alt=""></img>
          <div className={styles.pageNum}>1</div>
          <img src={rightArrow} alt=""></img>
        </div> */}

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
      <Footer />
    </div>
  );
};

export default Video;
