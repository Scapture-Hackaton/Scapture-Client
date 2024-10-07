import { useState } from 'react';
// import { useLocation } from 'react-router-dom';

import styles from '../../scss/createStadium.module.scss';
import Footer from '../../../../Footer/components/Footer';
import Header from '../../../../Header/components/Header';
import EditBasicInfo from '../EditStadium/EditBasicInfo';

import DoneIcon from '../../../../../assets/Icon/doneIcon.png';
import EditImage from '../EditStadium/EditImage';
import EditField from '../EditStadium/EditField';

// import { dummy } from '../Stadium/test.const';

const CreateStadium = () => {
  //   const location = useLocation();

  //   const stadiumId = location.state.stadiumId;

  // 0 구장 관리 / 1 은 예약 관리
  const [isPageOpt, setPageOpt] = useState(0);

  // 0 프로필 관리 / 1 카메라 제어
  const [isProfileAndCamera, setProfileAndCamera] = useState(0);

  const [isStadiumId, setStadiumId] = useState<number | null>(null);

  const createdStadiumId = (stadiumId: number) => {
    setStadiumId(stadiumId);
  };

  // 생성 완료 여부를 위한 state
  const [isProgress, setProgress] = useState({
    first: false,
    second: false,
    third: false,
  });

  const [isNow, setNow] = useState('first');

  const nextStep = (chapter: string) => {
    if (chapter === 'first') {
      setProgress((prev: any) => ({
        ...prev,
        first: true,
      }));
      setNow('second');
    } else if (chapter === 'second') {
      setProgress((prev: any) => ({
        ...prev,
        second: true,
      }));
      setNow('third');
    } else {
      setProgress((prev: any) => ({
        ...prev,
        third: true,
      }));
    }
  };

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
            <div
              className={`${styles.chapter} ${isProgress.first ? styles.done : isNow === 'first' ? styles.active : ''}`}
            >
              <div className={styles.numIcon}>
                {isProgress.first ? (
                  <img src={DoneIcon} alt="" width="13px" height="10px"></img>
                ) : (
                  '1'
                )}
              </div>
              <div className={styles.numInfo}>기본 정보</div>
            </div>
            <div
              className={`${styles.chapter} ${isProgress.second ? styles.done : isNow === 'second' ? styles.active : ''}`}
            >
              <div className={styles.numIcon}>
                {isProgress.second ? (
                  <img src={DoneIcon} alt="" width="13px" height="10px"></img>
                ) : (
                  '2'
                )}
              </div>
              <div className={styles.numInfo}>구장 이미지</div>
            </div>
            <div
              className={`${styles.chapter} ${isProgress.third ? styles.done : isNow === 'third' ? styles.active : ''}`}
            >
              <div className={styles.numIcon}>
                {isProgress.third ? (
                  <img src={DoneIcon} alt="" width="13px" height="10px"></img>
                ) : (
                  '3'
                )}
              </div>
              <div className={styles.numInfo}>보유 구역</div>
            </div>
          </div>

          {isNow === 'first' ? (
            <EditBasicInfo
              nextStep={nextStep}
              createdStadiumId={createdStadiumId}
            ></EditBasicInfo>
          ) : null}

          {isNow === 'second' ? (
            <EditImage
              nextStep={nextStep}
              isStadiumId={isStadiumId}
            ></EditImage>
          ) : null}

          {isNow === 'third' ? (
            <EditField
              nextStep={nextStep}
              isStadiumId={isStadiumId}
            ></EditField>
          ) : null}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default CreateStadium;
