import React from 'react';
import styles from '../../scss/stadium.module.scss';
// import { stadiumDetail } from './test.const';
// import { getManageStadiumDetail } from '../../../../../apis/api/admin.api';
// import { useQuery } from '@tanstack/react-query';
// import { Stadium } from '../../../../../apis/dto/scapture.dto';
import { StadiumDto } from './dto/stadium.dto';
// import { stadiumDetail? } from './test.const';

interface BaseInfoProps {
  stadiumDetail: StadiumDto;
}

const BaseInfo: React.FC<BaseInfoProps> = ({ stadiumDetail }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.mainTitle}>기본 정보</div>
        <div className={styles.change}>수정</div>
      </div>

      <div className={styles.section}>
        <div className={styles.subTitle}>구장명</div>
        <div className={styles.description}>{stadiumDetail?.name}</div>
      </div>
      <div className={styles.section}>
        <div className={styles.subTitle}>위치</div>
        <div className={styles.description}>
          <div className={styles.circle}>{stadiumDetail?.city}</div>
          <div className={styles.circle}>{stadiumDetail?.state}</div>
          <div className={styles.circle}>{stadiumDetail?.location}</div>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.subTitle}>운영시간</div>
        <div className={styles.description}>
          {stadiumDetail?.startTime}~{stadiumDetail?.endTime}
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.subTitle}>주차</div>
        <div className={styles.description}>
          {stadiumDetail?.isParking ? (
            <div className={styles.circle}>가능</div>
          ) : (
            <div className={styles.circle}>불가능</div>
          )}
          {stadiumDetail?.isFree ? (
            <div className={styles.circle}>무료</div>
          ) : (
            <div className={styles.circle}>유료</div>
          )}
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.subTitle}>소개글</div>
        <div className={styles.description}>{stadiumDetail?.description}</div>
      </div>
    </div>
  );
};

export default BaseInfo;
