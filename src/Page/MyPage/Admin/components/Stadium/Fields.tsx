import React from 'react';
// import styles from '../../scss/stadium.module.scss';
import styles from './scss/Fields.module.scss';

import { useNavigate } from 'react-router-dom';

// import clock from '../../../../assets/Icon/Clock.svg';
import noDataIcon from '../../../../../assets/Icon/noDataIcon.svg';
import { field } from './dto/field.dto';
import PeopleIcon from '../../../../../assets/Icon/peopleIcon.svg';
import CoinIcon from '../../../../../assets/Icon/CoinIcon.svg';

import TestImg from '../../../image/test.png';

interface StadiumsProps {
  fieldData: field[];
}

const Fields: React.FC<StadiumsProps> = ({ fieldData }) => {
  const navigate = useNavigate();

  const toStadiumPage = (fieldId: number) => {
    navigate('/admin/stadium', { state: { fieldId } });
  };

  return (
    <div className={styles.container}>
      {fieldData == null ||
      fieldData?.length <= 0 ||
      typeof fieldData == 'undefined' ? (
        <div className={styles.noData}>
          <img
            src={noDataIcon}
            alt="구장이 존재하지 않습니다."
            width="180px"
            height="180px"
          />
          <div>구장이 존재하지 않습니다.</div>
        </div>
      ) : (
        fieldData.map(stadium => (
          <div
            className={styles.stadiumList}
            key={stadium.fieldId}
            onClick={() => toStadiumPage(stadium.fieldId)}
          >
            <div className={styles.stadium}>
              <div className={styles.stadiumImage}>
                {stadium?.image ? (
                  <img
                    src={stadium?.image}
                    alt=""
                    width="180px"
                    height="140px"
                  />
                ) : (
                  <img src={TestImg} alt="" width="180px" height="140px" />
                )}
              </div>
              <div className={styles.stadiumInfo}>
                <div className={styles.stadium}>
                  <div className={styles.topInfo}>
                    {stadium.isOutside ? (
                      <div className={styles.isOutside}>실외</div>
                    ) : (
                      <div className={styles.isOutside}>실내</div>
                    )}
                  </div>

                  <div id={styles.name}>{stadium.name}</div>

                  <div id={styles.info}>
                    <div className={styles.line}>
                      <img src={PeopleIcon} alt="" width="16px" height="16px" />
                      <div className={styles.info}>{stadium.type}</div>
                    </div>

                    <div className={styles.line}>
                      <img src={CoinIcon} alt="" width="16px" height="16px" />
                      <span className={styles.info}>
                        {stadium?.price?.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Fields;
