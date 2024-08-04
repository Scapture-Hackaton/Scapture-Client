import React, { useEffect, useState } from 'react';
import styles from '../scss/video.module.scss';
import bookMark from '../image/bookMark.png';
import storedBookmark from '../image/storedBookmark.png';

interface BookMarkProps {
  stored: boolean;
  onToggleStore: (isStore: boolean) => void;
}

const BookMark: React.FC<BookMarkProps> = ({ stored, onToggleStore }) => {
  const [isStored, setStored] = useState<boolean>(stored);

  useEffect(() => {
    setStored(stored);
  }, [stored]);

  return (
    <>
      {isStored ? (
        <img
          src={storedBookmark}
          alt="liked"
          onClick={() => onToggleStore(isStored)}
          className={styles.onBookmark}
        />
      ) : (
        <img
          src={bookMark}
          onClick={() => onToggleStore(isStored)}
          alt="not liked"
        />
      )}
    </>
  );
};

export default BookMark;
