import Header from '../../Header/components/Header';
import Footer from '../../Footer/components/Footer';

// import { test } from '../functions/function';
import styles from '../scss/reservation.module.scss';
import modal from '../scss/reservation-modal.module.scss';
import check from '../scss/reservation-check-modal.module.scss';
import { modalNotice } from '../functions/ModalFunction';
import {
  ReservationModal,
  ReservationCheckModal,
} from '../components/ReservationModal';

// import testImg from '../image/testImg.png';
import circle from '../image/circle.png';
// import leftArrow from '../image/leftArrow.png';
// import rightArrow from '../image/rightArrow.png';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getStadiumDetail } from '../../../apis/api/stadium.api';
import { StadiumDetail, StadiumFileds } from '../../../apis/dto/scapture.dto';
import { useEffect, useState, useRef } from 'react';
import { getReservationList } from '../../../apis/api/reservation.api';
import SelectBtn from './SelectBtn';
import ReservationList from './ReservationList';
import { ReservationDto } from '../../../apis/dto/reservation.dto';

const Reservation = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const modalCheckRef = useRef<HTMLDialogElement>(null);

  const location = useLocation();
  const stadiumId = location.state.stadiumId;

  const { data: stadiumDetail } = useQuery({
    queryKey: ['stadiumDetail', stadiumId],
    queryFn: () => getStadiumDetail(stadiumId),
    initialData: {} as StadiumDetail,
  });

  // 현재 날짜 추출
  const today = new Date();
  const weekAfter = new Date(today);
  weekAfter.setDate(today.getDate() + 7);

  // 추출한 날짜를 기반으로 월/일 리스트 생성
  const generateDateLists = (startDate: Date, endDate: Date) => {
    const monthList = new Set<string>();
    const dayMap = new Map<string, string[]>();

    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const month = `${currentDate.getMonth() + 1}월`;
      const day = `${currentDate.getDate()}일`;

      monthList.add(month);

      if (!dayMap.has(month)) {
        dayMap.set(month, []);
      }
      dayMap.get(month)?.push(day);

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return { monthList: Array.from(monthList), dayMap };
  };

  const { monthList, dayMap } = generateDateLists(today, weekAfter);

  // 기본 날짜 값 설정
  const [isMonth, setMonth] = useState(monthList[0]);
  const [isDay, setDay] = useState(dayMap.get(isMonth)?.[0] || '');

  const handleMonthChange = (month: string) => {
    setMonth(month);
    const days = dayMap.get(month);
    if (days && days.length > 0) {
      setDay(days[0]);
    }
  };

  const handleDayChange = (day: string) => {
    setDay(day);
  };

  // 기본 구장 설정
  const [fieldList, setFieldList] = useState<string[]>([]);
  const [isField, setField] = useState<string | undefined>(undefined);

  // stadiumDetail 값을 가져오면 기본 구장 설정
  useEffect(() => {
    if (stadiumDetail.fields) {
      const fields = stadiumDetail.fields.map(
        (field: StadiumFileds) => field.name,
      );
      setFieldList(fields);
      setField(fields[0]); // 기본값 설정
    }
  }, [stadiumDetail]);

  const handleFieldChange = (field: string) => {
    setField(field);
  };

  // 선택된 구장 id 추출
  const selectedField = stadiumDetail.fields?.find(
    (field: StadiumFileds) => field.name === isField,
  );
  const selectedFieldId = selectedField?.fieldId;

  // 날짜 포맷팅
  const selectedMonth = parseInt(isMonth.replace('월', ''));
  const selectedDay = parseInt(isDay.replace('일', ''));

  const selectedDate = new Date(
    today.getFullYear(),
    selectedMonth - 1,
    selectedDay + 1,
  );
  const formattedDate = selectedDate.toISOString().split('T')[0];

  // 예약시간 리스트
  const [isReservationList, setReservationList] = useState<ReservationDto[][]>(
    [],
  );

  // 예략 내역 리스트 가져오기
  useEffect(() => {
    if (selectedFieldId && formattedDate) {
      const fetchData = async () => {
        const data = await getReservationList(
          stadiumId,
          selectedFieldId,
          formattedDate,
        );

        setReservationList(data);
      };
      fetchData();
    }
  }, [selectedFieldId, formattedDate]);

  return (
    <div className={styles.test}>
      <Header />
      <div className={styles.reservation}>
        {stadiumDetail &&
        stadiumDetail.images &&
        stadiumDetail.images.length > 0 ? (
          <div className={styles.stadiumDetail}>
            <div className={styles.slider}>
              <img src={stadiumDetail.images[0].image} alt="" />
            </div>

            <div className={styles.container}>
              <div className={styles.description}>
                <div className={styles.title}>
                  <div className={styles.box}>
                    <img src={circle} alt="" />
                  </div>
                  <span>{stadiumDetail.name}</span>
                </div>
                <div className={styles.introduce}>
                  {stadiumDetail.description}
                </div>
              </div>

              <div className={styles.info}>
                <div className={styles.header}>
                  <div className={styles.title}>구장 정보</div>
                  <button
                    className={styles.reserve}
                    onClick={() => {
                      modalNotice(modalRef);
                    }}
                  >
                    구장 예약하기
                  </button>
                </div>

                <div className={styles.contents}>
                  <div className={styles.row}>
                    <div className={styles.th}>구장 위치</div>
                    <div>{stadiumDetail.location}</div>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.th}>운영 시간</div>
                    <div>{stadiumDetail.hours}</div>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.th}>실내/실외</div>
                    <div>{stadiumDetail.isOutside ? '실외' : '실내'}</div>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.th}>주차 공간</div>
                    <div>{stadiumDetail.parking}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className={styles.dayVideo}>
          <div className={styles.selectGroup}>
            <SelectBtn
              selectList={monthList}
              selectedOption={isMonth}
              onOptionChange={handleMonthChange}
            />
            <SelectBtn
              selectList={dayMap.get(isMonth) || []}
              selectedOption={isDay}
              onOptionChange={handleDayChange}
            />
            <SelectBtn
              selectList={fieldList}
              selectedOption={isField || ''}
              onOptionChange={handleFieldChange}
            />
          </div>

          {/* <div className={styles.dayGroup}>
            <div className={styles.box}>
              <div className={styles.date}>Today</div>
              <div className={styles.date}>10:00~12:00</div>
              <div className={styles.cnt}>12개의 영상</div>
            </div>
            <div className={styles.box}>
              <div className={styles.date}>Today</div>
              <div className={styles.date}>10:00~12:00</div>
              <div className={styles.cnt}>12개의 영상</div>
            </div>
          </div> */}
        </div>
        <div className={styles.reserveList}>
          <ReservationList reserveList={isReservationList}></ReservationList>

          {/* <div className={styles.group}>
            <div className={styles.compontent}>
              <div className={styles.info}>
                <div className={styles.field}>A구장</div>
                <div className={styles.versus}>6 vs 6</div>
              </div>

              <div className={styles.date}>10:00 ~ 12:00</div>

              <button>예약하기</button>
            </div>

            <div className={styles.compontent}>
              <div className={styles.info}>
                <div className={styles.field}>A구장</div>
                <div className={styles.versus}>6 vs 6</div>
              </div>

              <div className={styles.date}>10:00 ~ 12:00</div>

              <button>예약하기</button>
            </div>
          </div> */}
        </div>

        {/* <div className={styles.paging}>
          <img src={leftArrow} alt=""></img>
          <div className={styles.pageNum}>1</div>
          <img src={rightArrow} alt=""></img>
        </div> */}

        {/* modalRef */}
        <ReservationModal
          styles={modal}
          ref={modalRef}
          extendRef={modalCheckRef}
        />
        {/* modalCheckRef */}
        <ReservationCheckModal styles={check} ref={modalCheckRef} />
      </div>
      <Footer />
    </div>
  );
};

export default Reservation;
