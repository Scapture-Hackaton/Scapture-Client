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

  console.log(highlights);

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr className={`${styles.title} ${styles.line}`}>
            <th>신청 시간</th>
            <th>구장 이름</th>
            <th>구역 이름</th>
            <th>경기 날짜</th>
            <th>경기 시간</th>
            <th>Schedule-Id</th>
            <th>User-Id</th>
            <th>이름</th>
            <th>전화번호</th>
          </tr>
        </thead>
        {/* <div className={styles.hr}></div> */}
        <tbody>
          {highlights && highlights.length > 0 ? (
            <>
              {highlights.map((data: HighlightsRes, idx: number) => {
                return (
                  <tr className={`${styles.des} ${styles.line}`} key={idx}>
                    <td>{data.createAt}</td>
                    <td>{data.stadiumName}</td>
                    <td>{data.fieldName}</td>
                    <td>{data.date}</td>
                    <td>{data.hours}</td>
                    <td>{data.scheduleId}</td>
                    <td>{data.userId}</td>
                    <td>{data.scheduleId}</td>
                    <td>{data.userId}</td>
                  </tr>
                );
              })}
            </>
          ) : (
            <tr>
              <td colSpan={7} className={styles.noData}>
                조회된 데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Highlights;
