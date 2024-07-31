import React from 'react';
import styles from '../scss/stadium.module.scss';
import { StadiumHoursData } from '../../../apis/dto/scapture.dto';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface StadiumHoursProps {
  stadiumHourList: StadiumHoursData[];
  chooseSchedule: (scheduleId: number) => void;
}

const StadiumHours: React.FC<StadiumHoursProps> = ({
  stadiumHourList,
  chooseSchedule,
}) => {
  const settings = {
    // dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  //   const settings = {
  //     infinite: false,
  //     speed: 500,
  //     slidesToShow: 2,
  //     slidesToScroll: 2,
  //     centerMode: true, // 중간 슬라이드를 가운데에 배치
  //     centerPadding: '20px', // 슬라이드 간의 간격 설정
  //   };

  console.log(stadiumHourList);

  return (
    <>
      {stadiumHourList && stadiumHourList.length > 0 ? (
        <Slider {...settings} className={styles.housrsList}>
          {stadiumHourList.map((stadiumHour: StadiumHoursData) => (
            <div
              className={styles.group}
              key={stadiumHour.scheduleId}
              onClick={() => chooseSchedule(stadiumHour.scheduleId)}
            >
              <div className={styles.contents}>
                <span>Today</span>
                <span>{stadiumHour.hours}</span>
                <span>{stadiumHour.videoCount}개의 영상</span>
              </div>
            </div>
          ))}
        </Slider>
      ) : null}
    </>
  );
};

export default StadiumHours;
