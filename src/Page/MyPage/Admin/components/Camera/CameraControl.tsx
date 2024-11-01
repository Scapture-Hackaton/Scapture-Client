import React, { useEffect, useRef, useState } from 'react';
import styles from '../../scss/stadium.module.scss';

import io, { Socket } from 'socket.io-client';

import DownArrow from '../../../../../assets/Icon/dropDown.svg';
import { FieldDto } from '../Stadium/dto/field.dto';

import infoIcon from '../../../../../assets/Icon/infoIcon.svg';
import noDataIcon from '../../../../../assets/Icon/noDataIcon.svg';
import {
  startRecording,
  stopRecording,
} from '../../../../../apis/api/admin.api';

interface CameraControlProps {
  fields: FieldDto[];
}

const SOCKET_SERVER_IP = `${import.meta.env.VITE_SOCKET_SERVER_IP}`;

const timeList: number[] = [];

for (let i = 10; i <= 180; i += 10) {
  timeList.push(i);
}

const CameraControl: React.FC<CameraControlProps> = ({ fields }) => {
  // 페이지에 보여줄 시간
  const [timer, setTimer] = useState(0);

  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedFieldId, setSelectedFieldId] = useState<number | null>(null);

  const selectField = (fieldId: number, fieldName: string) => {
    setSelectedField(fieldName);
    setSelectedFieldId(fieldId);
  };

  const [selectedTime, setSelectedTime] = useState<number | null>(null);

  const selectTime = (time: number) => {
    setSelectedTime(time);
  };

  // 선택되었는지 확인
  useEffect(() => {
    if (selectedField !== null && selectedTime !== null) {
      setActive(true);
    } else if (selectedField == null || selectedTime == null) {
      setActive(false);
    }
  }, [selectedField, selectedTime]);

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
  const [isRecording, setRecording] = useState<boolean>(false);

  const [socket, setSocket] = useState<Socket | null>(null);

  // 사용자가 설정한 시간
  //   const [duration, setDuration] = useState(0);

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_IP);

    setSocket(newSocket);

    // 사용자가 구역에 접속할 때 서버에 알림
    newSocket.emit('join', selectedFieldId, (err: any) => {
      if (err) console.log(err);
    });

    // 타이머 시작 이벤트
    newSocket.on('timer_started', ({ timerActive }) => {
      setRecording(timerActive);
    });

    // 타이머 종료 이벤트
    newSocket.on('timerEnded', () => {
      setTimer(0);
      setActive(false);
      setRecording(false);
    });

    // 남은 시간 업데이트 이벤트
    newSocket.on('update_timer', (remainingTime: number) => {
      setTimer(remainingTime);
    });

    // 녹화 상태와 남은 시간을 받는 이벤트
    newSocket.on('isRecording', ({ timerActive, remainingTime }) => {
      setRecording(timerActive);

      if (remainingTime !== undefined) {
        setTimer(remainingTime);
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [selectedFieldId]);

  const startTimer = () => {
    if (socket && selectedTime !== null) {
      // socket이 null이 아닐 때만 emit 호출
      const intTime = selectedTime * 60;

      socket.emit('start_timer', {
        fieldId: selectedFieldId,
        duration: intTime,
      });
    }
  };

  const stopTimer = () => {
    if (socket && isRecording) {
      socket.emit('stop_timer', {
        fieldId: selectedFieldId,
      });

      setSelectedTime(null);
      setRecording(false);
    }
  };

  // ESC 키로 모든 모달 닫기
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        fieldDropdownRef.current &&
        !fieldDropdownRef.current.contains(event.target as Node)
      ) {
        setFieldDropdownOpen(false);
      }

      if (
        timeDropdownRef.current &&
        !timeDropdownRef.current.contains(event.target as Node)
      ) {
        setTimeDropdownOpen(false);
      }
    };

    const handleEscPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setFieldDropdownOpen(false);
        setTimeDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscPress);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscPress);
    };
  }, []);

  // 타이머 형식 00 : 00
  // const formatTime = (timeInSeconds: number) => {
  //   const minutes = Math.floor(timeInSeconds / 60);
  //   const seconds = timeInSeconds % 60;
  //   return `${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
  // };

  const formatTimeList = (time: number) => {
    // 시간이 60분 이상이면 "1시간 10분" 형식으로, 그렇지 않으면 "10분" 형식으로 표시
    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    if (hours > 0) {
      return `${hours}시간${minutes > 0 ? ` ${minutes}분` : ''}`;
    } else {
      return `${minutes}분`;
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    // 시간이 60분 이상인 경우 "HH : MM : SS" 형식으로 표시하고, 그렇지 않으면 "MM : SS" 형식으로 표시
    return hours > 0
      ? `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`
      : `${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
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
                {fields?.map((field: FieldDto) => (
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
                  {timeList?.map((time: number, idx: number) => (
                    <div
                      key={idx}
                      className={styles.dropdownItem}
                      // onClick={() =>
                      //   handleCityChange(city as keyof SelectStateType)
                      // }
                      onClick={() => selectTime(time)}
                    >
                      {formatTimeList(time)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {isRecording ? (
          <>
            <div id={styles.recordBtn} className={styles.recording}>
              {formatTime(timer)} 녹화중
            </div>
            <div
              id={styles.recordBtn}
              className={styles.stopRecord}
              onClick={() => {
                if (selectedFieldId != null) {
                  stopRecording(selectedFieldId);

                  stopTimer();
                }
              }}
            >
              녹화 강제 종료
            </div>
          </>
        ) : isActive ? (
          <div
            id={styles.recordBtn}
            className={styles.active}
            onClick={() => {
              if (selectedFieldId != null && selectedTime !== null) {
                startRecording(selectedFieldId, selectedTime);
                setActive(!isActive);
                startTimer();
              }
            }}
          >
            녹화 시작하기
          </div>
        ) : (
          <div id={styles.recordBtn}>녹화 시작하기</div>
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
        <div>녹화된 영상이 없어요</div>
      </div>
    </div>
  );
};

export default CameraControl;
