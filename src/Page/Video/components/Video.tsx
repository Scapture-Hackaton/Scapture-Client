import Header from '../../Header/components/Header';
import Footer from '../../Footer/components/Footer';

// import { test } from '../functions/function';
import styles from '../scss/video.module.scss';
import modal from '../scss/video-modal.module.scss';
// import emptyHeart from '../image/emptyHeart.png';
import fullHeart from '../image/fullHeart.png';
import download from '../image/download.png';
import share from '../image/share.png';
import bookMark from '../image/bookMark.png';
import selectArrow from '../image/selectArrow.png';
import leftArrow from '../image/leftArrow.png';
import rightArrow from '../image/rightArrow.png';
import { useRef } from 'react';
import { modalNotice } from '../functions/ModalFunction';
import { VideoModal } from './VideoModal';

const Video = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  return (
    <div className={styles.test}>
      <Header />
      <div className={styles.community}>
        <div className={styles.videoContainer}>
          <div className={styles.video}></div>
          <div className={styles.group}>
            <div className={styles.title}>BLUE TEAM 1번째 골 영상</div>
            <ul className={styles.icons}>
              <li
                onClick={() => {
                  modalNotice(modalRef);
                  console.log('test');
                }}
              >
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
        <div className={styles.dayVideo}>
          <div className={styles.selectGroup}>
            <div className={styles.selectBox}>
              <p>7월</p>
              <img src={selectArrow} alt="" />
            </div>
            <div className={styles.selectBox}>
              <p>20일</p>
              <img src={selectArrow} alt="" />
            </div>
            <div className={styles.selectBox}>
              <p>A구장</p>
              <img src={selectArrow} alt="" />
            </div>
          </div>

          <div className={styles.dayGroup}>
            <div className={styles.box}>
              <div className={styles.date}>Today</div>
              <div className={styles.date}>10:00~12:00</div>
              <div className={styles.cnt}>12개의 영상</div>
            </div>
            <div className={styles.box}>
              <div className={styles.date}>Today</div>
              <div className={styles.date}>10:00~12:00</div>
              <div className={styles.cnt}>12개의 영상</div>
            </div>
          </div>
        </div>

        <div className={styles.videoList}>
          <div className={styles.container}>
            <div className={styles.video}></div>
            <div className={styles.description}>
              <div className={styles.titles}>
                <div id={styles.first}>1번째</div>
                <div id={styles.second}>골영상</div>
              </div>

              <div className={styles.info}>
                <div>창골축구장(FC서울 축구교실)</div>
                <div>07.10.수 / 10:00~12:00</div>
              </div>
            </div>
          </div>

          <div className={styles.container}>
            <div className={styles.video}></div>
            <div className={styles.description}>
              <div className={styles.titles}>
                <div id={styles.first}>1번째</div>
                <div id={styles.second}>골영상</div>
              </div>

              <div className={styles.info}>
                <div>창골축구장(FC서울 축구교실)</div>
                <div>07.10.수 / 10:00~12:00</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.paging}>
          <img src={leftArrow} alt=""></img>
          <div className={styles.pageNum}>1</div>
          <img src={rightArrow} alt=""></img>
        </div>
        <VideoModal styles={modal} ref={modalRef} />
      </div>
      <Footer />
    </div>
  );
};

export default Video;
