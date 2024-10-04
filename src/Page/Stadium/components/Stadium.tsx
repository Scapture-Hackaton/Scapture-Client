import Header from '../../Header/components/Header';
import Footer from '../../Footer/components/Footer';

import styles from '../scss/stadium.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  StadiumDetail,
  StadiumFileds,
  StadiumHoursData,
} from '../../../apis/dto/scapture.dto';

import { useQuery } from '@tanstack/react-query';
import {
  getStadiumDetail,
  getStadiumDHours,
} from '../../../apis/api/stadium.api';
import { useEffect, useRef, useState } from 'react';
import SelectBtn from './SelectBtn';
import StadiumHours from './StadiumHours';
import VideoList from './VideoList';

import locationImg from '../../../assets/Icon/location.svg';
import clock from '../../../assets/Icon/Clock.svg';
import parking from '../../../assets/Icon/parking.svg';

import dropDown from '../../../assets/Icon/dropDown.svg';
import upArrow from '../../../assets/Icon/upArrow.svg';
import Calendar from './Calendar';

import calendarIcon from '../../../assets/Icon/calendarIcon.svg';
import clockIcon from '../image/clockIcon.svg';
import locationIcon from '../image/locationIcon.svg';
import StadiumImages from './StadiumImages';

const Stadium = () => {
  const location = useLocation();
  const stadiumId = location.state.stadiumId;

  const { data: stadiumDetail } = useQuery({
    queryKey: ['stadiumDetail', stadiumId],
    queryFn: () => getStadiumDetail(stadiumId),
    initialData: {} as StadiumDetail,
  });

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
  // const [isMonth, setMonth] = useState(monthList[0]);
  // const [isDay, setDay] = useState(dayMap.get(isMonth)?.[0] || '');

  // const [isMonth, setMonth] = useState(dayList[dayList.length - 1].month);
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

  // 날짜 포맷팅
  // const selectedMonth = parseInt(isMonth.replace('월', ''));
  // const selectedDay = parseInt(isDay.replace('일', ''));

  const selectedDate = new Date(
    today.getFullYear(),
    parseInt(isMonth) - 1,
    parseInt(isDay) + 1,
  );
  const formattedDate = selectedDate.toISOString().split('T')[0];

  // 운영시간 리스트
  const [isStadiumHourList, setStadiumHourList] = useState<StadiumHoursData[]>(
    [],
  );

  // 운영 시간 리스트 가져오기
  useEffect(() => {
    if (selectedFieldId && formattedDate) {
      // const data = [
      //   {
      //     scheduleId: 1,
      //     hours: '10:00 ~ 12:00',
      //     videoCount: 12,
      //   },
      //   {
      //     scheduleId: 2,
      //     hours: '12:00 ~ 14:00',
      //     videoCount: 15,
      //   },
      //   {
      //     scheduleId: 3,
      //     hours: '12:00 ~ 14:00',
      //     videoCount: 15,
      //   },
      //   {
      //     scheduleId: 4,
      //     hours: '12:00 ~ 14:00',
      //     videoCount: 15,
      //   },
      // ];
      // setStadiumHourList(data);
      // if (data && data.length >= 1) {
      //   setScheduleId(data[0].scheduleId);
      // }
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
  const [isScheduleId, setScheduleId] = useState<number>(0);
  const chooseSchedule = (scheduleId: number) => {
    setScheduleId(scheduleId);
  };

  // 구장 정보 자세히 보기

  // 디테일 버튼을 눌렀는지에 대한 상태
  const [open, setOpen] = useState(false);

  const selectRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  // 옵션 버튼을 눌렀는지에 대한 상태
  // const [isOpenOption, setOpenOption] = useState(false);

  const optionRef = useRef<HTMLDivElement>(null);

  // const toggleDropdownOption = () => {
  //   setOpenOption(!isOpenOption);
  // };

  // 예약 페이지로 이동
  const navigate = useNavigate();

  const toReservation = (stadiumId: number) => {
    navigate('/reservation', { state: { stadiumId } });
  };

  return (
    <div className={styles.test}>
      <Header index={2} />
      <div className={styles.stadium}>
        {stadiumDetail &&
        stadiumDetail.images &&
        stadiumDetail.images.length > 0 ? (
          <>
            {/* <div className={styles.banner}>
              <img
                src={stadiumDetail.images[0].image}
                alt=""
                width="450px"
                height="300px"
              />
            </div> */}
            <StadiumImages images={stadiumDetail.images}></StadiumImages>

            <div className={styles.introBox}>
              <div className={styles.title}>
                <div>{stadiumDetail.name}</div>
                <button
                  onClick={() => toReservation(stadiumId)}
                  id={styles.reservation}
                >
                  구장 예약하기
                </button>
              </div>

              <div className={styles.introText}>
                {stadiumDetail.description}
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
                  {stadiumDetail.condition === 'OVERALL' ? (
                    <>
                      <div className={styles.isOutside}>실내</div>
                      <div className={styles.isOutside}>실외</div>
                    </>
                  ) : stadiumDetail.condition === 'INDOOR' ? (
                    <div className={styles.isOutside}>실내</div>
                  ) : (
                    <div className={styles.isOutside}>실외</div>
                  )}
                  <div className={styles.isParking}>
                    {stadiumDetail.isParking ? '주차 가능' : '주차 불가능'}
                  </div>
                </div>

                <div id={styles.info}>
                  <div className={styles.line}>
                    <img src={locationImg} alt="" width="20px" height="20px" />
                    <div className={styles.info}>{stadiumDetail.location}</div>
                  </div>

                  <div className={styles.line}>
                    <img src={clock} alt="" width="20px" height="20px" />
                    <span className={styles.info}>{stadiumDetail.hours}</span>
                  </div>

                  <div className={styles.line}>
                    <img src={parking} alt="" width="20px" height="20px" />

                    <span className={styles.info}>
                      {stadiumDetail?.isFree ? '무료 주차징' : '유료 주차장'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
        <div className={styles.option} ref={optionRef}>
          <div className={styles.container}>
            <div className={styles.title}>
              <div id={styles.mainTitle}>
                <div>내 영상 빠르게 찾기</div>
                {/* {isOpenOption ? (
                  <img
                    src={upArrow}
                    alt=""
                    width="20px"
                    height="20px"
                    onClick={toggleDropdownOption}
                  ></img>
                ) : (
                  <img
                    src={dropDown}
                    alt=""
                    width="20px"
                    height="20px"
                    onClick={toggleDropdownOption}
                  ></img>
                )} */}
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

        <VideoList scheduleId={isScheduleId} stadiumId={stadiumId}></VideoList>
      </div>
      <Footer />
    </div>
  );
};

export default Stadium;
