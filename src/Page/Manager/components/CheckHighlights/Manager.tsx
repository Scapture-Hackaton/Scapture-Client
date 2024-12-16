// import React from 'react';

import { useState } from 'react';
import styles from '../../scss/manager.module.scss';
import { useParams } from 'react-router-dom';
import ScheduleHighlights from './ScheduleHighlights';
import ManagerOptPage from './ManagerOptPage';
import UserDetailInfo from './UserDetailInfo';

const password = `${import.meta.env.VITE_MANAGER_PWD}`;

const Manager = () => {
  const { shceduleId: shceduleIdFromParams, userId: userIdFromParams } =
    useParams<{
      shceduleId: string;
      userId: string;
    }>();

  const [isPwd, setPwd] = useState<string>('');
  const [isChecked, setChecked] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setPwd(value);
  };

  const checkPwd = () => {
    if (isPwd == password) {
      setChecked(true);
    }
  };

  // 엔터를 눌렀을 경우에도 댓글 작성이 가능하도록
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (isPwd === password) {
        setChecked(true);
      } else {
        setPwd('');
      }
    }
  };

  const checkParams = () => {
    if (shceduleIdFromParams) {
      return (
        <ScheduleHighlights
          scheduleId={shceduleIdFromParams}
        ></ScheduleHighlights>
      );
    } else if (userIdFromParams) {
      return <UserDetailInfo userId={userIdFromParams}></UserDetailInfo>;
    } else {
      return <ManagerOptPage></ManagerOptPage>;
    }
  };

  return (
    <div className={styles.main}>
      {isChecked ? (
        checkParams()
      ) : (
        <div className={styles.inputPwd}>
          <div className={styles.editDes}>
            <input
              value={isPwd}
              type="password"
              name="name"
              placeholder="비밀번호 입력"
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            ></input>
          </div>
          <div className={styles.button} onClick={() => checkPwd()}>
            확인
          </div>
        </div>
      )}
    </div>
  );
};

export default Manager;
