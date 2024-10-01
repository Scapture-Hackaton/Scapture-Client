import { useEffect } from 'react';
import styles from '../scss/my-reservation.module.scss';
// import backArrow from '../image/backArrow.png';
import Ground from '../image/Ground.svg';
import People from '../image/People.svg';
import Clockk from '../image/Clockk.svg';
import Calendar from '../image/Calendar.svg';
import Point from '../image/Point.svg';
// import ReactPaginate from 'react-paginate';
// import { getReservation } from '../../../../apis/api/mypage.api';
// import { Link } from 'react-router-dom';
import { reservationData } from '../../dto/atom.interface';
import Header from '../../../Header/components/Header';
import Footer from '../../../Footer/components/Footer';
import { loginData, loginDataAtom } from '../../../Header/Atom/atom';
import { useRecoilState } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';

const MyReservation = () => {
  const location = useLocation();
  const isReservationState = location.state.reserveList;

  const [isLoginState, setLoginState] =
    useRecoilState<loginData>(loginDataAtom);

  const navigate = useNavigate();
  // 리다이렉션을 useEffect 안에서 처리
  useEffect(() => {
    if (localStorage.getItem('TOKEN') && localStorage.getItem('LoginType')) {
      setLoginState({ state: true });
    }
  }, []);

  useEffect(() => {
    if (!isLoginState.state) {
      navigate('/');
    }
  }, [isLoginState.state]); // isLoginState가 업데이트된 후 동작

  // const { data: isReservationState } = useQuery({
  //   queryKey: ['reserveList'],
  //   queryFn: () => getReservation(),
  // });

  // const [isReservationState, setReservationState] =
  //   useState<reservationData[]>();

  //로그인이 안되기때문에 임의로 예약내역 여부 판단
  // const isReservation = true;
  // const reservations = [
  //   {
  //     id: 1,
  //     status: 'upcoming',
  //     date: '0000.00.00',
  //     location: '선택 구역명',
  //     time: '00:00~00:00',
  //     teams: '00 vs 00',
  //   },
  //   {
  //     id: 2,
  //     status: 'upcoming',
  //     date: '0000.00.00',
  //     location: '선택 구역명',
  //     time: '00:00~00:00',
  //     teams: '00 vs 00',
  //   },
  //   {
  //     id: 3,
  //     status: 'completed',
  //     date: '0000.00.00',
  //     location: '선택 구역명',
  //     time: '00:00~00:00',
  //     teams: '00 vs 00',
  //   },
  //   {
  //     id: 4,
  //     status: 'completed',
  //     date: '0000.00.00',
  //     location: '선택 구역명',
  //     time: '00:00~00:00',
  //     teams: '00 vs 00',
  //   },
  //   {
  //     id: 5,
  //     status: 'completed',
  //     date: '0000.00.00',
  //     location: '선택 구역명',
  //     time: '00:00~00:00',
  //     teams: '00 vs 00',
  //   },
  //   {
  //     id: 6,
  //     status: 'completed',
  //     date: '0000.00.00',
  //     location: '선택 구역명',
  //     time: '00:00~00:00',
  //     teams: '00 vs 00',
  //   },
  // ];

  return (
    <div className={styles.test}>
      <Header index={0}></Header>
      {isReservationState?.data && isReservationState?.data?.length > 0 ? (
        <div className={styles.reservationContainer}>
          {isReservationState.data.map(
            (reservation: reservationData, idx: number) => (
              <div
                key={idx}
                className={`${styles.reserve} ${reservation.isAvailable ? '' : styles.completed}`}
              >
                <div className={styles.badgeInfo}>
                  <div className={styles.badge}>
                    {reservation.isAvailable ? '진행 예정' : '진행 완료'}
                  </div>
                  <div className={styles.dDayInfo}>
                    {reservation.decisionDay > 0
                      ? `D-${reservation.decisionDay}`
                      : `D+${reservation.decisionDay}`}
                  </div>
                </div>

                <div className={styles.stadium}>
                  {reservation.stadiumName || '-'}
                </div>
                <div className={styles.detailContainer}>
                  <div className={styles.detail}>
                    <img className={styles.img} src={Calendar}></img>
                    <div className={styles.text}>
                      {reservation.date || '날짜 정보 없음'}
                    </div>
                  </div>
                  <div className={styles.detail}>
                    <img className={styles.img} src={Point}></img>
                    <div className={styles.text}>
                      {reservation.fieldName || '구장 정보 없음'}
                    </div>
                  </div>
                  <div className={styles.detail}>
                    <img className={styles.img} src={Clockk}></img>
                    <div className={styles.text}>
                      {reservation.hours || '운영 시간 정보 없음'}
                    </div>
                  </div>
                  <div className={styles.detail}>
                    <img className={styles.img} src={People}></img>
                    <div className={styles.text}>
                      {reservation.fieldType || '-'}
                    </div>
                  </div>
                </div>
              </div>
            ),
          )}
          {/* <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            pageCount={8} //몇개 페이지 보여줄건지
            pageRangeDisplayed={10} // 페이지 주변에 표시될 번호 범위
            containerClassName={styles.pagination} /// 전체컨테이너
            activeClassName={styles.active} // 활성화 페이지 번호에 적용
            pageClassName={styles.pageNumber} //각 페이지 번호에 적용
            previousClassName={styles.button} // 이전버튼 적용
            nextClassName={styles.button} //다음버튼 적용
          /> */}
        </div>
      ) : (
        <div className={styles.reservationContainer}>
          <div className={styles.noReserve}>
            <img src={Ground} className={styles.img}></img>
            <div className={styles.title}>아직 예약 내역이 없어요</div>
          </div>
        </div>
      )}
      <Footer></Footer>
    </div>
  );
};

export default MyReservation;
