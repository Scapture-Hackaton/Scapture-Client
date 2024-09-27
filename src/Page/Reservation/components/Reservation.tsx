import Header from '../../Header/components/Header';
import Footer from '../../Footer/components/Footer';

import styles from '../scss/reservation.module.scss';

import { useLocation } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getStadiumDetail } from '../../../apis/api/stadium.api';
import { StadiumDetail, StadiumFileds } from '../../../apis/dto/scapture.dto';
import { useEffect, useRef, useState } from 'react';
import { getReservationList } from '../../../apis/api/reservation.api';
import SelectBtn from './SelectBtn';
import ReservationList from './ReservationList';
import { ReservationDto } from '../../../apis/dto/reservation.dto';

import locationImg from '../../../assets/Icon/location.svg';
import clock from '../../../assets/Icon/Clock.svg';
import parking from '../../../assets/Icon/parking.svg';

import dropDown from '../../../assets/Icon/dropDown.svg';
import upArrow from '../../../assets/Icon/upArrow.svg';

const Reservation = () => {
  const location = useLocation();
  const stadiumId = location.state.stadiumId;

  const queryClient = useQueryClient();

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
  const [isReservationList, setReservationList] = useState<ReservationDto[]>(
    [],
  );

  // 예략 내역 리스트 가져오기
  useEffect(() => {
    if (selectedFieldId && formattedDate) {
      const fetchData = async () => {
        const data = await getReservationList(selectedFieldId, formattedDate);

        setReservationList(data);
      };
      fetchData();
    }
  }, [selectedFieldId, formattedDate]);

  const { data: reservationList } = useQuery({
    queryKey: ['reservations', stadiumId, selectedFieldId, formattedDate],
    queryFn: () => getReservationList(selectedFieldId, formattedDate),
    enabled: !!selectedFieldId && !!formattedDate, // 조건부 요청
  });

  useEffect(() => {
    setReservationList(reservationList);
  }, [reservationList]);

  // 버튼을 눌렀는지에 대한 상태
  const [open, setOpen] = useState(false);

  const selectRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.test}>
      <Header index={2} />
      <div className={styles.reservation}>
        {stadiumDetail &&
        stadiumDetail.images &&
        stadiumDetail.images.length > 0 ? (
          <>
            <div className={styles.banner}>
              <img
                src={stadiumDetail.images[0].image}
                alt=""
                width="450px"
                height="300px"
              />
            </div>

            <div className={styles.introBox}>
              <div className={styles.title}>
                <div>{stadiumDetail.name}</div>
              </div>

              <div className={styles.introText}>
                {stadiumDetail.description}
              </div>
            </div>

            <div
              className={`${styles.infoBox}  ${open ? styles.open : ''}`}
              ref={selectRef}
            >
              <div className={styles.infoHeader}>
                <div>구장 정보</div>
                {open ? (
                  <img
                    src={upArrow}
                    alt=""
                    width="20px"
                    height="20px"
                    onClick={toggleDropdown}
                  ></img>
                ) : (
                  <img
                    src={dropDown}
                    alt=""
                    width="20px"
                    height="20px"
                    onClick={toggleDropdown}
                  ></img>
                )}
              </div>

              <div className={styles.infoGroup}>
                <div className={styles.topInfo}>
                  <div className={styles.isOutside}>
                    {stadiumDetail.isOutside ? '실외' : '실내'}
                  </div>
                  <div className={styles.isParking}>
                    {stadiumDetail.isParking ? '주차 가능' : '주차 불가능'}
                  </div>
                </div>

                <div id={styles.info}>
                  <div className={styles.line}>
                    <img src={locationImg} alt="" width="20px" height="20px" />
                    <div className={styles.info}>{stadiumDetail.location}</div>
                  </div>

                  <div className={styles.line}>
                    <img src={clock} alt="" width="20px" height="20px" />
                    <span className={styles.info}>{stadiumDetail.hours}</span>
                  </div>

                  <div className={styles.line}>
                    <img src={parking} alt="" width="20px" height="20px" />

                    <span className={styles.info}>{stadiumDetail.parking}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}

        <div className={styles.option}>
          <div className={styles.container}>
            <div className={styles.title}>
              <div id={styles.mainTitle}>예약 가능 구장 빠르게 찾기</div>
              <div id={styles.subTitle}>
                내가 원하는 운동 조건을 선택하면 빠르게 예약 가능한 구장을 찾을
                수 있어요!
              </div>
            </div>

            <div className={styles.select}>
              <SelectBtn
                selectList={fieldList}
                selectedOption={isField || ''}
                onOptionChange={handleFieldChange}
              />
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
            </div>
          </div>
        </div>

        <div className={styles.reserveList}>
          <ReservationList
            reserveList={isReservationList}
            queryClient={queryClient}
            stadiumId={stadiumId}
            selectedFieldId={selectedFieldId}
            formattedDate={formattedDate}
          ></ReservationList>

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
        {/* <ReservationModal
          styles={modal}
          ref={modalRef}
          extendRef={modalCheckRef}
          onConfirm={handleReserveConfirm}
        /> */}
        {/* modalCheckRef */}
        {/* <ReservationCheckModal styles={check} ref={modalCheckRef} /> */}
      </div>
      <Footer />
    </div>
  );
};

export default Reservation;
