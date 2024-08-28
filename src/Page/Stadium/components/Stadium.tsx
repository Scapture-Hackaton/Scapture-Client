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
import { useEffect, useState } from 'react';
import SelectBtn from './SelectBtn';
import StadiumHours from './StadiumHours';
import VideoList from './VideoList';

import locationImg from '../../../assets/Icon/location.svg';
import clock from '../../../assets/Icon/Clock.svg';
import parking from '../../../assets/Icon/parking.svg';
import dropDown from '../../../assets/Icon/dropDown.svg';

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

  // console.log(formattedDate);

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
            <div className={styles.banner}>
              <img
                src={stadiumDetail.images[0].image}
                alt=""
                width="450px"
                height="300px"
              />
            </div>

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

            <div className={styles.infoBox}>
              <div className={styles.infoHeader}>
                <div>구장 정보</div>
                <img src={dropDown} alt="" width="20px" height="20px"></img>
              </div>

              <div className={styles.infoGroup}>
                <div className={styles.topInfo}>
                  <div className={styles.isOutside}>
                    {stadiumDetail.isOutside ? '실외' : '실내'}
                  </div>
                  <div className={styles.isParking}>
                    {stadiumDetail.isOutside ? '주차 가능' : '주차 불가능'}
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

                    <span className={styles.info}>{stadiumDetail.parking}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
        <div className={styles.option}>
          <div className={styles.container}>
            <div className={styles.select}>
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
          </div>
        </div>
        <div className={styles.hours}>
          <StadiumHours
            stadiumHourList={isStadiumHourList}
            chooseSchedule={chooseSchedule}
          />
        </div>

        <VideoList scheduleId={isScheduleId} stadiumId={stadiumId}></VideoList>
      </div>
      <Footer />
    </div>
  );
};

export default Stadium;
