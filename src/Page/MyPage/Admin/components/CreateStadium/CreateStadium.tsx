import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';

import styles from '../../scss/createStadium.module.scss';
import Footer from '../../../../Footer/components/Footer';
import Header from '../../../../Header/components/Header';
import EditBasicInfo from '../EditStadium/EditBasicInfo';

// import { dummy } from '../Stadium/test.const';

const CreateStadium = () => {
  //   const location = useLocation();

  //   const stadiumId = location.state.stadiumId;

  // 0 구장 관리 / 1 은 예약 관리
  const [isPageOpt, setPageOpt] = useState(0);

  // 0 프로필 관리 / 1 카메라 제어
  const [isProfileAndCamera, setProfileAndCamera] = useState(0);

  return (
    <>
      <Header index={0}></Header>
      <div className={styles.test}>
        <div className={styles.myPageContainer}>
          <div id={styles.nav}>
            <div id={styles.option}>
              <div
                className={isPageOpt === 0 ? `${styles.selected}` : ''}
                onClick={() => setPageOpt(0)}
              >
                구장 관리
              </div>
              <div
                className={isPageOpt === 1 ? `${styles.selected}` : ''}
                onClick={() => setPageOpt(1)}
              >
                예약 관리
              </div>
            </div>
          </div>

          <div id={styles.profileAndCamera}>
            <div
              className={isProfileAndCamera === 0 ? `${styles.selected}` : ''}
              onClick={() => setProfileAndCamera(0)}
            >
              구장 프로필
            </div>
            <div
              className={isProfileAndCamera === 1 ? `${styles.selected}` : ''}
              onClick={() => setProfileAndCamera(1)}
            >
              카메라 제어
            </div>
          </div>

          <div className={styles.alert}>
            <div className={`${styles.chapter} ${styles.active}`}>
              <div className={styles.numIcon}>1</div>
              <div className={styles.numInfo}>기본 정보</div>
            </div>
            <div className={styles.chapter}>
              <div className={styles.numIcon}>2</div>
              <div className={styles.numInfo}>구장 이미지</div>
            </div>
            <div className={styles.chapter}>
              <div className={styles.numIcon}>3</div>
              <div className={styles.numInfo}>보유 구역</div>
            </div>
          </div>

          <EditBasicInfo></EditBasicInfo>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default CreateStadium;
