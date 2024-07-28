import Header from '../../Header/components/Header';
import Footer from '../../Footer/components/Footer';

// import { test } from '../functions/function';
import styles from '../scss/reservation.module.scss';

import testImg from '../image/testImg.png';
import circle from '../image/circle.png';
import selectArrow from '../image/selectArrow.png';
import leftArrow from '../image/leftArrow.png';
import rightArrow from '../image/rightArrow.png';

const Reservation = () => {
  return (
    <div className={styles.test}>
      <Header />
      <div className={styles.reservation}>
        <div className={styles.slider}>
          <img src={testImg} alt="" />
        </div>

        <div className={styles.container}>
          <div className={styles.description}>
            <div className={styles.title}>
              <div className={styles.box}>
                <img src={circle} alt="" />
              </div>
              <p>창골축구장 (FC서울 축구교실)</p>
            </div>
            <div className={styles.introduce}>
              간단한 소개글 들어갈 영역 입니다. 해당 구장은 00소재 인조잔디로
              평탄화 정도가 좋으며 우천시에도 미끄럽지 않고 여름날씨에도
              화상걱정 없이 즐겨 볼 수 있는 잔디입니다.
            </div>
          </div>

          <div className={styles.info}>
            <div className={styles.header}>
              <div className={styles.title}>구장 정보</div>
              <button className={styles.reserve}>구장 예약하기</button>
            </div>

            <div className={styles.contents}>
              <div className={styles.row}>
                <div className={styles.th}>구장 위치</div>
                <div>서울특별시 도봉구 창제1동 산48-13</div>
              </div>

              <div className={styles.row}>
                <div className={styles.th}>운영 시간</div>
                <div>7:00 - 19:00</div>
              </div>

              <div className={styles.row}>
                <div className={styles.th}>실내/실외</div>
                <div>실외</div>
              </div>

              <div className={styles.row}>
                <div className={styles.th}>주차 공간</div>
                <div>주차 가능 (68면) 5분당 150원</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.dayVideo}>
          <div className={styles.selectGroup}>
            <div className={styles.selectBox}>
              <p>7월</p>
              <img src={selectArrow} alt="" />
            </div>
            <div className={styles.selectBox}>
              <p>20일</p>
              <img src={selectArrow} alt="" />
            </div>
            <div className={styles.selectBox}>
              <p>A구장</p>
              <img src={selectArrow} alt="" />
            </div>
          </div>

          <div className={styles.dayGroup}>
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
          </div>
        </div>
        <div className={styles.reserveList}>
          <div className={styles.group}>
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

              <div className={styles.booked}>예약마감</div>
            </div>
          </div>

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

        <div className={styles.paging}>
          <img src={leftArrow} alt=""></img>
          <div className={styles.pageNum}>1</div>
          <img src={rightArrow} alt=""></img>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Reservation;
