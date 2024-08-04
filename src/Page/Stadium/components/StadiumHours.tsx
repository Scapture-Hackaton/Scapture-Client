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
