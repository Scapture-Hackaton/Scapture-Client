import React, { useEffect, useState } from 'react';
import styles from '../scss/calendar.module.scss';

interface SelectProps {
  dayList: { day: string; weekday: string }[];
  onOptionChange: (option: any) => void;
  isDay: string;
  stadiumId: number;
}

const Calendar: React.FC<SelectProps> = ({
  dayList,
  onOptionChange,
  isDay,
  stadiumId,
}) => {
  const formattedDayList = dayList.map(item => ({
    day: item.day.padStart(2, '0'),
    weekday: item.weekday,
  }));

  // 기본값을 리스트의 마지막 요소(오늘)로 설정
  const [selectedDay, setSelectedDay] = useState(
    isDay
      ? isDay.padStart(2, '0')
      : formattedDayList[formattedDayList.length - 1].day,
  );

  const [selectedIdx, setselectedIdx] = useState(
    isDay
      ? formattedDayList.findIndex(item => item.day === isDay.padStart(2, '0'))
      : formattedDayList.length - 1,
  );

  // 날짜 선택 핸들러
  const handleDayClick = (index: number) => {
    setSelectedDay(formattedDayList[index].day); // 클릭된 요소의 index를 상태로 설정
    setselectedIdx(index);
  };

  useEffect(() => {
    onOptionChange(dayList[selectedIdx]);
  }, [selectedDay]);
  // console.log(dayList);

  return (
    <div className={styles.calendar}>
      {formattedDayList.map((day, idx) =>
        stadiumId === 75 ? (
          day.weekday === '토' || day.weekday === '일' ? (
            <div
              key={idx}
              className={`${styles.block} ${
                selectedDay === day.day ? styles.selected : ''
              }`}
              onClick={() => handleDayClick(idx)}
            >
              <div>{stadiumId === 75 ? parseInt(day.day) - 7 : day.day}</div>
              <div>{day.weekday}</div>
            </div>
          ) : null
        ) : (
          <div
            key={idx}
            className={`${styles.block} ${
              selectedDay === day.day ? styles.selected : ''
            }`}
            onClick={() => handleDayClick(idx)}
          >
            <div>{day.day}</div>
            <div>{day.weekday}</div>
          </div>
        ),
      )}
    </div>
  );
};

export default Calendar;
