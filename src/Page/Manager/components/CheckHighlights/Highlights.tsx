import { getHighlightsForManager } from '../../../../apis/api/manager.api';
import { HighlightsRes } from '../../dto/manager';
import { useQuery } from '@tanstack/react-query';
import styles from '../../scss/manager.module.scss';
import { useNavigate } from 'react-router-dom';

const Highlights = () => {
  const { data: highlights } = useQuery({
    queryKey: ['getHighlightsForManager'],
    queryFn: () => getHighlightsForManager(),
    initialData: [] as HighlightsRes[], // 초기 데이터를 빈 배열로 설정
  });

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.headerTitle}>하이라이트 추출 요청 내역</div>
      <table>
        <thead>
          <tr className={`${styles.title} ${styles.line}`}>
            <th>구장 이름</th>
            <th>구역 이름</th>
            <th>경기 날짜</th>
            <th>경기 시간</th>
            <th>Schedule-Id</th>
            <th>하이라이트 추출 여부</th>
          </tr>
        </thead>
        <tbody>
          {highlights && highlights.length > 0 ? (
            highlights.map((data: HighlightsRes, idx: number) => (
              <tr
                className={
                  data.isExtracted
                    ? `${styles.checked} ${styles.des} ${styles.line}`
                    : `${styles.des} ${styles.line}`
                }
                key={idx}
              >
                <td>{data.stadiumName}</td>
                <td>{data.fieldName}</td>
                <td>{data.date}</td>
                <td>{data.hours}</td>
                <td>
                  <div
                    className={styles.hyperLink}
                    onClick={() =>
                      navigate(`/admin/highlights/${data.scheduleId}`)
                    }
                  >
                    {data.scheduleId}
                  </div>
                </td>
                <td>{data.isExtracted ? <div>O</div> : <div>X</div>}</td>
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

export default Highlights;
