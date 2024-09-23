import React from 'react';

import styles from '../scss/main.module.scss';

import location from '../../../assets/Icon/location.svg';
import clock from '../../../assets/Icon/Clock.svg';
import parking from '../../../assets/Icon/parking.svg';

interface BlurInfoBoxProps {
  mainData: any;
}

const BlurInfoBox: React.FC<BlurInfoBoxProps> = ({ mainData }) => {
  return (
    <>
      <div
        className={styles.blurInfo1}
        // onClick={() => toStadiumPage(mainData.randomStadiums[0].stadiumId)}
      >
        <div className={styles.stadium}>
          <div className={styles.stadiumImage}>
            <img
              src={mainData.randomStadiums[0].image}
              alt=""
              width="160px"
              height="125px"
            />
          </div>
          <div className={styles.stadiumInfo}>
            <div className={styles.stadium}>
              <div className={styles.topInfo}>
                <div className={styles.isOutside}>
                  {mainData.randomStadiums[0].isOutside ? '실외' : '실내'}
                </div>
                <div className={styles.isParking}>
                  {mainData.randomStadiums[0].isParking
                    ? '주차 가능'
                    : '주차 불가능'}
                </div>
              </div>

              <span id={styles.name}>{mainData.randomStadiums[0].name}</span>

              <div id={styles.info}>
                <div className={styles.line}>
                  <img src={location} alt="" width="12px" height="12px" />
                  <div className={styles.info}>
                    {mainData.randomStadiums[0].location}
                  </div>
                  {/* <div className={styles.info}>한성대학교</div> */}
                </div>

                <div className={styles.line}>
                  <img src={clock} alt="" width="12px" height="12px" />
                  <span className={styles.info}>
                    {mainData.randomStadiums[0].hours}
                  </span>
                  {/* <span className={styles.info}>10:00~24:00</span> */}
                </div>

                <div className={styles.line}>
                  <img src={parking} alt="" width="12px" height="12px" />

                  <span className={styles.info}>
                    {mainData.randomStadiums[0].parking}
                  </span>
                  {/* <span className={styles.info}>유료 주차</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={styles.blurInfo2}
        // onClick={() => toStadiumPage(mainData.randomStadiums[0].stadiumId)}
      >
        <div className={styles.stadium}>
          <div className={styles.stadiumImage}>
            <img
              src={mainData.randomStadiums[0].image}
              alt=""
              width="160px"
              height="125px"
            />
          </div>
          <div className={styles.stadiumInfo}>
            <div className={styles.stadium}>
              <div className={styles.topInfo}>
                <div className={styles.isOutside}>
                  {mainData.randomStadiums[0].isOutside ? '실외' : '실내'}
                </div>
                <div className={styles.isParking}>
                  {mainData.randomStadiums[0].isParking
                    ? '주차 가능'
                    : '주차 불가능'}
                </div>
              </div>

              <span id={styles.name}>{mainData.randomStadiums[0].name}</span>

              <div id={styles.info}>
                <div className={styles.line}>
                  <img src={location} alt="" width="12px" height="12px" />
                  <div className={styles.info}>
                    {mainData.randomStadiums[0].location}
                  </div>
                  {/* <div className={styles.info}>한성대학교</div> */}
                </div>

                <div className={styles.line}>
                  <img src={clock} alt="" width="12px" height="12px" />
                  <span className={styles.info}>
                    {mainData.randomStadiums[0].hours}
                  </span>
                  {/* <span className={styles.info}>10:00~24:00</span> */}
                </div>

                <div className={styles.line}>
                  <img src={parking} alt="" width="12px" height="12px" />

                  <span className={styles.info}>
                    {mainData.randomStadiums[0].parking}
                  </span>
                  {/* <span className={styles.info}>유료 주차</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlurInfoBox;
