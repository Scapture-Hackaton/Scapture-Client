import { useState } from 'react';
import styles from '../../scss/manager.module.scss';

import Highlights from './Highlights';
import UserInfoManage from './UserInfoManage';

const ManagerOptPage = () => {
  const [isOpt, setOpt] = useState<number>(0);

  const classifyPage = () => {
    if (isOpt === 0) {
      return <Highlights></Highlights>;
    } else if (isOpt === 1) {
      return <UserInfoManage></UserInfoManage>;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div
          className={
            isOpt === 0 ? `${styles.selected} ${styles.item}` : `${styles.item}`
          }
          onClick={() => {
            setOpt(0);
          }}
        >
          하이라이트 추출 내역
        </div>
        <div
          className={
            isOpt === 1 ? `${styles.selected} ${styles.item}` : `${styles.item}`
          }
          onClick={() => {
            setOpt(1);
          }}
        >
          사용자 조회
        </div>
      </div>

      {classifyPage()}
    </div>
  );
};

export default ManagerOptPage;
