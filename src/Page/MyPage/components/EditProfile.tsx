import React from 'react';
import styles from '../scss/edit-profile.module.scss';
import pencil from '../image/pencil.png';
// import profileImg from '../image/profile.webp';

const EditProfile = () => {
  return (
    <div className={styles.test}>
      <div className={styles.editProfile}>
        <div className={styles.profile}>
          <div className={styles.container}>
            <div className={styles.image_box}>
              <div className={styles.box}>
                {/* <img className={styles.image} src={profileImg} alt="" /> */}
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
                    placeholder="이름"
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
                    placeholder="소속팀"
                  ></input>
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
                    placeholder="활동지역"
                  ></input>
                  {/* <div className={styles.value}>활동지역</div> */}
                  <div className={styles.edit}>수정</div>
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <div className={styles.cancel}>취소</div>
              <div className={styles.save}>저장하기</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
