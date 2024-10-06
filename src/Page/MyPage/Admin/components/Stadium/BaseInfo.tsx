import React from 'react';
import styles from '../../scss/stadium.module.scss';
import { dummy } from './test.const';
// import { getManageStadiumDetail } from '../../../../../apis/api/admin.api';
// import { useQuery } from '@tanstack/react-query';
// import { dummy } from './test.const';

interface BaseInfoProps {
  stadiumId: number;
}

const BaseInfo: React.FC<BaseInfoProps> = ({ stadiumId }) => {
  //   const { data: stadiumDetail } = useQuery({
  //     queryKey: ['stadiumDetail'],
  //     queryFn: () => getManageStadiumDetail(9),
  //   });

  console.log(stadiumId);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.mainTitle}>기본 정보</div>
        <div className={styles.change}>수정</div>
      </div>

      <div className={styles.section}>
        <div className={styles.subTitle}>구장명</div>
        <div className={styles.description}>{dummy.data.stadium.name}</div>
      </div>
      <div className={styles.section}>
        <div className={styles.subTitle}>위치</div>
        <div className={styles.description}>
          <div className={styles.circle}>{dummy.data.stadium.city}</div>
          <div className={styles.circle}>{dummy.data.stadium.state}</div>
          <div className={styles.circle}>{dummy.data.stadium.location}</div>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.subTitle}>운영시간</div>
        <div className={styles.description}>
          {dummy.data.stadium.startTime}:00~{dummy.data.stadium.endTime}:00
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.subTitle}>주차</div>
        <div className={styles.description}>
          {dummy?.data?.stadium?.isParking ? (
            <div className={styles.circle}>가능</div>
          ) : (
            <div className={styles.circle}>불가능</div>
          )}
          {dummy?.data?.stadium?.isFree ? (
            <div className={styles.circle}>무료</div>
          ) : (
            <div className={styles.circle}>유료</div>
          )}
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.subTitle}>소개글</div>
        <div className={styles.description}>
          {dummy.data.stadium.description}
        </div>
      </div>
    </div>
  );
};

export default BaseInfo;
