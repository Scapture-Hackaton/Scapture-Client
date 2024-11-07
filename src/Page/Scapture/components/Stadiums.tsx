import React from 'react';
import styles from '../scss/scapture.module.scss';
import { Stadium } from '../../../apis/dto/scapture.dto';
import { useNavigate } from 'react-router-dom';

import location from '../../../assets/Icon/location.svg';
import clock from '../../../assets/Icon/Clock.svg';
import parking from '../../../assets/Icon/parking.svg';
import noDataIcon from '../../../assets/Icon/noDataIcon.svg';

import TestImg from '../../../assets/image/test.png';

interface StadiumsProps {
  stadiumData: Stadium[];
}

const Stadiums: React.FC<StadiumsProps> = ({ stadiumData }) => {
  const navigate = useNavigate();

  const toStadiumPage = (stadiumId: number) => {
    navigate(`/stadium/${stadiumId}`);
  };

  return (
    <>
      {stadiumData == null ||
      stadiumData.length <= 0 ||
      typeof stadiumData == 'undefined' ? (
        <div className={styles.noData}>
          <img
            src={noDataIcon}
            alt="검색 결과가 없습니다."
            width="180px"
            height="180px"
          />
          <div>검색 결과가 없어요</div>
        </div>
      ) : (
        stadiumData.map(stadium => (
          <div
            className={styles.stadiumList}
            key={stadium.stadiumId}
            onClick={() => toStadiumPage(stadium.stadiumId)}
          >
            <div className={styles.stadium}>
              <div className={styles.stadiumImage}>
                {stadium?.image ? (
                  <img
                    src={stadium.image}
                    alt=""
                    width="180px"
                    height="140px"
                  />
                ) : (
                  <img src={TestImg} alt="" width="180px" height="140px" />
                )}
              </div>
              <div className={styles.stadiumInfo}>
                <div className={styles.stadium}>
                  <div className={styles.topInfo}>
                    {stadium.condition === 'OVERALL' ? (
                      <>
                        <div className={styles.isOutside}>실내</div>
                        <div className={styles.isOutside}>실외</div>
                      </>
                    ) : stadium.condition === 'INDOOR' ? (
                      <div className={styles.isOutside}>실내</div>
                    ) : (
                      <div className={styles.isOutside}>실외</div>
                    )}

                    <div className={styles.isParking}>
                      {stadium.isParking ? '주차 가능' : '주차 불가능'}
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

                      <span className={styles.info}>
                        {stadium?.isFree ? '무료 주차징' : '유료 주차장'}
                      </span>
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
