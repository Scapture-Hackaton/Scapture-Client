import Header from '../../Header/components/Header';
import Footer from '../../Footer/components/Footer';

// import { test } from '../functions/function';
import styles from '../scss/video.module.scss';

// import emptyHeart from '../image/emptyHeart.png';
import fullHeart from '../image/fullHeart.png';
import download from '../image/download.png';
import share from '../image/share.png';
import bookMark from '../image/bookMark.png';

const Video = () => {
  return (
    <div className={styles.test}>
      <Header />
      <div className={styles.community}>
        <div className={styles.videoContainer}>
          <div className={styles.video}></div>
          <div className={styles.group}>
            <div className={styles.title}>BLUE TEAM 1번째 골 영상</div>
            <ul className={styles.icons}>
              <li>
                <p>다운로드</p>
                <img src={download} alt=""></img>
              </li>
              <li>
                <img src={share} alt=""></img>
              </li>
              <li>
                <img src={bookMark} alt=""></img>
              </li>
            </ul>
          </div>
          <div className={styles.heart}>
            <img src={fullHeart} alt="" />
            <div className={styles.cnt}>10</div>
          </div>
        </div>

        {/* <div className={styles.subVideoContainer}>
          <div className={styles.video}></div>
          <div className={styles.group}>
            <div className={styles.title}>영상 제목</div>
            <div className={styles.info}>
              <div className={styles.cnt}>조회수 00회</div>
              <p>2024.07.23</p>
            </div>

            <div className={styles.field}>
              <div className={styles.profileImg}>
                <img src={testCircle} alt=""></img>
              </div>
              <div className={styles.name}>구장명</div>
            </div>
          </div>
        </div> */}

        <Footer />
      </div>
    </div>
  );
};

export default Video;
