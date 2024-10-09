import React, { useEffect, useState } from 'react';
import styles from '../scss/selectInfoBox.module.scss';

import Calendar from './Calendar';
import SelectBtn from './SelectBtn';
import StadiumHours from './StadiumHours';

import { getStadiumDHours } from '../../../apis/api/stadium.api';

import {
  StadiumDetail,
  StadiumFileds,
  StadiumHoursData,
} from '../../../apis/dto/scapture.dto';

import calendarIcon from '../../../assets/Icon/calendarIcon.svg';
import clockIcon from '../image/clockIcon.svg';
import locationIcon from '../image/locationIcon.svg';
import { useNavigate } from 'react-router-dom';
import VideoList from './VideoList';

interface SelectInfoBoxProps {
  stadiumDetail: StadiumDetail;
  stadiumId: number;
}

const SelectInfoBox: React.FC<SelectInfoBoxProps> = ({
  stadiumDetail,
  stadiumId,
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

  const [isMonth, setMonth] = useState(dayList[dayList.length - 1].month || '');
  const [isDay, setDay] = useState(dayList[dayList.length - 1].day || '');

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
    setScheduleId(null);
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
          console.error('Error fetching data:', error);
          setStadiumHourList(null);
        }
      }
    };

    // selectedFieldId와 formattedDate가 바뀔 때마다 fetchData 실행
    fetchData();
  }, [selectedFieldId, formattedDate]);

  // 운영 시간 아이디
  const [isScheduleId, setScheduleId] = useState<number | null>(null);
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
      {isStadiumHourList && isStadiumHourList.length > 0 ? (
        <VideoList
          scheduleId={isScheduleId}
          stadiumId={stadiumId}
          toVideo={toVideo}
        ></VideoList>
      ) : null}
    </>
  );
};

export default SelectInfoBox;
