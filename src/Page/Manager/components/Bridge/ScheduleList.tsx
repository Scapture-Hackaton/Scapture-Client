import React from 'react';
import styles from '../../scss/scheduleList.module.scss';
import { postHighlight } from '../../../../apis/api/user.api';

interface ScheduleListProps {
  fieldId: number;
  isMonth: string;
  isDay: string;
}

const ScheduleList: React.FC<ScheduleListProps> = ({
  fieldId,
  isMonth,
  isDay,
}) => {
  const dummy = [
    {
      scheduleId: 1,
      hours: '10:00 ~ 12:00',
      videoCount: 12,
    },
    {
      scheduleId: 2,
      hours: '12:00 ~ 14:00',
      videoCount: 15,
    },
  ];

  const requestHighlight = async (scheduleId: number) => {
    await postHighlight(scheduleId);
  };

  return (
    <div className={styles.listContainer}>
      {dummy.map((item: any) => {
        const [startTime, endTime] = item.hours.split(' ~ ');
        return (
          <div key={item.scheduleId} className={styles.itemBox}>
            <div className={styles.date}>
              {isMonth.padStart(2, '0')}.{isDay.padStart(2, '0')}
            </div>
            <div className={styles.time}>
              <span className={styles.startTime}>
                {startTime.padStart(2, '0')}
              </span>{' '}
              ~ {endTime}
            </div>
            <div
              onClick={() => requestHighlight(item.scheduleId)}
              className={styles.btn}
            >
              요청하기
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ScheduleList;
