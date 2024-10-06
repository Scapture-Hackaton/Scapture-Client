import React, { useEffect, useRef, useState } from 'react';
import styles from '../../scss/stadium.module.scss';

import io, { Socket } from 'socket.io-client';

import DownArrow from '../../../../../assets/Icon/dropDown.svg';
import { field } from '../Stadium/dto/field.dto';

import infoIcon from '../../../../../assets/Icon/infoIcon.svg';
import noDataIcon from '../../../../../assets/Icon/noDataIcon.svg';
import { startRecording } from '../../../../../apis/api/admin.api';

interface CameraControlProps {
  fields: field[];
}

const timeList = ['10', '20', '30'];

const CameraControl: React.FC<CameraControlProps> = ({ fields }) => {
  // 페이지에 보여줄 시간
  const [timer, setTimer] = useState(0);

  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedFieldId, setSelectedFieldId] = useState<number | null>(null);

  const selectField = (fieldId: number, fieldName: string) => {
    setSelectedField(fieldName);
    setSelectedFieldId(fieldId);
  };

  const [selectedTime, setselectedTime] = useState<string | null>(null);

  const selectTime = (time: string) => {
    setselectedTime(time);
  };

  const [fieldDropdownOpen, setFieldDropdownOpen] = useState<boolean>(false);
  const fieldDropdownRef = useRef<HTMLDivElement>(null);

  const toggleFieldDropdown = () => {
    setFieldDropdownOpen(!fieldDropdownOpen);
  };

  const [timeDropdownOpen, setTimeDropdownOpen] = useState<boolean>(false);
  const timeDropdownRef = useRef<HTMLDivElement>(null);

  const toggleTimeDropdown = () => {
    setTimeDropdownOpen(!timeDropdownOpen);
  };

  // 화면 밖 클릭 시 모달 닫기
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        fieldDropdownRef.current &&
        !fieldDropdownRef.current.contains(event.target as Node)
      ) {
        setFieldDropdownOpen(false);
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
        setFieldDropdownOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscPress);
    return () => {
      document.removeEventListener('keydown', handleEscPress);
    };
  }, []);

  const [isActive, setActive] = useState<boolean>(false);

  // 구역 ID
  const fieldId = 0;
  const [socket, setSocket] = useState<Socket | null>(null);

  // 사용자가 설정한 시간
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const newSocket = io('http://localhost:3000');

    setSocket(newSocket);
    setDuration(2000);

    newSocket.emit('join', fieldId, (err: any) => {
      if (err) console.log(err);
    });

    // newSocket.emit('join_court', fieldId);

    // const handleUpdateTimer = (data: any) => {
    //   if (data.fieldId === fieldId) {
    //     setTimer(data.time);
    //   }
    // };

    newSocket.on('update_timer', (remainingTime: number) => {
      setTimer(remainingTime);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [fieldId]);

  const startTimer = () => {
    if (socket) {
      // socket이 null이 아닐 때만 emit 호출
      socket.emit('start_timer', { fieldId, duration });
    }
  };

  // 타이머 형식 00 : 00
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.cameraFrame}>
      <div className={styles.cameraTitle}>
        <div id={styles.expain}>
          <div id={styles.title}>카메라 제어</div>
          <div id={styles.subTitle}>녹화시간을 설정하고 촬영을 시작하세요</div>
        </div>
        <div className={styles.regionDropDown}>
          <div
            className={styles.editRegion}
            onClick={toggleFieldDropdown}
            ref={fieldDropdownRef}
          >
            <div className={styles.dropdownTitle}>
              {selectedField !== null ? selectedField : '구역 선택'}
            </div>
            <img className={styles.dropdownImg} src={DownArrow}></img>
            {fieldDropdownOpen && (
              <div className={styles.dropdownMenu}>
                {fields?.map((field: field) => (
                  <div
                    key={field.fieldId}
                    className={styles.dropdownItem}
                    // onClick={() =>
                    //   handleCityChange(city as keyof SelectStateType)
                    // }
                    onClick={() => selectField(field.fieldId, field.name)}
                  >
                    {field.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.cameraSection}>
        <div className={styles.recordLine}>
          <div id={styles.recordTitle}>
            <div>녹화 시간 설정</div>
            <span>*</span>
            <img src={infoIcon} alt="" width="16px" height="16px" />
          </div>
          <div className={styles.regionDropDown}>
            <div
              className={styles.editField}
              onClick={toggleTimeDropdown}
              ref={timeDropdownRef}
            >
              <div className={styles.dropdownTitle}>
                {selectedTime !== null ? `${selectedTime}분` : '시간'}
              </div>
              <img className={styles.dropdownImg} src={DownArrow}></img>
              {timeDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  {timeList?.map((time: string, idx: number) => (
                    <div
                      key={idx}
                      className={styles.dropdownItem}
                      // onClick={() =>
                      //   handleCityChange(city as keyof SelectStateType)
                      // }
                      onClick={() => selectTime(time)}
                    >
                      {time}분
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {isActive ? (
          <div id={styles.recordBtn} className={styles.recording}>
            {formatTime(timer)} 녹화중
          </div>
        ) : (
          <div
            id={styles.recordBtn}
            className={styles.active}
            onClick={() => {
              if (selectedFieldId != null && selectedTime !== null) {
                startRecording(selectedFieldId, selectedTime);
                startTimer();
              }
            }}
          >
            녹화 시작하기
          </div>
        )}
      </div>

      <div className={styles.cameraTitle}>
        <div id={styles.expain}>
          <div id={styles.title}>녹화된 영상</div>
          <div id={styles.subTitle}>현재까지 녹화된 영상이에요</div>
        </div>
      </div>
      <div className={styles.noData}>
        <img
          src={noDataIcon}
          alt="검색 결과가 없습니다."
          width="180px"
          height="180px"
        />
        <div>검색 결과가 없어요</div>
      </div>
    </div>
  );
};

export default CameraControl;
