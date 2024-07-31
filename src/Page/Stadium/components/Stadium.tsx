import Header from '../../Header/components/Header';
import Footer from '../../Footer/components/Footer';

// import stadiumInfoImage from '../image/stadium-info-image.png';
import elementImage from '../image/element-image.png';
import stadiumVideoImage from '../image/stadium-video-image.png';

import styles from '../scss/stadium.module.scss';
import { useLocation } from 'react-router-dom';
import { StadiumDetail } from '../../../apis/dto/scapture.dto';
import { useQuery } from '@tanstack/react-query';
import { getStadiumDetail } from '../../../apis/api/stadium.api';
import { useState } from 'react';
import SelectBtn from './SelectBtn';

const Stadium = () => {
  const location = useLocation();

  const stadiumId = location.state.stadiumId;

  // console.log(stadiumId); // 8

  // 리스트 가져오기
  const { data: stadiumDetail } = useQuery({
    queryKey: ['stadiumDetail', stadiumId],
    queryFn: () => getStadiumDetail(stadiumId),
    initialData: {} as StadiumDetail,
  });

  const today = new Date();
  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 7);

  const monthList = [`${today.getMonth() + 1}월`];
  const dayList = [];
  for (let d = weekAgo.getDate(); d <= today.getDate(); d++) {
    dayList.push(`${d}일`);
  }

  const [isMonth, setMonth] = useState(monthList[0]);
  const [isDay, setDay] = useState(dayList[dayList.length - 1]);

  const handleMonthChange = (month: string) => {
    setMonth(month);
  };

  const handleDayChange = (day: string) => {
    setDay(day);
  };

  return (
    <div className={styles.test}>
      <Header />
      <div className={styles.stadium}>
        {stadiumDetail &&
        stadiumDetail.images &&
        stadiumDetail.images.length > 0 ? (
          <div>
            <div className={styles.banner}>
              <img src={stadiumDetail.images[0].image} alt="" />
            </div>
            <div className={styles.container}>
              <div className={styles.group}>
                <div className={styles.intro}>
                  <div className={styles.title}>
                    <img src={elementImage} alt="" />
                    <span>{stadiumDetail.name}</span>
                  </div>
                  <div className={styles.introText}>
                    <span>{stadiumDetail.description}</span>
                  </div>
                </div>

                <div className={styles.reservationBtn}>
                  <div id={styles.stadium}>구장정보</div>
                  <button id={styles.reservation}>구장 예약</button>
                </div>

                <div className={styles.info}>
                  <div className={styles.group}>
                    <span className={styles.title} id={styles.location}>
                      구장 위치
                    </span>
                    <span className={styles.title} id={styles.location}>
                      운영 시간
                    </span>
                    <span className={styles.title} id={styles.location}>
                      실내/실외
                    </span>
                    <span className={styles.title} id={styles.location}>
                      주차 공간
                    </span>
                  </div>
                  <div className={styles.group}>
                    <span id={styles.info}>{stadiumDetail.location}</span>
                    <span id={styles.info}>{stadiumDetail.hours}</span>
                    <span id={styles.info}>
                      {stadiumDetail.isOutside ? '실외' : '실내'}
                    </span>
                    <span id={styles.info}>{stadiumDetail.parking}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <div className={styles.option}>
          <div className={styles.container}>
            <div className={styles.select}>
              <SelectBtn
                selectList={monthList}
                selectedOption={isMonth}
                onOptionChange={handleMonthChange}
              ></SelectBtn>
              <SelectBtn
                selectList={dayList}
                selectedOption={isDay}
                onOptionChange={handleDayChange}
              ></SelectBtn>

              {/* <SelectBtn
                selectList={dayList}
                selectedOption={isMonth}
                onOptionChange={handleCityChange}
              ></SelectBtn> */}
              {/* <select id={styles.month}>
                <option value="">7월</option>
              </select>
              <select id={styles.day}>
                <option value="">20일</option>
              </select>
              <select id={styles.stadium}>
                <option value="">A구장</option>
              </select> */}
            </div>
          </div>
        </div>
        <div className={styles.video}>
          <div className={styles.container}>
            <div className={styles.group}>
              <div className={styles.contents}>
                <span>Today</span>
                <span>10:00~12:00</span>
                <span>12개의 영상</span>
              </div>
            </div>

            <div className={styles.group}>
              <div className={styles.contents}>
                <span>Today</span>
                <span>10:00~12:00</span>
                <span>12개의 영상</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.videoList}>
          <div className={styles.stadium}>
            <div className={styles.container}>
              <div className={styles.videoImage}>
                <img src={stadiumVideoImage} alt="" />
              </div>
              <div id={styles.video}>
                <div className={styles.info}>
                  <div className={styles.group}>
                    <span id={styles.name}>
                      <b>1번째</b>
                    </span>
                    <span className={styles.title} id={styles.video}>
                      골 영상
                    </span>
                  </div>
                  <div className={styles.group}>
                    <span className={styles.title} id={styles.location}>
                      장골축구장(FC서울 축구교실)
                    </span>
                    <span className={styles.title} id={styles.date}>
                      07.10.수 / 10:00~12:00
                    </span>
                  </div>
                </div>
                {/* css 적용 후 추가 예정 */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Stadium;
