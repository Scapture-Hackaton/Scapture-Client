import Header from '../../Header/components/Header';
import Footer from '../../Footer/components/Footer';

import { test } from '../functions/function';
import styles from '../scss/video.module.scss';

const Video = () => {
  return (
    <div className={styles.test}>
      <Header />
      <div>{test()}</div>
      <div>Video.tsx</div>
      <Footer />
    </div>
  );
};

export default Video;
