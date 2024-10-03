import React, { useEffect, useRef, useState } from 'react';
import styles from '../scss/my-page.module.scss';

import DefaultProfile from '../image/DefaultProfile.svg';
import DownArrow from '../image/downArrow.svg';
import EditIcon from '../../image/EditIcon.png';

import { putProfile } from '../../../../apis/api/mypage.api';
import { selectState, SelectStateType } from '../const/select.const';

interface EditProfileProps {
  myProfileData: any;
  changeUserInfo: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({
  myProfileData,
  changeUserInfo,
}) => {
  const [selectedCity, setSelectedCity] = useState<keyof SelectStateType | ''>(
    myProfileData?.data?.city || '',
  );
  const [selectedRegion, setSelectedRegion] = useState(
    myProfileData?.data?.state || '',
  );
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);

  // 이미지 미리보기
  const [previewImage, setPreviewImage] = useState<string | null>(
    myProfileData?.data?.image || DefaultProfile,
  );

  // 파일 선택 시 미리보기 업데이트
  // 이미지 변경 핸들러
  //   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = event.target.files?.[0];
  //     if (file) {
  //       const previewUrl = URL.createObjectURL(file);
  //       setPreviewImage(previewUrl); // 미리보기 업데이트
  //       setProfileChanges(prev => ({
  //         ...prev,
  //         image: file, // 이미지가 변경되었을 때만 저장
  //       }));
  //     }
  //   };
  // 이미지 변경 핸들러
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file); // 미리보기 URL 생성
      setPreviewImage(previewUrl); // 미리보기 업데이트
      setProfileChanges(prev => ({
        ...prev,
        image: file, // 선택한 파일 저장
      }));
    }
  };

  // 도시 / 지역 모달 ref
  const cityDropdownRef = useRef<HTMLDivElement>(null);
  const regionDropdownRef = useRef<HTMLDivElement>(null);

  // 화면 밖 클릭 시 모달 닫기
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        cityDropdownRef.current &&
        !cityDropdownRef.current.contains(event.target as Node)
      ) {
        setCityDropdownOpen(false);
      }

      if (
        regionDropdownRef.current &&
        !regionDropdownRef.current.contains(event.target as Node)
      ) {
        setRegionDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // ESC 키 눌렀을 때 모달 닫기
  useEffect(() => {
    const handleEscPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setCityDropdownOpen(false);
        setRegionDropdownOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscPress);
    return () => {
      document.removeEventListener('keydown', handleEscPress);
    };
  }, []);

  // 사용자의 소속팀 입력 값
  const [isInput, setInput] = useState('');
  // 변경된 소속팀만 업데이트
  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (e.target.value !== myProfileData?.data?.team) {
      setProfileChanges(prev => ({ ...prev, team: e.target.value }));
    } else {
      setProfileChanges(prev => {
        const { team, ...rest } = prev;
        return rest;
      });
    }
  };

  // 데이터 받아온 경우 소속팀에 넣어줄 팀 이름 지정
  useEffect(() => {
    setInput(myProfileData?.data?.team);
  }, [myProfileData]);

  // 엔터를 눌렀을 경우에도 작성이 가능하도록
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && isInput !== '') {
      fetchSearchResults();
      setInput(myProfileData?.data?.team);
    }
  };

  // 사용자가 변경한 값들을 저장할 변수
  //   const [profileChanges, setProfileChanges] = useState<{
  //     team?: string;
  //     city?: keyof SelectStateType;
  //     state?: string;
  //     image?: File;
  //   }>({});
  const [profileChanges, setProfileChanges] = useState<{
    team?: string;
    city?: keyof SelectStateType;
    state?: string;
    image?: File;
  }>({});

  // 수정하기
  //   const fetchSearchResults = async () => {
  //     if (Object.keys(profileChanges).length > 0) {
  //       if (previewImage) {
  //         const formData = new FormData();
  //         formData.append('image', previewImage);

  //         const data = await putProfile(profileChanges, formData);

  //         if (data?.status == 200) {
  //           changeUserInfo();
  //         }
  //       } else {
  //         const data = await putProfile(profileChanges, null);

  //         if (data?.status == 200) {
  //           changeUserInfo();
  //         }
  //       }
  //     } else {
  //       alert('변경 사항이 없습니다.');
  //     }
  //   };
  const fetchSearchResults = async () => {
    if (Object.keys(profileChanges).length > 0) {
      const formData = new FormData();

      // 변경된 값만 폼 데이터에 추가
      if (profileChanges.team) formData.append('team', profileChanges.team);
      if (profileChanges.city) formData.append('city', profileChanges.city);
      if (profileChanges.state) formData.append('state', profileChanges.state);
      if (profileChanges.image) formData.append('image', profileChanges.image); // 실제 이미지 파일 추가

      const data = await putProfile(formData);

      if (data?.status === 200) {
        changeUserInfo(); // 프로필 변경사항 반영
      }
    } else {
      alert('변경 사항이 없습니다.');
    }
  };

  // 도시 변경
  const handleCityChange = (city: keyof SelectStateType) => {
    setSelectedCity(city);
    setSelectedRegion(selectState[city][0]); // 도시를 변경시 지역 초기화
    setCityDropdownOpen(false);
    if (city !== myProfileData?.data?.city) {
      setProfileChanges(prev => ({
        ...prev,
        city,
        state: selectState[city][0],
      }));
    } else {
      setProfileChanges(prev => {
        const { city, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleRegionChange = (state: string) => {
    setSelectedRegion(state);
    setRegionDropdownOpen(false);
    if (state !== myProfileData?.data?.state) {
      setProfileChanges(prev => ({ ...prev, state }));
    } else {
      setProfileChanges(prev => {
        const { state, ...rest } = prev;
        return rest;
      });
    }
  };

  const toggleCityDropdown = () => {
    setCityDropdownOpen(!cityDropdownOpen);
  };

  const toggleRegionDropdown = () => {
    setRegionDropdownOpen(!regionDropdownOpen);
  };

  return (
    <div className={styles.baseInformation}>
      <div className={styles.mainTitle}>
        <div className={styles.boldText}>기본 정보</div>
      </div>
      <div className={styles.subTitle}>
        서비스에 이용되는 프로필을 설정해주세요
      </div>
      <div className={styles.profileContainer}>
        <div className={styles.profileGroup}>
          <img
            className={styles.editProfileImg}
            src={previewImage ?? DefaultProfile}
            alt=""
            width="120px"
            height="120px"
          ></img>

          <div
            className={styles.overlay}
            onClick={() => document.getElementById('imageUpload')?.click()}
          >
            <img
              src={EditIcon}
              alt="Edit"
              className={styles.editButton}
              width="24px"
              height="24px"
            />
          </div>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
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

          <div className={styles.editDes}>
            <input
              type="text"
              placeholder="소속팀을 입력해주세요."
              onChange={changeInput}
              onKeyPress={handleKeyPress}
              value={isInput ?? ''}
            ></input>
          </div>

          {/* <div className={styles.description}>스캡쳐</div> */}
        </div>
        <div className={styles.regionContainer}>
          <div className={styles.title}>활동 지역</div>
          <div className={styles.regionDropDown}>
            <div
              className={styles.editRegion}
              onClick={toggleCityDropdown}
              ref={cityDropdownRef}
            >
              <div className={styles.dropdownTitle}>
                {selectedCity === '' ? '도시' : selectedCity}
              </div>
              <img className={styles.dropdownImg} src={DownArrow}></img>
              {cityDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  {Object.keys(selectState).map((city: string, idx: number) => (
                    <div
                      key={idx}
                      className={styles.dropdownItem}
                      onClick={() =>
                        handleCityChange(city as keyof SelectStateType)
                      }
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div
              className={styles.editRegion}
              onClick={toggleRegionDropdown}
              ref={regionDropdownRef}
              // disabled={!selectedCity}
            >
              <div className={styles.dropdownTitle}>
                {/* {selectedRegion || '지역'} */}
                {selectedRegion === '' ? '지역' : selectedRegion}
              </div>
              <img className={styles.dropdownImg} src={DownArrow}></img>
              {regionDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  {selectedCity !== '' &&
                    selectState[selectedCity].length > 0 &&
                    selectState[selectedCity].map((region: string) => (
                      <div
                        key={region}
                        className={styles.dropdownItem}
                        onClick={() => handleRegionChange(region)}
                      >
                        {region}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className={styles.changeInfo}
        onClick={() => {
          changeUserInfo();
          fetchSearchResults();
        }}
      >
        수정하기
      </div>
    </div>
  );
};

export default EditProfile;
