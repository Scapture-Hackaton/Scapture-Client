import Header from '../../Header/components/Header';
import Footer from '../../Footer/components/Footer';

import stadiumInfoImage from '../image/stadium-info-image.png';
import elementImage from '../image/element-image.png';
import stadiumVideoImage from '../image/stadium-video-image.png';

import styles from '../scss/stadium.module.scss';

import { useQuery } from '@tanstack/react-query';
import { getStadiumDetail } from '../../../apis/api/stadium.api';
import { StadiumDetail } from '../../../apis/dto/stadium.dto';

const Stadium = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['stadium', 3],
    queryFn: () => getStadiumDetail(3),
  });

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  const stadium: StadiumDetail = data.data;

  console.log(stadium);

  return (
    <div className={styles.test}>
      <Header />
      <div className={styles.stadium}>
        <div>
          <div className={styles.banner}>
            <img src={stadiumInfoImage} alt="" />
          </div>
          <div className={styles.container}>
            <div className={styles.group}>
              <div className={styles.intro}>
                <div className={styles.title}>
                  <img src={elementImage} alt="" />
                  <span>창골축구장 (FC서울 축구교실)</span>
                </div>
                <div className={styles.introText}>
                  <span>
                    {/* 간단한 소개글 들어갈 영역 입니다. 해당 구장은 00소재
                    인조잔디로 평탄화 정도가 좋으며 우천시에도 미끄럽지 않고
                    여름날씨에도 화상걱정 없이 즐겨 볼 수 있는 잔디입니다. */}
                    {stadium.description}
                  </span>
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
                  <span id={styles.info}>
                    서울특별시 중구 장충동2가 산14-103번지
                  </span>
                  <span id={styles.info}>7:00 ~ 19:00</span>
                  <span id={styles.info}>실외</span>
                  <span id={styles.info}>주차 가능(66면) 5분당 150원</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.option}>
          <div className={styles.container}>
            <div className={styles.select}>
              <select id={styles.month}>
                <option value="">7월</option>
              </select>
              <select id={styles.day}>
                <option value="">20일</option>
              </select>
              <select id={styles.stadium}>
                <option value="">A구장</option>
              </select>
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
