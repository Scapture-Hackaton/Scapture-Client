import Header from '../../Header/components/Header';
import Footer from '../../Footer/components/Footer';

import BannerImage from '../image/banner-image.png';
import IntroImage from '../image/intro-image.png';
import CheckBox from '../image/checkbox.png';
import StadiumImage from '../image/stadium-image.png';
import VideoImage from '../image/video-image.png';
import InfoImageA from '../image/info-image-a.png';
import InfoImageB from '../image/info-image-b.png';
// import EffectRight from '../image/effect-right.png';
// import EffectLeft from '../image/effect-left.png';
import styles from '../scss/main.module.scss';

const Main = () => {
  return (
    <div className={styles.test}>
      <Header />
      <div className={styles.main}>
        <div className={styles.banner}>
          <img src={BannerImage} alt="" />
        </div>
        <div className={styles.container}>
          <div className={styles.intro}>
            <div>
              <div className={styles.introText}>
                <span>몸만 와서 운동만 하세요!</span>
                <div>
                  <span id={styles.yellow}> 촬영, 편집, 업로드</span>
                  <span>는</span>
                </div>
                <span>SCAPTURE가 해드릴게요!</span>
              </div>
              <div className={styles.object}>
                <img src={IntroImage} alt="introImage" />
              </div>
            </div>
          </div>
          <div className={styles.stadium}>
            <div className={styles.group}>
              <div id={styles.checkbox}>
                <img src={CheckBox} alt="checkbox-image" />
              </div>
              <div className={styles.about}>
                <span>내가 원하는 구장에서 운동하고</span>
                <span>언제 어디서든 운동 영상을 손쉽게 확인해보고</span>
                <span>다운로드하세요.</span>
              </div>
            </div>
            <div className={styles.images}>
              <img src={StadiumImage} alt="stadium-image" />
            </div>
          </div>

          <div className={styles.video}>
            <span id={styles.content}>인기 동영상</span>
            <img src={VideoImage} alt="" />
            <div id={styles.group}>
              <div className={styles.name}>
                <span id={styles.title}>경기장 이름</span>
                <span id={styles.date}>경기 진행 일시</span>
              </div>
              <div className={styles.detail}>
                <span id={styles.title}>난지천공원인조잔디축구장</span>
                <span id={styles.date}>07.10.수 / 10:00~12:00</span>
              </div>
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.group}>
              <div id={styles.effect}>
                {/* <div>
                  <img src={EffectLeft} alt="" />
                </div> */}
                <span>제휴 구장</span>
                {/* <div>
                  <img src={EffectRight} alt="" />
                </div> */}
              </div>
              <div className={styles.images}>
                <div>
                  <img src={InfoImageA} alt="" />
                  <div>장충테스장</div>
                </div>
                <div>
                  <img src={InfoImageB} alt="" />
                  <div>수락산스포츠타운야구장</div>
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
