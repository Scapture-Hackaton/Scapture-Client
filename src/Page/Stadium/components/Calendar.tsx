import React, { useEffect, useState } from 'react';
import styles from '../scss/stadium.module.scss';

interface SelectProps {
  dayList: { day: string; weekday: string }[];
  onOptionChange: (option: string) => void;
}

const Calendar: React.FC<SelectProps> = ({ dayList, onOptionChange }) => {
  const formattedDayList = dayList.map(item => ({
    day: item.day.padStart(2, '0'),
    weekday: item.weekday,
  }));

  // 기본값을 리스트의 마지막 요소(오늘)로 설정
  const [selectedDay, setSelectedDay] = useState(
    formattedDayList[formattedDayList.length - 1].day,
  );

  // 날짜 선택 핸들러
  const handleDayClick = (index: string) => {
    setSelectedDay(index); // 클릭된 요소의 index를 상태로 설정
  };

  useEffect(() => {
    onOptionChange(selectedDay.toString());
  }, [selectedDay]);
  // console.log(dayList);

  return (
    <div className={styles.calendar}>
      {formattedDayList.map((day, idx) => (
        <div
          key={idx}
          className={`${styles.block} ${
            selectedDay === day.day ? styles.selected : ''
          }`}
          onClick={() => handleDayClick(day.day)}
        >
          <div>{day.day}</div>
          <div>{day.weekday}</div>
        </div>
      ))}
    </div>
  );
};

export default Calendar;
