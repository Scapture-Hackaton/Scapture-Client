import React from 'react';
import styles from '../scss/stadium.module.scss';
import { StadiumHoursData } from '../../../apis/dto/scapture.dto';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface StadiumHoursProps {
  stadiumHourList: StadiumHoursData[];
  chooseSchedule: (scheduleId: number) => void;
  isScheduleId: number;
}

const StadiumHours: React.FC<StadiumHoursProps> = ({
  stadiumHourList,
  chooseSchedule,
  isScheduleId,
}) => {
  const settings = {
    // dots: true,
    infinite: false,
    // speed: 500,
    slidesToShow: 3,
    // slidesToScroll: 1,
    arrows: false,
  };

  // 기본값을 리스트의 마지막 요소(오늘)로 설정
  // const [selectedSchedule, setSelectedShcedule] = useState<number | null>(null);

  // // 날짜 선택 핸들러
  const handleScheduleClick = (index: number) => {
    // setSelectedShcedule(index); // 클릭된 요소의 index를 상태로 설정
    chooseSchedule(index);
  };

  return (
    <>
      {stadiumHourList && stadiumHourList.length > 0 ? (
        <Slider {...settings} className={styles.housrsList}>
          {stadiumHourList.map((stadiumHour: StadiumHoursData) => (
            <div className={styles.test} key={stadiumHour.scheduleId}>
              <div
                className={`${styles.scheduleGroup} ${
                  isScheduleId === stadiumHour.scheduleId ? styles.selected : ''
                }`}
                key={stadiumHour.scheduleId}
                onClick={() => handleScheduleClick(stadiumHour.scheduleId)}
              >
                <div id={styles.hour}>{stadiumHour.hours}</div>
                <div id={styles.videoCnt}>
                  {stadiumHour.videoCount}개의 영상
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default StadiumHours;
