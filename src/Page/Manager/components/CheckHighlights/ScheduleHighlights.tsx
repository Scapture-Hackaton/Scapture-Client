import { getHighlightsForManagerWithScheduleId } from '../../../../apis/api/manager.api';
import { HighlightsRes } from '../../dto/manager';
import { useQuery } from '@tanstack/react-query';
import styles from '../../scss/manager.module.scss';
import React from 'react';

interface ScheduleHighlightsProps {
  scheduleId: string;
}

const ScheduleHighlights: React.FC<ScheduleHighlightsProps> = ({
  scheduleId,
}) => {
  const { data: highlights } = useQuery({
    queryKey: ['getHighlightsForManager'],
    queryFn: () => getHighlightsForManagerWithScheduleId(scheduleId),
    initialData: [] as HighlightsRes[], // 초기 데이터를 빈 배열로 설정
  });

  //   console.log(highlights);

  return (
    <div className={styles.container}>
      <div className={styles.headerTitle}>
        [{scheduleId}] 하이라이트 추출 요청 인원
      </div>
      <table>
        <thead>
          <tr className={`${styles.title} ${styles.line}`}>
            <th>신청 시간</th>
            <th>이름</th>
            <th>전화번호</th>
          </tr>
        </thead>
        <tbody>
          {highlights && highlights.length > 0 ? (
            highlights.map((data: HighlightsRes, idx: number) => (
              <tr className={`${styles.des} ${styles.line}`} key={idx}>
                <td>{data.createAt}</td>
                <td>{data.username}</td>
                <td>{data.phoneNumber}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className={styles.noData}>
                조회된 데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleHighlights;
