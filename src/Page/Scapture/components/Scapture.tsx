import Header from '../../Header/components/Header';
import Footer from '../../Footer/components/Footer';

import bannerImage from '../image/banner-image.png';
import stadiumImage from '../image/stadium-image.png';
import searchImage from '../image/search-image.png';
import styles from '../scss/scapture.module.scss';

const Scapture = () => {
  return (
    <div className={styles.test}>
      <Header />
      <div className={styles.scapture}>
        <div className={styles.banner}>
          <img src={bannerImage} alt="" />
          <div className={styles.bannerText}>
            <span>구장을 클릭하면,</span>
            <span>새로운 플레이 그라운드가 열립니다.</span>
          </div>
        </div>
        <div className={styles.option}>
          <div className={styles.container}>
            <div className={styles.select}>
              <select id={styles.city}>
                <option value="">도시</option>
              </select>
              <select id={styles.local}>
                <option value="">지역</option>
              </select>
            </div>
            <div id={styles.search}>
              <input type="text" />
              <div id={styles.searchImage}>
                <img src={searchImage} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.stadiumList}>
          <div className={styles.stadium}>
            <div className={styles.stadiumImage}>
              <img src={stadiumImage} alt="" />
            </div>
            <div className={styles.stadiumInfo}>
              <div className={styles.stadium}>
                <span id={styles.name}>장충테니스장</span>
                <div className={styles.info}>
                  <div>
                    <span className={styles.title} id={styles.location}>
                      구장 위치
                    </span>
                    <span id={styles.info}>
                      서울특별시 중구 장충동2가 산14-103번지
                    </span>
                  </div>
                  <div>
                    <span className={styles.title} id={styles.location}>
                      운영 시간
                    </span>
                    <span id={styles.info}>7:00 ~ 19:00</span>
                  </div>
                  <div>
                    <span className={styles.title} id={styles.location}>
                      실내/실외
                    </span>
                    <span id={styles.info}>실외</span>
                  </div>
                  <div>
                    <span className={styles.title} id={styles.location}>
                      주차 공간
                    </span>
                    <span id={styles.info}>주차 가능(66면) 5분당 150원</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.stadiumList}>
          <div className={styles.stadium}>
            <div className={styles.stadiumImage}>
              <img src={stadiumImage} alt="" />
            </div>
            <div className={styles.stadiumInfo}>
              <div className={styles.stadium}>
                <span id={styles.name}>장충테니스장</span>
                <div className={styles.info}>
                  <div>
                    <span className={styles.title} id={styles.location}>
                      구장 위치
                    </span>
                    <span id={styles.info}>
                      서울특별시 중구 장충동2가 산14-103번지
                    </span>
                  </div>
                  <div>
                    <span className={styles.title} id={styles.location}>
                      운영 시간
                    </span>
                    <span id={styles.info}>7:00 ~ 19:00</span>
                  </div>
                  <div>
                    <span className={styles.title} id={styles.location}>
                      실내/실외
                    </span>
                    <span id={styles.info}>실외</span>
                  </div>
                  <div>
                    <span className={styles.title} id={styles.location}>
                      주차 공간
                    </span>
                    <span id={styles.info}>주차 가능(66면) 5분당 150원</span>
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

export default Scapture;
