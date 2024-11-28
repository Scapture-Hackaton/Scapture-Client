// import React from 'react';

import { useState } from 'react';
import styles from '../../scss/manager.module.scss';
import Highlights from './Highlights';
import { useParams } from 'react-router-dom';
import ScheduleHighlights from './ScheduleHighlights';
import NaverVideoPlayer from '../../../../common/component/DRMPlayer/NaverVideoPlayer';

const password = `${import.meta.env.VITE_MANAGER_PWD}`;

const Manager = () => {
  const { shceduleId: shceduleIdFromParams } = useParams<{
    shceduleId: string;
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

  return (
    <div className={styles.main}>
      {isChecked ? (
        shceduleIdFromParams ? (
          <ScheduleHighlights
            scheduleId={shceduleIdFromParams}
          ></ScheduleHighlights>
        ) : (
          <Highlights></Highlights>
        )
      ) : (
        <div className={styles.inputPwd}>
          <div className={styles.editDes}>
            <input
              value={isPwd}
              type="password"
              name="name"
              placeholder="비밀번호 입력"
              onChange={handleChange}
            ></input>
          </div>
          <div className={styles.button} onClick={() => checkPwd()}>
            확인
          </div>
          <NaverVideoPlayer
            videoSrc="https://d1yr3xnm7vncof.cloudfront.net/TriggerTest/triggerTest5"
            contentId="triggerTest5"
          ></NaverVideoPlayer>
        </div>
      )}
    </div>
  );
};

export default Manager;
