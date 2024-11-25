import { useEffect, useState } from 'react';
import styles from '../../scss/bridge.module.scss';
import Header from '../../../Header/components/Header';
import Footer from '../../../Footer/components/Footer';

import HighLightIcon from '../../image/highLightIcon.svg';
import Locationicon from '../../image/locationicon.svg';
import FieldLocationIcon from '../../../../assets/Icon/stadiumIcon.svg';
import calendarIcon from '../../../../assets/Icon/calendarIcon.svg';

import Calendar from '../../../Stadium/components/Calendar';
import { useNavigate, useParams } from 'react-router-dom';
import ScheduleList from './ScheduleList';
import { useQuery } from '@tanstack/react-query';
import { getStadiumDetail } from '../../../../apis/api/stadium.api';
import {
  StadiumDetail,
  StadiumFileds,
} from '../../../../apis/dto/scapture.dto';
// import AlertModal from '../../../../common/component/AlertModal';

const Bridge = () => {
  const { stadiumId, fieldId } = useParams();

  const { data: stadiumDetail } = useQuery({
    queryKey: ['stadiumDetail', stadiumId],
    queryFn: () => getStadiumDetail(parseInt(stadiumId!)),
    initialData: {} as StadiumDetail,
  });

  const [fieldName, setFieldName] = useState('구역명');

  useEffect(() => {
    if (stadiumDetail && stadiumDetail.fields) {
      // fieldId와 일치하는 필드 찾기
      const matchingField = stadiumDetail.fields.find(
        (field: StadiumFileds) => field.fieldId === parseInt(fieldId!),
      );

      // 일치하는 필드의 이름 설정
      if (matchingField) {
        setFieldName(matchingField.name);
      } else {
        setFieldName('구역명을 찾을 수 없습니다.'); // 없을 경우 기본 메시지
      }
    }
  }, [stadiumDetail, fieldId]);

  // console.log(stadiumDetail);

  // 현재 날짜 추출
  const today = new Date();
  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 2);

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

    // setScheduleId(null);
  };

  const [isModalVisible, setModalVisible] = useState(true);

  // const handleCloseModal = () => {
  //   setModalVisible(false);
  // };

  const navigate = useNavigate();
  const goToStadium = () => {
    navigate(`/stadium/${stadiumId}`);
  };

  return (
    <div className={styles.main}>
      <Header index={0} />
      <div className={styles.container}>
        <div className={styles.topContainer}>
          <div className={styles.explainContainer}>
            {stadiumDetail?.images &&
            stadiumDetail?.images.length > 0 &&
            stadiumDetail?.images[0]?.image ? (
              <img
                src={stadiumDetail?.images[0]?.image}
                alt=""
                width="450px"
                height="254px"
                className={styles.backImg}
              />
            ) : null}

            <img
              src={HighLightIcon}
              className={styles.highLightIcon}
              alt=""
              width="60px"
              height="60px"
            />
            <div className={styles.text}>오늘 구장에서 운동했다면</div>
            <div className={styles.text}>
              <span>하이라이트 추출 요청</span> 해서 <span>알림톡</span> 으로
              받아보세요!
            </div>
            <div className={styles.fieldNameBox} onClick={() => goToStadium()}>
              <img src={Locationicon} alt="" width="20px" height="20px" />
              <div id={styles.fieldName}>{stadiumDetail.name}</div>
            </div>
          </div>
          <div className={styles.locationBox}>
            <img src={FieldLocationIcon} alt="" />
            <div>{fieldName}</div>
          </div>
          <div className={styles.alertBox}>
            <div className={styles.wrapper}>
              <div id={styles.notice}>Notice</div>
              <div className={styles.noticeText}>
                <span>로그인 이후</span> 영상 요청하기가 가능합니다.
              </div>
            </div>
          </div>
        </div>

        <div className={styles.highlightContainer}>
          <div className={styles.title}>
            <div id={styles.mainTitle}>
              <div>하이라이트 추출 요청하기</div>
            </div>
            <div id={styles.subTitle}>
              운동했던 날짜를 찾아 영상을 요청하세요!
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
            </div>
          </div>
        </div>
        {fieldId ? (
          <ScheduleList
            fieldId={parseInt(fieldId)}
            fieldName={fieldName}
            isDay={isDay}
            isMonth={isMonth}
          ></ScheduleList>
        ) : null}
      </div>
      {/* {isModalVisible && (
        <AlertModal message="서비스 준비중입니다!" onClose={handleCloseModal} />
      )} */}

      <Footer></Footer>
    </div>
  );
};

export default Bridge;
