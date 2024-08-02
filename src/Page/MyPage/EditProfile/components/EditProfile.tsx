// import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userData } from '../../dto/atom.interface';
import { userDataAtom } from '../../Atom/atom';

import styles from '../scss/edit-profile.module.scss';
import profileImgDefault from '../../image/scapture-logo.png';
import pencil from '../../image/pencil.png';
import { putProfile } from '../../../../apis/api/mypage.api';

// import profileImg from '../image/profile.webp';

const EditProfile = () => {
  const profileData = {
    name: '김동우',
    team: 'test',
    location: 'where',
  };
  const imageFile = new File(
    [
      'http://t1.kakaocdn.net/account_images/default_profile.jpeg.twg.thumb.R640x640',
    ],
    'filename.png',
    { type: 'image/png' },
  );

  const [isProfile, setProfile] = useRecoilState<userData>(userDataAtom);
  // setProfile(prev => ({
  //   ...prev,
  //   endDate: res.data.endDate,
  //   image: res.data.image,
  //   location: res.data.location,
  //   name: res.data.name,
  //   role: res.data.role,
  //   team: res.data.team,
  // }));
  return (
    <div className={styles.test}>
      <div className={styles.editProfile}>
        <div className={styles.profile}>
          <div className={styles.container}>
            <div className={styles.image_box}>
              <div className={styles.box}>
                <img
                  className={styles.image}
                  src={isProfile.image ?? profileImgDefault}
                  alt="SCAPTURE"
                />
              </div>
              <div className={styles.modify}>
                <img className={styles.pencil} src={pencil} alt=""></img>
              </div>
            </div>
          </div>
          <div className={styles.table}>
            <div className={styles.header}>기본정보</div>

            <div className={styles.info}>
              <div className={styles.row}>
                <div className={styles.label}>이름</div>

                <div className={styles.input}>
                  <input
                    className={styles.value}
                    type="text"
                    // placeholder="이름"
                    placeholder={isProfile.name}
                    // value={isProfile.name}
                    onInput={e => {
                      setProfile(prev => ({
                        ...prev,
                        name: e.currentTarget.value,
                      }));
                    }}
                  ></input>
                  {/* <div className={styles.value}>이름</div>*/}
                  <div className={styles.edit}>수정</div>
                </div>
              </div>

              <hr></hr>

              <div className={styles.row}>
                <div className={styles.label}>소속팀</div>

                <div className={styles.input}>
                  <input
                    className={styles.value}
                    type="text"
                    // placeholder="소속팀"
                    placeholder={isProfile.team}
                    // value={isProfile.team}
                    onInput={e => {
                      setProfile(prev => ({
                        ...prev,
                        team: e.currentTarget.value,
                      }));
                    }}
                  />
                  {/* <div className={styles.value}>소속팀</div>*/}
                  <div className={styles.edit}>수정</div>
                </div>
              </div>

              <hr></hr>

              <div className={styles.row}>
                <div className={styles.label}>활동지역</div>

                <div className={styles.input}>
                  <input
                    className={styles.value}
                    type="text"
                    // placeholder="활동지역"
                    placeholder={isProfile.location}
                    // value={isProfile.location}
                    onInput={e => {
                      setProfile(prev => ({
                        ...prev,
                        location: e.currentTarget.value,
                      }));
                    }}
                  />
                  {/* <div className={styles.value}>활동지역</div> */}
                  <div className={styles.edit}>수정</div>
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <div className={styles.cancel}>취소</div>
              <div
                className={styles.save}
                onClick={() => {
                  putProfile(isProfile, imageFile);
                }}
              >
                저장하기
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
