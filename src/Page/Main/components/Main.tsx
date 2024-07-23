import Header from '../../Header/components/Header';
import Footer from '../../Footer/components/Footer';

// import { test } from '../functions/function';
import styles from '../scss/main.module.scss';
import banner from '../scss/banner.module.scss';

const Main = () => {
  return (
    <div>
      <Header />
      <div className={styles.main}>
        <div className={banner.banner}>
          <div className={banner.object}>
            <div id={banner.right}></div>
            <div id={banner.blank}>
              <div>test</div>
            </div>
            <div id={banner.left}></div>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.intro}>
            <div className={styles.introText}>
              <span>몸만 와서 운동만 하세요!</span>
              <span>촬영, 편집, 업로드</span>
              <span>는</span>
              <span>SCAPTURE가 해드릴게요!</span>
            </div>
            <div>
              <img className={styles.object} />
            </div>
          </div>
          <div className={styles.stadium}>
            <div className={styles.group}>
              <div>
                <img id={styles.checkbox}></img>
              </div>
              <span className={styles.about}>
                내가 원하는 구장에서 운동하고 언제 어디서든 운동 영상을 손쉽게
                확인해보고 다운로드하세요.
              </span>
            </div>
            <div className={styles.images}>
              <img src="" alt="" />
            </div>
          </div>
          <div className={styles.video}>
            <span>인기 동영상</span>
            <div className={styles.object}>
              <img src="" alt="" />
            </div>
            <div className={styles.stadiumName}>
              <span>경기장 이름</span>
              <span></span>
            </div>
            <div className={styles.stadiumDate}>
              <span>경기 진행 일시</span>
              <span></span>
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.group}>
              <span>제휴 구장</span>
              <div className={styles.images}>
                <div>
                  <img src="" alt="" />
                  <span>장충테스장</span>
                </div>
                <div>
                  <img src="" alt="" />
                  <span>수락산스포츠타운야구장</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
