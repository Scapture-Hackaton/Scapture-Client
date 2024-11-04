import React, { useEffect } from 'react';
import styles from '../scss/clipboard.module.scss';
import InfoIcon from '../../assets/Icon/InfoIcon2.svg';

interface ClipBoardProps {
  visible: boolean;
  onHide: () => void;
}

const ClipBoard: React.FC<ClipBoardProps> = ({ visible, onHide }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => onHide(), 2000); // 2초 후 사라짐
      return () => clearTimeout(timer);
    }
  }, [visible, onHide]);

  return (
    <div className={`${styles.clipboardModal} ${visible ? styles.show : ''}`}>
      <img
        src={InfoIcon}
        alt="Info"
        width="14px"
        height="14px"
        loading="lazy"
      />
      <div>링크가 클립보드에 복사되었습니다.</div>
    </div>
  );
};

export default ClipBoard;
