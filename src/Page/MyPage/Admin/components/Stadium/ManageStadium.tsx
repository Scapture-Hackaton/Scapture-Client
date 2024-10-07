import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import styles from '../../scss/stadium.module.scss';
import Footer from '../../../../Footer/components/Footer';
import Header from '../../../../Header/components/Header';
import BaseInfo from './BaseInfo';
import StadiumImgs from './StadiumImgs';
import Fields from './Fields';
// import { dummy } from './test.const';
import { getManageStadiumDetail } from '../../../../../apis/api/admin.api';
import { useQuery } from '@tanstack/react-query';
import CameraControl from '../Camera/CameraControl';

const ManageStadium = () => {
  const location = useLocation();

  const stadiumId = location.state.stadiumId;

  console.log(stadiumId);

  const { data: stadiumDetail, refetch } = useQuery({
    queryKey: ['stadiumDetail'],
    queryFn: () => getManageStadiumDetail(stadiumId),
  });

  console.log(stadiumDetail);

  useEffect(() => {
    const refreshData = async () => {
      await refetch();
    };

    refreshData();
  }, [stadiumId]);

  // 0 구장 관리 / 1 은 예약 관리
  const [isPageOpt, setPageOpt] = useState(0);

  // 0 프로필 관리 / 1 카메라 제어
  const [isProfileAndCamera, setProfileAndCamera] = useState(0);

  return (
    <>
      <Header index={0}></Header>
      <div className={styles.test}>
        <div className={styles.myPageContainer}>
          <div id={styles.nav}>
            <div id={styles.option}>
              <div
                className={isPageOpt === 0 ? `${styles.selected}` : ''}
                onClick={() => setPageOpt(0)}
              >
                구장 관리
              </div>
              <div
                className={isPageOpt === 1 ? `${styles.selected}` : ''}
                onClick={() => setPageOpt(1)}
              >
                예약 관리
              </div>
            </div>
          </div>

          <div id={styles.profileAndCamera}>
            <div
              className={isProfileAndCamera === 0 ? `${styles.selected}` : ''}
              onClick={() => setProfileAndCamera(0)}
            >
              구장 프로필
            </div>
            <div
              className={isProfileAndCamera === 1 ? `${styles.selected}` : ''}
              onClick={() => setProfileAndCamera(1)}
            >
              카메라 제어
            </div>
          </div>
          {isProfileAndCamera === 0 && stadiumDetail !== null ? (
            <>
              <BaseInfo stadiumDetail={stadiumDetail?.data?.stadium}></BaseInfo>
              <StadiumImgs
                stadiumImages={stadiumDetail?.data?.stadiumImages}
              ></StadiumImgs>
              <div className={styles.fieldSection}>
                <div className={styles.frameTitle}>
                  <div id={styles.name}>
                    <div>보유 구역</div>
                    <div id={styles.fieldCnt}>
                      {stadiumDetail?.data?.fields?.length
                        ? `${stadiumDetail?.data?.fields?.length}`
                        : '0'}
                    </div>
                  </div>
                  <div id={styles.change}>수정</div>
                </div>
                <Fields fieldData={stadiumDetail?.data?.fields}></Fields>
              </div>
            </>
          ) : (
            <CameraControl fields={stadiumDetail?.data?.fields}></CameraControl>
          )}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default ManageStadium;
