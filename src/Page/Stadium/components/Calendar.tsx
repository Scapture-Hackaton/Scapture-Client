import React, { useEffect, useState } from 'react';
import styles from '../scss/calendar.module.scss';
import { getCalendarHaveVideo } from '../../../apis/api/stadium.api';
import { useQuery } from '@tanstack/react-query';

interface SelectProps {
  dayList: { day: string; weekday: string }[];
  onOptionChange: (option: any) => void;
  isDay: string;
  fieldId: number | null | undefined;
}

const Calendar: React.FC<SelectProps> = ({
  dayList,
  onOptionChange,
  isDay,
  fieldId,
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

  // 각 날짜마다 스케쥴이 존재하는지 확인하는 리스트
  const { data: haveVideoList } = useQuery({
    queryKey: ['haveVideo', fieldId],
    queryFn: () => getCalendarHaveVideo(fieldId!),
    initialData: {} as [boolean],
  });

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
          <div className={styles.day}>{day.day}</div>
          <div className={styles.weekday}>{day.weekday}</div>
          {haveVideoList && haveVideoList[idx] ? (
            <div className={styles.dot}></div>
          ) : (
            <div></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Calendar;
