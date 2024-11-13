// import React from 'react';

import { useState } from 'react';
import styles from '../scss/manager.module.scss';
import Highlights from './Highlights';

const password = `${import.meta.env.VITE_MANAGER_PWD}`;

const Manager = () => {
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
        <Highlights></Highlights>
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
        </div>
      )}
    </div>
  );
};

export default Manager;
