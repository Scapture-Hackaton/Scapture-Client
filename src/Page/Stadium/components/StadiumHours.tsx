import React, { useRef } from 'react';
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
  console.log(stadiumHourList);

  const settings = {
    dots: true,
    infinite: false,
    // speed: 500,
    slidesToShow: 3,
    // slidesToScroll: 1,
    arrows: false,
    dotsClass: 'shceduleCss',
  };

  // 날짜 선택 핸들러
  // const handleScheduleClick = (index: number) => {
  //   // setSelectedShcedule(index); // 클릭된 요소의 index를 상태로 설정
  //   chooseSchedule(index);
  // };

  const sliderRef = useRef<Slider | null>(null); // Slider에 대한 ref

  // 슬라이드 클릭 핸들러
  const handleScheduleClick = (scheduleId: number, index: number) => {
    chooseSchedule(scheduleId); // 선택한 scheduleId를 상태로 업데이트

    // 중앙에 위치시킬 인덱스를 계산 (중앙 인덱스는 slidesToShow / 2)
    const slidesToShow = settings.slidesToShow || 3; // 기본값 3
    const centerIndex = Math.floor(slidesToShow / 2); // 중앙 위치는 1번 인덱스

    // 클릭된 인덱스를 중앙에 배치
    let targetIndex = index - centerIndex;

    // 슬라이더 이동 범위를 초과하지 않도록 조정
    if (targetIndex < 0) {
      targetIndex = 0; // 첫 번째 슬라이드를 넘지 않도록
    } else if (targetIndex > stadiumHourList.length - slidesToShow) {
      targetIndex = stadiumHourList.length - slidesToShow; // 마지막 슬라이드를 넘지 않도록
    }

    // 슬라이더를 이동시킴
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(targetIndex);
    }
  };

  return (
    <>
      {stadiumHourList && stadiumHourList.length > 0 ? (
        <Slider {...settings} ref={sliderRef} className={styles.housrsList}>
          {stadiumHourList.map(
            (stadiumHour: StadiumHoursData, index: number) =>
              stadiumHour.videoCount !== 0 ? (
                <div className={styles.test} key={stadiumHour.scheduleId}>
                  <div
                    className={`${styles.scheduleGroup} ${
                      isScheduleId === stadiumHour.scheduleId
                        ? styles.selected
                        : ''
                    }`}
                    key={stadiumHour.scheduleId}
                    onClick={() =>
                      handleScheduleClick(stadiumHour.scheduleId, index)
                    }
                  >
                    <div id={styles.hour}>{stadiumHour.hours}</div>
                    <div id={styles.videoCnt}>
                      {stadiumHour.videoCount}개의 영상
                    </div>
                  </div>
                </div>
              ) : null,
          )}
        </Slider>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default StadiumHours;
