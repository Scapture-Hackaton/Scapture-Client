import { getHighlightsForManager } from '../../../apis/api/manager.api';
import { HighlightsRes } from '../dto/manager';
import { useQuery } from '@tanstack/react-query';
import styles from '../scss/manager.module.scss';

const Highlights = () => {
  const { data: highlights } = useQuery({
    queryKey: ['getHighlightsForManager'],
    queryFn: () => getHighlightsForManager(),
    initialData: {} as HighlightsRes[],
  });

  return (
    <div className={styles.container}>
      <div className={`${styles.title} ${styles.line}`}>
        <div>구장 이름</div>
        <div>구역 이름</div>
        <div>날짜</div>
        <div>시간</div>
        <div>Schedule Id</div>
      </div>
      {/* <div className={styles.hr}></div> */}

      {highlights && highlights.length > 0 ? (
        <>
          {highlights.map((data: HighlightsRes, idx: number) => {
            return (
              <>
                <div className={styles.hr}></div>

                <div className={styles.line} key={idx}>
                  <div>{data.stadiumName}</div>
                  <div>{data.fieldName}</div>
                  <div>{data.date}</div>
                  <div>{data.hours}</div>
                  <div>{data.scheduleId}</div>
                </div>
              </>
            );
          })}
        </>
      ) : (
        <>
          <div className={styles.hr}></div>
          <div className={styles.noData}>조회된 데이터가 없습니다.</div>
        </>
      )}
    </div>
  );
};

export default Highlights;
