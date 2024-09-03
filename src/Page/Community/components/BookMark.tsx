import React, { useEffect, useState } from 'react';
import styles from '../scss/community.module.scss';
import bookMark from '../../../assets/Icon/bookMarkIcon.svg';
import storedBookmark from '../../../assets/Icon/bookMarkIcon.svg';

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
          width="20px"
          height="20px"
        />
      ) : (
        <img
          src={bookMark}
          onClick={() => onToggleStore(isStored)}
          alt="not liked"
          width="20px"
          height="20px"
        />
      )}
      <p>저장</p>
    </>
  );
};

export default BookMark;
