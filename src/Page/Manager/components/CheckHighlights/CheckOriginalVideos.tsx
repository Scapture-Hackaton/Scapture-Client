import {
  getHighlightsForManagerWithScheduleId,
  getOriginalsForManagerWithScheduleId,
} from '../../../../apis/api/manager.api';
import { HighlightsRes, OriginalsRes } from '../../dto/manager';
import { useQuery } from '@tanstack/react-query';
import styles from '../../scss/manager.module.scss';
import React from 'react';

interface CheckOriginalVideossProps {
  scheduleId: string;
}

const CheckOriginalVideos: React.FC<CheckOriginalVideossProps> = ({
  scheduleId,
}) => {
  const { data: highlights } = useQuery({
    queryKey: ['getOriginalsForManager'],
    queryFn: () => getOriginalsForManagerWithScheduleId(scheduleId),
    initialData: [] as HighlightsRes[], // 초기 데이터를 빈 배열로 설정
  });

  //   console.log(highlights);

  return (
    <div className={styles.container}>
      <div className={styles.headerTitle}>[{scheduleId}] 원본 영상</div>
      <table>
        <thead>
          <tr className={`${styles.title} ${styles.line}`}>
            <th>카메라 번호</th>
            <th>다운로드</th>
          </tr>
        </thead>
        <tbody>
          {highlights && highlights.length > 0 ? (
            highlights.map((data: OriginalsRes, idx: number) => (
              <tr className={`${styles.des} ${styles.line}`} key={idx}>
                <td>{data.name}</td>
                <td className={styles.hyperLink}>
                  <a href={data.url}>{data.name} 영상 다운</a>
                </td>
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

export default CheckOriginalVideos;
