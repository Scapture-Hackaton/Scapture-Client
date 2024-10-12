import React, { useEffect, useRef } from 'react';
import styles from '../scss/selectInfoBox.module.scss';
import { StadiumHoursData } from '../../../apis/dto/scapture.dto';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface StadiumHoursProps {
  stadiumHourList: StadiumHoursData[];
  chooseSchedule: (scheduleId: number) => void;
  isScheduleId: number | null;
}

const StadiumHours: React.FC<StadiumHoursProps> = ({
  stadiumHourList,
  chooseSchedule,
  isScheduleId,
}) => {
  const settings = {
    dots: true,
    infinite: false,
    // speed: 500,
    slidesToShow: 3,
    // slidesToScroll: 1,
    arrows: false,
    dotsClass: 'shceduleCss',
  };

  // // 날짜 선택 핸들러
  const handleScheduleClick = (index: number) => {
    // setSelectedShcedule(index); // 클릭된 요소의 index를 상태로 설정
    chooseSchedule(index);
  };

  const sliderRef = useRef<Slider | null>(null); // Slider에 대한 ref

  // 선택된 scheduleId가 변경될 때 슬라이드 이동
  useEffect(() => {
    if (sliderRef.current && isScheduleId && isScheduleId !== -1) {
      const scheduleIndex = stadiumHourList.findIndex(
        item => item.scheduleId === isScheduleId,
      );
      if (scheduleIndex !== -1) {
        sliderRef.current.slickGoTo(scheduleIndex);
      }
    }
  }, [isScheduleId]);

  return (
    <>
      {stadiumHourList && stadiumHourList.length > 0 ? (
        <Slider {...settings} ref={sliderRef} className={styles.housrsList}>
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
