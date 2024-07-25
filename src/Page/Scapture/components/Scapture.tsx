import Header from '../../Header/components/Header';
import Footer from '../../Footer/components/Footer';

import styles from '../scss/scapture.module.scss';

const Scapture = () => {
  return (
    <div className={styles.test}>
      <Header />
      <div className={styles.scapture}>
        <div className={styles.banner}>
          <img src="" alt="" />
          <span>구장을 클릭하면,</span>
          <span>새로운 플레이 그라운드가 열립니다.</span>
        </div>
        <div className={styles.option}>
          <div id={styles.city}></div>
          <div id={styles.local}></div>
          <div id={styles.search}></div>
        </div>
        <div className={styles.stadiumList}>
          <div className={styles.stadium}>
            <div className={styles.stadiumImage}>
              <img src="" alt="" />
            </div>
            <div className={styles.stadiumInfo}>
              <div className={styles.stadium}>
                <span id={styles.title}>구장 위치</span>
                <span id={styles.info}>
                  서울특별시 중구 장충동2가 산14-103번지
                </span>
                {/* css 적용 후 추가 예정 */}
              </div>
            </div>
          </div>
        </div>
        <div>Scapture.tsx</div>
      </div>
      <Footer />
    </div>
  );
};

export default Scapture;
