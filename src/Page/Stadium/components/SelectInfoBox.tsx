import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../scss/selectInfoBox.module.scss';

// component
import Calendar from './Calendar';
import SelectBtn from './SelectBtn';
import StadiumHours from './StadiumHours';
import VideoList from './VideoList';

// api
import { getStadiumDHours } from '../../../apis/api/stadium.api';

// dto
import {
  StadiumDetail,
  StadiumFileds,
  StadiumHoursData,
} from '../../../apis/dto/scapture.dto';

import { PrevSelectDataProps } from '../../Video/components/Video';

// svg 이미지
import calendarIcon from '../../../assets/Icon/calendarIcon.svg';
import clockIcon from '../image/clockIcon.svg';
import locationIcon from '../image/locationIcon.svg';
import InfoIcon from '../../../assets/Icon/InfoIcon2.svg';
import Payments from '../../../common/component/Payment/Payments';

// 현재 시간 구하는 함수
const getCurrentTime = () => {
  const now = new Date();

  return now;
};

const findClosestTime = (stadiumHours: any[]) => {
  const currentTime = getCurrentTime(); // 현재 시간 가져오기

  let closestTimeDiff = -Infinity; // 음수 방향으로 가장 가까운 시간을 찾기 위한 초기값
  let closestScheduleId = null;

  stadiumHours.forEach(stadiumHour => {
    const hours = stadiumHour.hours;

    // "12:00~14:00"에서 "~" 뒤의 끝나는 시간을 추출
    const endTimeStr = hours.split('~')[1].trim();

    // 현재 날짜와 결합하여 Date 객체로 변환
    const [endHour, endMinute] = endTimeStr.split(':').map(Number);
    const endDateTime = new Date();
    endDateTime.setHours(endHour, endMinute, 0, 0); // 시간 설정

    // 현재 시간과 끝나는 시간의 차이 계산 (밀리초)
    const timeDiff = endDateTime.getTime() - currentTime.getTime();

    // 시간이 현재 시간보다 작고, 가장 가까운 시간을 선택
    if (timeDiff < 0 && timeDiff > closestTimeDiff) {
      closestTimeDiff = timeDiff;
      closestScheduleId = stadiumHour.scheduleId;
    }
  });

  return closestScheduleId;
};

interface SelectInfoBoxProps {
  stadiumDetail: StadiumDetail;
  stadiumId: number;
  prevSelectDataProps: PrevSelectDataProps | null;
}

