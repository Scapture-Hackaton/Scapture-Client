import React from 'react';
import styles from '../scss/scapture.module.scss';
import { Stadium } from '../../../apis/dto/scapture.dto';
import { useNavigate } from 'react-router-dom';

import location from '../image/location.svg';
import clock from '../image/Clock.svg';
import parking from '../image/parking.svg';

interface StadiumsProps {
  stadiumData: Stadium[];
}

const Stadiums: React.FC<StadiumsProps> = ({ stadiumData }) => {
  const navigate = useNavigate();

  const toStadiumPage = (stadiumId: number) => {
    navigate('/stadium', { state: { stadiumId } });
  };

  return (
    <>
      {stadiumData == null ||
      stadiumData.length <= 0 ||
      typeof stadiumData == 'undefined' ? (
        <div className={styles.noData}>조회된 데이터가 없습니다.</div>
      ) : (
        stadiumData.map(stadium => (
          <div
            className={styles.stadiumList}
            key={stadium.stadiumId}
            onClick={() => toStadiumPage(stadium.stadiumId)}
          >
            <div className={styles.stadium}>
              <div className={styles.stadiumImage}>
                <img src={stadium.image} alt="" width="180px" height="140px" />
              </div>
              <div className={styles.stadiumInfo}>
                <div className={styles.stadium}>
                  <div className={styles.topInfo}>
                    <div className={styles.isOutside}>
                      {stadium.isOutside ? '실외' : '실내'}
                    </div>
                    <div className={styles.isParking}>
                      {stadium.isOutside ? '주차 가능' : '주차 불가능'}
                    </div>
                  </div>

                  <span id={styles.name}>{stadium.name}</span>

                  <div id={styles.info}>
                    <div className={styles.line}>
                      <img src={location} alt="" width="16px" height="16px" />
                      <div className={styles.info}>{stadium.location}</div>
                    </div>

                    <div className={styles.line}>
                      <img src={clock} alt="" width="16px" height="16px" />
                      <span className={styles.info}>{stadium.hours}</span>
                    </div>

                    <div className={styles.line}>
                      <img src={parking} alt="" width="16px" height="16px" />

                      <span className={styles.info}>{stadium.parking}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default Stadiums;
