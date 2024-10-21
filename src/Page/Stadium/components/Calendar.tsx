import React, { useEffect, useState } from 'react';
import styles from '../scss/selectInfoBox.module.scss';

interface SelectProps {
  dayList: { day: string; weekday: string }[];
  onOptionChange: (option: any) => void;
  isDay: string;
}

const Calendar: React.FC<SelectProps> = ({
  dayList,
  onOptionChange,
  isDay,
}) => {
  const formattedDayList = dayList.map(item => ({
    day: item.day.padStart(2, '0'),
    weekday: item.weekday,
  }));

  // 기본값을 리스트의 마지막 요소(오늘)로 설정
  const [selectedDay, setSelectedDay] = useState(
    isDay ? isDay : formattedDayList[formattedDayList.length - 1].day,
  );

  const [selectedIdx, setselectedIdx] = useState(formattedDayList.length - 1);

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
      {formattedDayList.map((day, idx) => (
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
      ))}
    </div>
  );
};

export default Calendar;
