import React, { useState } from 'react';
import styles from '../scss/my-page.module.scss';

import DefaultProfile from '../image/DefaultProfile.svg';

import Clock from '../image/Clock.svg';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { userDataAtom } from '../../Atom/atom';
import { loginDataAtom } from '../../../Header/Atom/atom';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../../../apis/api/mypage.api';

interface UserInfoProps {
  myProfileData: any;
  changeUserInfo: () => void;
}

const UserInfo: React.FC<UserInfoProps> = ({
  myProfileData,
  changeUserInfo,
}) => {
  const navigate = useNavigate();

  const setLoginState = useSetRecoilState(loginDataAtom);
  const resetUserData = useResetRecoilState(userDataAtom);

  const [logout, setLogout] = useState(false);

  const toggleLogout = () => {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('LoginType');
    setLoginState({ state: false });
    resetUserData();

    navigate('/');
  };

  // const toggleWithdraw = async () => {
  // await deleteUser();

  // localStorage.removeItem('TOKEN');
  // localStorage.removeItem('LoginType');
  // setLoginState({ state: false });
  // resetUserData();
  // };

  // // 사용자의 소속팀 입력 값
  // const [isInput, setInput] = useState('');

  // // 데이터 받아온 경우 소속팀에 넣어줄 팀 이름 지정
  // useEffect(() => {
  //   setInput(myProfileData?.data?.team);
  // }, [myProfileData]);

  const profileOption = () => {
    setLogout(!logout);
  };

  //   const handleCityChange = (city: keyof SelectStateType) => {
  //     setSelectedCity(city);
  //     setSelectedRegion(''); // 도시를 변경시 지역 초기화
  //     setCityDropdownOpen(false);
  //   };

  //   const handleRegionChange = (region: string) => {
  //     setSelectedRegion(region);
  //     setRegionDropdownOpen(false);
  //   };

  //   const toggleCityDropdown = () => {
  //     setCityDropdownOpen(!cityDropdownOpen);
  //   };

  //   const toggleRegionDropdown = () => {
  //     setRegionDropdownOpen(!regionDropdownOpen);
  //   };

  return (
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
              onClick={() => changeUserInfo()}
            >
              프로필 편집
            </div>

            <div
              className={styles.dropDownItem}
              onClick={() => navigate('/mypage/account')}
            >
              계정 설정
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
            {myProfileData && myProfileData?.data?.isSubscribe ? (
              <div className={styles.sub}>구독</div>
            ) : (
              <div className={styles.noSub}>비구독</div>
            )}

            <div className={styles.date}>
              {myProfileData && myProfileData?.data?.endDate
                ? `${myProfileData.data.endDate}까지 이용`
                : ''}
            </div>
          </div>
          <div className={styles.profileId}>
            {myProfileData && myProfileData?.data?.name
              ? myProfileData.data.name
              : '000'}
            님
          </div>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.teamContainer}>
          <div className={styles.title}>소속팀</div>

          {myProfileData && myProfileData?.data?.team ? (
            <div className={styles.des}>{myProfileData?.data?.team}</div>
          ) : (
            <div className={`${styles.des} ${styles.noTeam}`}>팀명</div>
          )}

          {/* <div className={styles.description}>스캡쳐</div> */}
        </div>
        <div className={styles.regionContainer}>
          <div className={styles.title}>활동 지역</div>
          <div className={styles.regionDropDown}>
            <div className={styles.userRegion}>
              {myProfileData && myProfileData?.data?.city ? (
                <div className={`${styles.dropdownTitle}`}>
                  {myProfileData.data.city}
                </div>
              ) : (
                <div className={`${styles.dropdownTitle} ${styles.noInfo}`}>
                  도시
                </div>
              )}
            </div>
            <div className={styles.userRegion}>
              {myProfileData && myProfileData?.data?.state ? (
                <div className={`${styles.dropdownTitle}`}>
                  {myProfileData.data.state}
                </div>
              ) : (
                <div className={`${styles.dropdownTitle} ${styles.noInfo}`}>
                  지역
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
