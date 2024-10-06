import React, { useEffect, useState } from 'react';
import styles from '../../scss/adminPage.module.scss';

import DefaultProfile from '../../../../MyPage/MyPage/image/DefaultProfile.svg';
import EditIcon from '../../../../MyPage/image/EditIcon.png';

import { useSetRecoilState } from 'recoil';
import { userDataAtom } from '../../../Atom/atom';
import { putProfile } from '../../../../../apis/api/mypage.api';
// import { SelectStateType } from '../../../MyPage/const/select.const';
import { userData } from '../../../dto/atom.interface';

interface ManagerInfoProps {
  myProfileData: any;
  changeUserInfo: () => void;
}
const EditProfile: React.FC<ManagerInfoProps> = ({
  myProfileData,
  changeUserInfo,
}) => {
  const [profileChanges, setProfileChanges] = useState<{
    name?: string;
    image?: File | string;
  }>({});

  // 이미지 미리보기
  const [previewImage, setPreviewImage] = useState<string | null>(
    `${myProfileData.data.image}?timestamp=${new Date().getTime()}` ||
      DefaultProfile,
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

  const [isInput, setInput] = useState('');

  // 데이터 받아온 경우 이름 지정
  useEffect(() => {
    setInput(myProfileData?.data?.name);
  }, [myProfileData]);

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    console.log(e.target.value);

    if (e.target.value !== myProfileData?.data?.name) {
      setProfileChanges(prev => ({ ...prev, name: e.target.value }));
    } else {
      setProfileChanges(prev => {
        const { name, ...rest } = prev;
        return rest;
      });
    }
  };

  // 엔터를 눌렀을 경우에도 작성이 가능하도록
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && isInput !== '') {
      fetchSearchResults();
      setInput(myProfileData?.data?.name);
    }
  };

  const setProfile = useSetRecoilState<userData>(userDataAtom);

  const fetchSearchResults = async () => {
    if (Object.keys(profileChanges).length > 0) {
      const formData = new FormData();

      // 변경된 값만 폼 데이터에 추가
      if (profileChanges.name) formData.append('name', profileChanges.name);
      if (profileChanges.image) formData.append('image', profileChanges.image); // 실제 이미지 파일 추가

      const data = await putProfile(formData);

      if (data?.status === 200) {
        changeUserInfo(); // 프로필 변경사항 반영
        setProfile((prev: any) => ({
          ...prev,
          image: data?.data?.image || prev.image, // 서버에서 반환된 새로운 이미지 URL로 상태 업데이트
        }));
      }
    } else {
      alert('변경 사항이 없습니다.');
      changeUserInfo();
    }
  };

  return (
    <>
      <div className={styles.frameTitle}>프로필</div>
      <div className={styles.baseInformation}>
        <div className={styles.mainTitle}>
          <div className={styles.boldText}>기본 정보</div>
          <div id={styles.complete} onClick={fetchSearchResults}>
            완료
          </div>
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
              <div className={styles.badge}>구장 관리지</div>
            </div>
            <div className={styles.profileId}>
              <div className={styles.editDes}>
                <input
                  type="text"
                  placeholder="이름 입력"
                  onChange={changeInput}
                  onKeyPress={handleKeyPress}
                  value={isInput ?? ''}
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
