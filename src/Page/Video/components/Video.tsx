import Header from '../../Header/components/Header';
import Footer from '../../Footer/components/Footer';
import styles from '../scss/video.module.scss';
import download from '../image/download.png';
import share from '../image/share.png';

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
  StadiumHoursData,
  VideoDetail,
} from '../../../apis/dto/scapture.dto';
import { useEffect, useState } from 'react';
import SelectBtn from './SelectBtn';
import StadiumHours from './StadiumHours';
import VideoList from './VideoList';
import Heart from './Heart';
import {
  checkAuthDownloadVideo,
  downloadVideo,
  storeVideo,
  unStoreVideo,
} from '../../../apis/api/video.api';
import BookMark from './BookMark';

const Video = () => {
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
  const [isStadiumHourList, setStadiumHourList] = useState<StadiumHoursData[]>(
    [],
  );

  // 운영 시간 리스트 가져오기
  useEffect(() => {
    if (selectedFieldId && formattedDate) {
      const fetchData = async () => {
        const data = await getStadiumDHours(selectedFieldId, formattedDate);

        setStadiumHourList(data);

        if (data && data.length >= 1) {
          setScheduleId(data[0].scheduleId);
        }
      };
      fetchData();
    }
  }, [selectedFieldId, formattedDate]);

  // 운영 시간 아이디
  const [isScheduleId, setScheduleId] = useState<number>();
  const chooseSchedule = (scheduleId: number) => {
    setScheduleId(scheduleId);
  };

  // 다운로드 기능
  const handleDownloadClick = async () => {
    try {
      const authResponse = await checkAuthDownloadVideo(videoId);

      if (authResponse.status === 200 || authResponse.status === 409) {
        const downloadResponse = await downloadVideo(videoId);
        if (downloadResponse.status === 200) {
          fetch(`${videoDetail.video}`, {
            method: 'GET',
            // content-type은 따로 지정하지 않았습니다.
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
        }
      } else {
        alert('다운로드 권한 부여에 실패했습니다.');
      }
    } catch (error) {
      console.error('비디오 다운로드 중 오류가 발생했습니다.', error);
    }
  };

  // useMutation 훅을 사용하여 좋아요/좋아요 취소 처리
  const { mutate: toggleLike } = useMutation({
    mutationFn: async (videoId: number) => {
      return await likesVideo(videoId);
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
      return await unLikeVideo(videoId);
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
      return await storeVideo(videoId);
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
      return await unStoreVideo(videoId);
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

  return (
    <div className={styles.test}>
      <Header />
      <div className={styles.community}>
        {isVideoDetailSuccess && videoDetail && videoDetail.video ? (
          <>
            <div className={styles.videoContainer}>
              <div className={styles.video}>
                <video controls>
                  <source src={videoDetail.video}></source>
                </video>
              </div>
              <div className={styles.group}>
                <div className={styles.title}>{videoDetail.name}</div>
                <ul className={styles.icons}>
                  <li onClick={handleDownloadClick}>
                    <p>다운로드</p>
                    <img src={download} alt=""></img>
                  </li>
                  <li>
                    <img src={share} alt=""></img>
                  </li>
                  <li>
                    {/* <img src={bookMark} alt=""></img> */}
                    <BookMark
                      stored={videoDetail.isStored}
                      onToggleStore={handleToggleStore}
                    ></BookMark>
                  </li>
                </ul>
              </div>
              <div className={styles.heart}>
                <Heart
                  id={videoId}
                  isLiked={videoDetail.isLiked}
                  likeCount={videoDetail.likeCount}
                  onToggleLike={handleToggleLike}
                />
                {/* <img src={fullHeart} alt="" />
                <div className={styles.cnt}>10</div> */}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

        <div className={styles.dayVideo}>
          <div className={styles.selectGroup}>
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
            <SelectBtn
              selectList={fieldList}
              selectedOption={isField || ''}
              onOptionChange={handleFieldChange}
            />
          </div>

          <div className={styles.dayGroup}>
            {/* <div className={styles.box}>
              <div className={styles.date}>Today</div>
              <div className={styles.date}>10:00~12:00</div>
              <div className={styles.cnt}>12개의 영상</div>
            </div>
            <div className={styles.box}>
              <div className={styles.date}>Today</div>
              <div className={styles.date}>10:00~12:00</div>
              <div className={styles.cnt}>12개의 영상</div>
            </div>
          </div> */}
            <StadiumHours
              stadiumHourList={isStadiumHourList}
              chooseSchedule={chooseSchedule}
            />
          </div>
        </div>

        <VideoList scheduleId={isScheduleId} stadiumId={stadiumId}></VideoList>
        {/* <div className={styles.videoList}>
          <div className={styles.container}>
            <div className={styles.video}></div>
            <div className={styles.description}>
              <div className={styles.titles}>
                <div id={styles.first}>1번째</div>
                <div id={styles.second}>골영상</div>
              </div>

              <div className={styles.info}>
                <div>창골축구장(FC서울 축구교실)</div>
                <div>07.10.수 / 10:00~12:00</div>
              </div>
            </div>
          </div>

          <div className={styles.container}>
            <div className={styles.video}></div>
            <div className={styles.description}>
              <div className={styles.titles}>
                <div id={styles.first}>1번째</div>
                <div id={styles.second}>골영상</div>
              </div>

              <div className={styles.info}>
                <div>창골축구장(FC서울 축구교실)</div>
                <div>07.10.수 / 10:00~12:00</div>
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className={styles.paging}>
          <img src={leftArrow} alt=""></img>
          <div className={styles.pageNum}>1</div>
          <img src={rightArrow} alt=""></img>
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default Video;
