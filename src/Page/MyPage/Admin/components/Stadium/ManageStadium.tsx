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
import EditBasicInfo from '../EditStadium/EditBasicInfo';
import EditField from '../EditStadium/EditField';
import EditImage from '../EditStadium/EditImage';
import { FieldDto } from './dto/field.dto';

const ManageStadium = () => {
  const location = useLocation();

  const stadiumId = location.state.stadiumId;

  const { data: stadiumDetail, refetch } = useQuery({
    queryKey: ['stadiumDetail'],
    queryFn: () => getManageStadiumDetail(stadiumId),
  });

  useEffect(() => {
    const refreshData = async () => {
      refetch();
    };

    refreshData();
  }, [stadiumId]);

  // 0 구장 관리 / 1 은 예약 관리
  const [isPageOpt, setPageOpt] = useState(0);

  // 0 프로필 관리 / 1 카메라 제어
  const [isProfileAndCamera, setProfileAndCamera] = useState(0);

  // 기본 정보 수정하기
  const [isChangeFirst, setChangeFirst] = useState(false);
  const changeFirst = () => {
    setChangeFirst(!isChangeFirst);
  };

  const createdStadiumId = () => {
    const refreshData = async () => {
      await refetch();
    };

    refreshData();
  };

  const changeInfo = (chaptrer: string) => {
    if (chaptrer === 'first') {
      setChangeFirst(!isChangeFirst);
      refetch();
    } else if (chaptrer === 'second') {
      setChangeSecond(!isChangeSecond);
      refetch();
    } else if (chaptrer === 'third') {
      setChangeThird(!isChangeThird);
      refetch();
    }
  };

  // 이미지 수정하기 수정하기
  const [isChangeSecond, setChangeSecond] = useState(false);
  const changeSecond = () => {
    setChangeSecond(!isChangeSecond);
  };

  const [isChangeThird, setChangeThird] = useState(false);

  const [selectedFieldData, setSelectedFieldData] = useState<FieldDto | null>(
    null,
  );

  const selectField = (field: FieldDto) => {
    setSelectedFieldData(field);
    setChangeThird(!isChangeThird);
  };

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
              {isChangeFirst ? (
                <EditBasicInfo
                  nextStep={changeInfo}
                  createdStadiumId={createdStadiumId}
                  type="EDIT"
                  stadiumData={stadiumDetail?.data?.stadium}
                ></EditBasicInfo>
              ) : (
                <BaseInfo
                  stadiumDetail={stadiumDetail?.data?.stadium}
                  changeFirst={changeFirst}
                ></BaseInfo>
              )}

              {isChangeSecond ? (
                <EditImage
                  nextStep={changeInfo}
                  isStadiumId={stadiumId}
                  stadiumImages={stadiumDetail?.data?.stadiumImages}
                  type="EDIT"
                ></EditImage>
              ) : (
                <StadiumImgs
                  stadiumImages={stadiumDetail?.data?.stadiumImages}
                  changeSecond={changeSecond}
                ></StadiumImgs>
              )}

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
                  {isChangeThird ? null : <div id={styles.change}>수정</div>}
                </div>
              </div>
              {isChangeThird ? (
                <EditField
                  nextStep={changeInfo}
                  isStadiumId={stadiumId}
                  selectedFieldData={selectedFieldData}
                  type="EDIT"
                ></EditField>
              ) : (
                <Fields
                  fieldData={stadiumDetail?.data?.fields}
                  selectField={selectField}
                ></Fields>
              )}
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
