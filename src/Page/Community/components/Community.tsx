// import Header from '../../Header/components/Header';
// import Footer from '../../Footer/components/Footer';
import leftFrame from '../image/leftFrame.png';
import rightFrame from '../image/rightFrame.png';
import emptyHeart from '../image/emptyHeart.png';

import styles from '../scss/community.module.scss';

const Community = () => {
  return (
    <div className={styles.test}>
      <div className={styles.community}>
        <div className={styles.popularText}>
          <img src={leftFrame} alt=""></img>
          <span>이번주 인기있는 영상</span>
          <img src={rightFrame} alt=""></img>
        </div>

        <div className={styles.videoContainer}>
          <div className={styles.video}></div>
          <div className={styles.title}>영상 제목</div>
        </div>
        <div className={styles.fieldText}>구장명</div>
        <div className={styles.heart}>
          <img src={emptyHeart} alt="" />
          <div className={styles.cnt}>10</div>
        </div>
      </div>
    </div>
  );
};

export default Community;
