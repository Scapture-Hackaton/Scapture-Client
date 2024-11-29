import React, { useState } from 'react';
import styles from '../../scss/adminPage.module.scss';

import Clock from '../../../MyPage/image/Clock.svg';
import DefaultProfile from '../../../MyPage/image/DefaultProfile.svg';
import { useNavigate } from 'react-router-dom';
import { loginDataAtom } from '../../../../Header/Atom/atom';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { userDataAtom } from '../../../Atom/atom';
import { deleteUser } from '../../../../../apis/api/mypage.api';

interface ManagerInfoProps {
  myProfileData: any;
  changeUserInfo: () => void;
}

const ManagerInfo: React.FC<ManagerInfoProps> = ({
  myProfileData,
  changeUserInfo,
}) => {
  const navigate = useNavigate();

  const setLoginState = useSetRecoilState(loginDataAtom);
  const resetUserData = useResetRecoilState(userDataAtom);

  const [logout, setLogout] = useState(false);

  const profileOption = () => {
    setLogout(!logout);
  };

  const toggleLogout = () => {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('LoginType');
    setLoginState({ state: false });
    resetUserData();

    navigate('/');
  };

  const toggleWithdraw = async () => {
    await deleteUser([]);

    localStorage.removeItem('TOKEN');
    localStorage.removeItem('LoginType');
    setLoginState({ state: false });
    resetUserData();

    navigate('/');
  };

  return (
    <>
      <div className={styles.frameTitle}>프로필</div>
      <div className={styles.baseInformation}>
        <div className={styles.mainTitle}>
          <div className={styles.boldText}>기본 정보</div>
          <img
            className={styles.image}
            src={Clock}
            alt=""
            onClick={profileOption}
          ></img>
          {logout && (
            <div className={styles.dropDownContainer}>
              {/* 로그아웃/회원탈퇴 로직추가 */}
              <div
                className={styles.dropDownItem}
                onClick={() => toggleLogout()}
              >
                로그아웃
              </div>
              <div
                className={styles.dropDownItem}
                onClick={() => changeUserInfo()}
              >
                프로필 편집
              </div>

              <div
                className={styles.dropDownItem}
                onClick={() => toggleWithdraw()}
              >
                회원탈퇴
              </div>
            </div>
          )}
        </div>
        <div className={styles.subTitle}>
          서비스에 이용되는 프로필을 설정해주세요
        </div>
        <div className={styles.profileContainer}>
          <div className={styles.profileGroup}>
            <img
              className={styles.profileImg}
              src={
                myProfileData?.data?.image
                  ? `${myProfileData.data.image}?timestamp=${new Date().getTime()}`
                  : DefaultProfile
              }
              alt=""
            ></img>
          </div>
          <div className={styles.profile}>
            <div className={styles.subscribe}>
              <div className={styles.badge}>구장 관리자</div>
            </div>
            <div className={styles.profileId}>
              {myProfileData && myProfileData?.data?.name
                ? myProfileData.data.name
                : '000'}
              님
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagerInfo;
