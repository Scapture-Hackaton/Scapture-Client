import styles from '../scss/main.module.scss';

import stadiumEx from '../image/stadiumEx.jpeg';

import location from '../../../assets/Icon/location.svg';
import clock from '../../../assets/Icon/Clock.svg';
import parking from '../../../assets/Icon/parking.svg';

const BlurInfoBox = () => {
  return (
    <div>
      <div className={styles.blurInfo1}>
        <div className={styles.stadium}>
          <div className={styles.stadiumImage}>
            <img src={stadiumEx} alt="" width="160px" height="125px" />
          </div>
          <div className={styles.stadiumInfo}>
            <div className={styles.stadium}>
              <div className={styles.topInfo}>
                <div className={styles.isOutside}>실외</div>
                <div className={styles.isParking}>주차 가능</div>
              </div>

              <span id={styles.name}>한성대 풋살장</span>

              <div id={styles.info}>
                <div className={styles.line}>
                  <img src={location} alt="" width="12px" height="12px" />
                  <div className={styles.info}>
                    서울특별시 성북구 삼선교로16길 116
                  </div>
                </div>

                <div className={styles.line}>
                  <img src={clock} alt="" width="12px" height="12px" />
                  <span className={styles.info}>00:00~24:00</span>
                </div>

                <div className={styles.line}>
                  <img src={parking} alt="" width="12px" height="12px" />

                  <span className={styles.info}>
                    유료 주차(일 최대 15,000원)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.blurInfo2}>
        <div className={styles.stadium}>
          <div className={styles.stadiumImage}>
            <img src={stadiumEx} alt="" width="160px" height="125px" />
          </div>
          <div className={styles.stadiumInfo}>
            <div className={styles.stadium}>
              <div className={styles.topInfo}>
                <div className={styles.isOutside}>실외</div>
                <div className={styles.isParking}>주차 가능</div>
              </div>

              <span id={styles.name}>한성대 풋살장</span>

              <div id={styles.info}>
                <div className={styles.line}>
                  <img src={location} alt="" width="12px" height="12px" />
                  <div className={styles.info}>
                    서울특별시 성북구 삼선교로16길 116
                  </div>
                </div>

                <div className={styles.line}>
                  <img src={clock} alt="" width="12px" height="12px" />
                  <span className={styles.info}>00:00~24:00</span>
                </div>

                <div className={styles.line}>
                  <img src={parking} alt="" width="12px" height="12px" />

                  <span className={styles.info}>
                    유료 주차(일 최대 15,000원)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlurInfoBox;
