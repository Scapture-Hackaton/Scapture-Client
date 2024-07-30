import React from 'react';
import styles from '../scss/scapture.module.scss';
import { Stadium } from '../../../apis/dto/scapture.dto';

interface StadiumsProps {
  stadiumData: Stadium[];
}

const Stadiums: React.FC<StadiumsProps> = ({ stadiumData }) => {
  return (
    <>
      {stadiumData == null
        ? null
        : stadiumData.map(stadium => (
            <div className={styles.stadiumList} key={stadium.stadiumId}>
              <div className={styles.stadium}>
                <div className={styles.stadiumImage}>
                  <img src={stadium.image} alt="" />
                </div>
                <div className={styles.stadiumInfo}>
                  <div className={styles.stadium}>
                    <span id={styles.name}>{stadium.name}</span>
                    <div className={styles.info}>
                      <div>
                        <span className={styles.title} id={styles.location}>
                          구장 위치
                        </span>
                        <span id={styles.info}>{stadium.location}</span>
                      </div>
                      <div>
                        <span className={styles.title} id={styles.location}>
                          운영 시간
                        </span>
                        <span id={styles.info}>{stadium.hours}</span>
                      </div>
                      <div>
                        <span className={styles.title} id={styles.location}>
                          실내/실외
                        </span>
                        <span id={styles.info}>
                          {stadium.isOutside ? '실외' : '실내'}
                        </span>
                      </div>
                      <div>
                        <span className={styles.title} id={styles.location}>
                          주차 공간
                        </span>
                        <span id={styles.info}>{stadium.parking}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
    </>
  );
};

export default Stadiums;
