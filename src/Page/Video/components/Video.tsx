import { test } from '../functions/function';
import styles from '../scss/video.module.scss';

const Video = () => {
  return (
    <div className={styles.test}>
      <div>{test()}</div>
      <div>Video.tsx</div>
    </div>
  );
};

export default Video;
