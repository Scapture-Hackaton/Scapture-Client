import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getStadiumDetail } from '../../../apis/api/stadium.api';
import { useRef, useState } from 'react';

import Header from '../../Header/components/Header';
import Footer from '../../Footer/components/Footer';
import StadiumImages from './StadiumImages';
import SelectInfoBox from './SelectInfoBox';

import styles from '../scss/stadium.module.scss';

import { StadiumDetail } from '../../../apis/dto/scapture.dto';

import locationImg from '../../../assets/Icon/location.svg';
import clock from '../../../assets/Icon/Clock.svg';
import parking from '../../../assets/Icon/parking.svg';
import dropDown from '../../../assets/Icon/dropDown.svg';
import upArrow from '../../../assets/Icon/upArrow.svg';

const Stadium = () => {
  // const location = useLocation();
  const { stadiumId: stadiumIdFromParams } = useParams<{ stadiumId: string }>();

  // 상태로 전달된 stadiumId 확인
  // const stadiumIdFromState = location.state?.stadiumId;

  // 상태나 파라미터 중 하나에서 stadiumId를 가져옴
  const stadiumId = parseInt(stadiumIdFromParams!);

  // console.log(stadiumId);

  // 구장 정보 자세히 보기

  // 디테일 버튼을 눌렀는지에 대한 상태
  const [open, setOpen] = useState(false);

  const selectRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const { data: stadiumDetail } = useQuery({
    queryKey: ['stadiumDetail', stadiumId],
    queryFn: () => getStadiumDetail(stadiumId),
    initialData: {} as StadiumDetail,
  });

  return (
    <div className={styles.test}>
      <Header index={2} />
      <div className={styles.stadium}>
        {stadiumDetail &&
        stadiumDetail.images &&
        stadiumDetail.images.length > 0 ? (
          <>
            {/* <div className={styles.banner}>
              <img
                src={stadiumDetail.images[0].image}
                alt=""
                width="450px"
                height="300px"
              />
            </div> */}
            <StadiumImages images={stadiumDetail.images}></StadiumImages>

            <div className={styles.introBox}>
              <div className={styles.title}>
                <div>{stadiumDetail.name}</div>
                {/* <button
                  onClick={() => toReservation(stadiumId)}
                  id={styles.reservation}
                >
                  구장 예약하기
                </button> */}
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
                  {stadiumDetail.condition === 'OVERALL' ? (
                    <>
                      <div className={styles.isOutside}>실내</div>
                      <div className={styles.isOutside}>실외</div>
                    </>
                  ) : stadiumDetail.condition === 'INDOOR' ? (
                    <div className={styles.isOutside}>실내</div>
                  ) : (
                    <div className={styles.isOutside}>실외</div>
                  )}
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

                    <span className={styles.info}>
                      {stadiumDetail?.isFree ? '무료 주차장' : '유료 주차장'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
        <SelectInfoBox
          stadiumDetail={stadiumDetail}
          stadiumId={stadiumId}
          prevSelectDataProps={null}
        ></SelectInfoBox>
      </div>
      <Footer />
    </div>
  );
};

export default Stadium;