const SelectInfoBox: React.FC<SelectInfoBoxProps> = ({
  stadiumDetail,
  stadiumId,
  prevSelectDataProps,
}) => {
  // 현재 날짜 추출
  const today = new Date();
  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 7);

  // 요일 추출 함수
  const getDayOfWeek = (date: Date) => {
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    return daysOfWeek[date.getDay()];
  };

  // 일, 월, 요일을 함께 저장하는 리스트 생성 함수
  const generateDateListsWithMonthAndWeekdays = (
    startDate: Date,
    endDate: Date,
  ) => {
    const dayList = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const month = currentDate.getMonth() + 1; // 월 (0부터 시작하므로 +1)
      const day = currentDate.getDate(); // 일
      const weekday = getDayOfWeek(currentDate); // 요일
      dayList.push({ month: `${month}`, day: `${day}`, weekday }); // 월, 일, 요일 저장
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dayList;
  };

  // dayList 생성
  const dayList = generateDateListsWithMonthAndWeekdays(weekAgo, today);

  // 기본 날짜 값 설정

  const [isMonth, setMonth] = useState(
    prevSelectDataProps
      ? prevSelectDataProps.month
      : dayList[dayList.length - 1].month || '',
  );
  const [isDay, setDay] = useState(
    prevSelectDataProps
      ? prevSelectDataProps.day
      : dayList[dayList.length - 1].day || '',
  );

  // const handleMonthChange = (month: string) => {
  //   setMonth(month);
  //   const days = dayMap.get(month);
  //   if (days && days.length > 0) {
  //     setDay(days[0]);
  //   }
  // };

  const handleDayChange = (dayInfo: any) => {
    setDay(dayInfo.day);

    setMonth(dayInfo.month);

    setScheduleId(null);
  };

  // 기본 구장 설정
  const [fieldList, setFieldList] = useState<string[]>([]);
  const [isField, setField] = useState<string | null>(
    prevSelectDataProps ? prevSelectDataProps.prevFieldId : null,
  );

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
    setScheduleId(null);
  };

  // 선택된 구장 id 추출
  const selectedField = stadiumDetail.fields?.find(
    (field: StadiumFileds) => field.name === isField,
  );
  const selectedFieldId = selectedField?.fieldId;

  const selectedDate = new Date(
    today.getFullYear(),
    parseInt(isMonth) - 1,
    parseInt(isDay) + 1,
  );

  const formattedDate = selectedDate.toISOString().split('T')[0];

  // 운영시간 리스트
  const [isStadiumHourList, setStadiumHourList] = useState<
    StadiumHoursData[] | null
  >([]);

  useEffect(() => {
    // 비동기 함수 내부에 필드 ID와 날짜 상태를 캡처

    const fetchData = async () => {
      if (selectedFieldId && formattedDate) {
        try {
          const data = await getStadiumDHours(selectedFieldId, formattedDate);

          if (data) {
            setStadiumHourList(data);
          } else {
            setStadiumHourList(null);
          }
        } catch (error) {
          //   console.error('Error fetching data:', error);
          setStadiumHourList(null);
        }
      }
    };

    // selectedFieldId와 formattedDate가 바뀔 때마다 fetchData 실행
    fetchData();
  }, [selectedFieldId, formattedDate]);

  // 운영 시간 아이디
  const [isScheduleId, setScheduleId] = useState<number | null>(
    prevSelectDataProps ? prevSelectDataProps.prevScheduleId : null,
  );

  useEffect(() => {
    if (prevSelectDataProps == null && isStadiumHourList) {
      const closestScheduleId = findClosestTime(isStadiumHourList);

      setScheduleId(closestScheduleId);
    }
  }, [isStadiumHourList]);

  const chooseSchedule = (scheduleId: number) => {
    setScheduleId(scheduleId);
  };

  const navigate = useNavigate();

  // 비디오 넘어갈 때 기본 정보 넘겨주기
  const toVideo = (videoId: number) => {
    window.scrollTo(0, 0);
    navigate('/video', {
      state: {
        videoId,
        stadiumId,
        month: isMonth,
        day: isDay,
        prevFieldId: isField,
        prevScheduleId: isScheduleId,
      },
    });
  };

  useEffect(() => {
    if (prevSelectDataProps) {
      setMonth(prevSelectDataProps?.month);
      setDay(prevSelectDataProps?.day);
      setField(prevSelectDataProps.prevFieldId);
      setScheduleId(prevSelectDataProps.prevScheduleId);
    }
  }, [prevSelectDataProps]);

  const paymentModalRef = useRef<HTMLDivElement>(null);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handlePaymentStart = () => {
    setIsPaymentModalOpen(true);
  };

  const paymentModalClose = () => {
    setIsPaymentModalOpen(false);
  };

  // 화면 밖 클릭 시 모달 닫기
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        paymentModalRef.current &&
        !paymentModalRef.current.contains(event.target as Node)
      ) {
        setIsPaymentModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div className={styles.option}>
        <div className={styles.container}>
          <div className={styles.title}>
            <div id={styles.mainTitle}>
              <div>내 영상 빠르게 찾기</div>
            </div>
            <div id={styles.subTitle}>
              내가 운동했던 조건을 선택하면 빠르게 내 영상을 찾을 수 있어요!
            </div>
          </div>

          <div className={styles.selectBox}>
            <div className={styles.selectGroup}>
              <div className={styles.options}>
                <div className={styles.subTitle}>
                  <img src={calendarIcon} alt="" width="20px" height="20px" />
                  <div>날짜</div>
                </div>

                <Calendar
                  dayList={dayList}
                  onOptionChange={handleDayChange}
                  isDay={isDay}
                ></Calendar>
              </div>

              <div className={styles.options}>
                <div className={styles.subTitle}>
                  <img src={locationIcon} alt="" width="20px" height="20px" />
                  <div>구역</div>
                </div>
                <div className={styles.selectLocation}>
                  <SelectBtn
                    selectList={fieldList}
                    selectedOption={isField || ''}
                    onOptionChange={handleFieldChange}
                    type="field"
                  />
                </div>
              </div>

              <div className={styles.options}>
                <div className={styles.subTitle}>
                  <img src={clockIcon} alt="" width="20px" height="20px" />
                  <div>시간</div>
                </div>

                <div>
                  {isStadiumHourList && isStadiumHourList.length > 0 ? (
                    <StadiumHours
                      stadiumHourList={isStadiumHourList}
                      chooseSchedule={chooseSchedule}
                      isScheduleId={isScheduleId}
                    />
                  ) : (
                    <div id={styles.noHours}>
                      해당하는 조건의 결과가 없습니다.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.downLoadFrame}>
        <div id={styles.textGroup}>
          <div className={styles.desText}>이 경기의 영상을</div>
          <div className={styles.desText}>
            <span>모두 다운로드</span>하고 싶다면?
          </div>
        </div>
        <div
          className={styles.downLoadBtn}
          onClick={() => {
            handlePaymentStart();
          }}
        >
          고화질 영상 전체 다운로드
        </div>
        <div className={styles.downLoadTxt}>
          <img src={InfoIcon} alt="" width="12px" height="12px" />
          <div>영상은 2주 이후에 말소됩니다.</div>
        </div>
      </div>
      {isStadiumHourList && isStadiumHourList.length > 0 ? (
        <VideoList
          scheduleId={isScheduleId}
          stadiumId={stadiumId}
          toVideo={toVideo}
        ></VideoList>
      ) : null}
      {isPaymentModalOpen && (
        <Payments payValue={3_500} paymentModalClose={paymentModalClose} />
      )}
    </>
  );
};

export default SelectInfoBox;
