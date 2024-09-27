import { useEffect, useState } from 'react';
import styles from '../scss/my-reservation.module.scss';
// import backArrow from '../image/backArrow.png';
import Ground from '../image/Ground.svg';
import People from '../image/People.svg';
import Clockk from '../image/Clockk.svg';
import Calendar from '../image/Calendar.svg';
import Point from '../image/Point.svg';
// import ReactPaginate from 'react-paginate';
import { getReservation } from '../../../../apis/api/mypage.api';
// import { Link } from 'react-router-dom';
import { reservationData } from '../../dto/atom.interface';
import Header from '../../../Header/components/Header';
import Footer from '../../../Footer/components/Footer';
import { loginData, loginDataAtom } from '../../../Header/Atom/atom';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

const MyReservation = () => {
  const [isLoginState, setLoginState] =
    useRecoilState<loginData>(loginDataAtom);

  const navigate = useNavigate();
  // 리다이렉션을 useEffect 안에서 처리
  useEffect(() => {
    if (localStorage.getItem('TOKEN') && localStorage.getItem('LoginType')) {
      setLoginState({ state: true });
    }
    if (!isLoginState.state) {
      navigate('/');
    }
  }, []);

  //어떻게 나눌지 고민...
  // const reservationObject = [
  //   {
  //     date: '2024.07.18',
  //     StadiumName: 'LBFS 트레이닝 센터',
  //     fieldName: '실내 구장',
  //     hours: '20:00 ~ 22:00',
  //     fieldType: '6 vs 6',
  //     isAvailable: true, // 시간 지났는지 안지났는지
  //   },
  // ];

  const [isReservationState, setReservationState] =
    useState<reservationData[]>();

  useEffect(() => {
    const fetchReservationInfo = async () => {
      const res = await getReservation();
      console.log(res?.data);

      if (res?.data) {
        // setReservationState({
        //   date: res.data.date,
        //   StadiumName: res.data.StadiumName,
        //   fieldName: res.data.fieldName,
        //   hours: res.data.hours,
        //   fieldType: res.data.fieldType,
        //   isAvailable: res.data.isAvailable,
        // });
        setReservationState(res?.data);
      }
    };
    fetchReservationInfo();
  }, []);

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
      {isReservationState ? (
        <div className={styles.reservationContainer}>
          {isReservationState.map(
            (reservation: reservationData, idx: number) => (
              <div
                key={idx}
                className={`${styles.reserve} ${reservation.isAvailable ? styles.completed : ''}`}
              >
                <div className={styles.badge}>
                  {reservation.isAvailable ? '진행 완료' : '진행 예정'}
                </div>
                <div className={styles.stadium}>{reservation.stadiumName}</div>
                <div className={styles.detailContainer}>
                  <div className={styles.detail}>
                    <img className={styles.img} src={Calendar}></img>
                    <div className={styles.text}>{reservation.date}</div>
                  </div>
                  <div className={styles.detail}>
                    <img className={styles.img} src={Point}></img>
                    <div className={styles.text}>{reservation.fieldName}</div>
                  </div>
                  <div className={styles.detail}>
                    <img className={styles.img} src={Clockk}></img>
                    <div className={styles.text}>{reservation.hours}</div>
                  </div>
                  <div className={styles.detail}>
                    <img className={styles.img} src={People}></img>
                    <div className={styles.text}>{reservation.fieldType}</div>
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
    // <div className={styles.test}>
    //   <div className={styles.myReserve}>
    //     <div className={styles.backBtn}>
    //       <Link
    //         className={styles.reservation}
    //         style={{ textDecoration: 'none' }}
    //         to="/mypage"
    //       >
    //         <div>
    //           <img src={backArrow} alt=""></img>
    //           <p>예약 내역 확인하기</p>
    //         </div>
    //       </Link>
    //     </div>
    //     {isReservationState.data ? (
    //       <div className={styles.container}>
    //         <div className={styles.header}>나의 예약</div>

    //         <div className={styles.row}>
    //           <p>예약 날짜</p>
    //           <p>2024.08.03.토/{isReservationState.date}</p>
    //         </div>
    //         <div className={styles.row}>
    //           <p>구장 명</p>
    //           <p>A구장/{isReservationState.name}</p>
    //         </div>
    //         <div className={styles.row}>
    //           <p>사용 시간</p>
    //           <p>20:00 ~ 22:00/{isReservationState.hours}</p>
    //         </div>
    //       </div>
    //     ) : (
    //       <div className={styles.noData}>
    //         <p>아직 예약 내역이 없음</p>
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
};

export default MyReservation;
