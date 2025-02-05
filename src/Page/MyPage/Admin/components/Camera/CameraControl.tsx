import React, { useEffect, useRef, useState } from 'react';
import styles from '../../scss/stadium.module.scss';

import io, { Socket } from 'socket.io-client';

import DownArrow from '../../../../../assets/Icon/dropDown.svg';
import { FieldDto } from '../Stadium/dto/field.dto';

import infoIcon from '../../../../../assets/Icon/infoIcon.svg';
import noDataIcon from '../../../../../assets/Icon/noDataIcon.svg';
import DateIcon from '../../../../../assets/Icon/dateIcon.svg';
import StadiumIcon from '../../../../../assets/Icon/stadiumIcon.svg';
import Clock from '../../../../../assets/Icon/Clock.svg';
import LeftArr from '../../../image/LeftArr.svg';

import {
  getRecordedList,
  startRecording,
  stopRecording,
} from '../../../../../apis/api/admin.api';
import RecordCheckModal from '../modal/RecordCheckModal';
import { OriginalVideoItemDto, RecordedList } from '../dto/recordInfo.dto';
import { getOriginalsForManagerWithScheduleId } from '../../../../../apis/api/manager.api';

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
  const [recordedList, setRecordedList] = useState<RecordedList[]>([]); // 녹화 목록 상태

  const selectField = async (fieldId: number, fieldName: string) => {
    setSelectedField(fieldName);
    setSelectedFieldId(fieldId);

    setList(true);
    // fieldId 선택 시 녹화 목록 호출
    const recordings = await getRecordedList(fieldId);

    if (recordings) {
      setRecordedList(recordings.data);
    }
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

  const checkAndStartRecording = async () => {
    if (selectedFieldId != null && selectedTime !== null) {
      const res = await startRecording(selectedFieldId, selectedTime);

      if (res?.status === 403 || res === undefined) {
        alert('이미 녹화가 진행중입니다!');
      } else {
        setActive(!isActive);
        startTimer();
      }
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 녹화된 영상 / 녹화본 전환을 위한 코드
  const [isList, setList] = useState(true);
  const [recordedDetail, setrecordedDetail] = useState<RecordedList | null>(
    null,
  );
  const [originalVideos, setOriginalVideos] = useState<
    OriginalVideoItemDto[] | null
  >(null);
  const changeRecordedList = async (item: RecordedList | null) => {
    setList(!isList);

    if (item && item.scheduleId) {
      const res = await getOriginalsForManagerWithScheduleId(
        item.scheduleId.toString(),
      );

      setrecordedDetail(item);

      setOriginalVideos(res);
    }
  };

  // 영상 다운로드 로직
  const downLoadVideo = (item: OriginalVideoItemDto, idx: number) => {
    fetch(item.url, {
      method: 'GET',
    })
      // fetch(`${videoDetail.video}`, {
      //   method: 'GET',
      // })
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.setAttribute('href', url);
        link.setAttribute('download', `${idx}번_카메라_원본영상.mp4`);

        document.body.appendChild(link);

        link.click();

        link.parentNode?.removeChild(link);

        window.URL.revokeObjectURL(url);
      });
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
                {selectedTime !== null
                  ? `${formatTimeList(selectedTime)}`
                  : '시간'}
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
            {/* <div
              id={styles.recordBtn}
              className={styles.stopRecord}
              onClick={() => {
                const confirmFlag = confirm(
                  '정말 녹화를 종료하시겠습니까? 녹화를 종료하면 현재까지 녹화된 영상은 저장되지않습니다.',
                );
                if (confirmFlag) {
                  if (selectedFieldId != null) {
                    stopRecording(selectedFieldId);

                    stopTimer();
                  }
                }
              }}
            >
              녹화 강제 종료
            </div> */}
          </>
        ) : isActive ? (
          <div
            id={styles.recordBtn}
            className={styles.active}
            onClick={openModal}
          >
            녹화 시작하기
          </div>
        ) : (
          <div id={styles.recordBtn}>녹화 시작하기</div>
        )}
      </div>

      {isList ? (
        <>
          <div className={styles.cameraTitle}>
            <div id={styles.expain}>
              <div id={styles.title}>녹화된 영상</div>
              <div id={styles.subTitle}>현재까지 녹화된 영상이에요</div>
            </div>
          </div>

          <div className={styles.recordedList}>
            {recordedList && recordedList.length > 0 ? (
              recordedList.map((item: RecordedList) => {
                return (
                  <div
                    className={styles.recordedItem}
                    onClick={() => changeRecordedList(item)}
                    key={item.scheduleId}
                  >
                    <div className={styles.recordedTitle}>{item.name}</div>
                    <div className={styles.recordedInfo}>
                      <div className={styles.recordedInfoItem}>
                        <img
                          src={DateIcon}
                          alt=""
                          width="20px"
                          height="20px"
                        ></img>
                        <div>{item.date}</div>
                      </div>
                      <div className={styles.recordedInfoItem}>
                        <img
                          src={StadiumIcon}
                          alt=""
                          width="20px"
                          height="20px"
                        ></img>
                        <div>{item.fieldName}</div>
                      </div>
                      <div className={styles.recordedInfoItem}>
                        <img
                          src={Clock}
                          alt=""
                          width="20px"
                          height="20px"
                        ></img>
                        <div>{item.hours}</div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <div className={styles.recordedContainer}>
          <div className={styles.itemInfo}>
            <img
              onClick={() => changeRecordedList(null)}
              src={LeftArr}
              alt=""
              width="14px"
              height="24px"
            ></img>
            <div>녹화본</div>
          </div>
          <div className={styles.originalVideoList}>
            {originalVideos && recordedDetail ? (
              <div className={styles.videoGrid}>
                {originalVideos.map(
                  (item: OriginalVideoItemDto, idx: number) => (
                    <div
                      className={styles.videoCard}
                      key={idx}
                      onClick={() => downLoadVideo(item, idx + 1)}
                    >
                      {/* <div className={styles.thumbnail}></div> */}
                      <img
                        className={styles.thumbnail}
                        src={item.imageUrl}
                        alt=""
                        width="199px"
                        height="112px"
                      />
                      <div className={styles.videoInfo}>
                        <div className={styles.videoTitle}>
                          {idx + 1}번 카메라
                        </div>
                        <div className={styles.videoDetails}>
                          <div className={styles.videoField}>
                            {recordedDetail.fieldName}
                          </div>
                          <div className={styles.videoTime}>
                            {recordedDetail.date} | {recordedDetail.hours}
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            ) : (
              <>
                <div className={styles.noReserve}>
                  <img
                    src={noDataIcon}
                    className={styles.img}
                    width="168px"
                    height="108px"
                  ></img>
                  <div className={styles.title}>아직 저장된 영상이 없어요</div>
                </div>
              </>
            )}

            {/* <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              pageCount={pageCount} //몇개 페이지 보여줄건지
              pageRangeDisplayed={10} // 페이지 주변에 표시될 번호 범위
              // onPageChange={handlePageClick}
              containerClassName={styles.pagination} /// 전체컨테이너
              activeClassName={styles.active} // 활성화 페이지 번호에 적용
              pageClassName={styles.pageNumber} //각 페이지 번호에 적용
              previousClassName={styles.button} // 이전버튼 적용
              nextClassName={styles.button} //다음버튼 적용
            /> */}
          </div>
        </div>
      )}

      <RecordCheckModal
        isOpen={isModalOpen}
        onClose={closeModal}
        checkAndStartRecording={checkAndStartRecording}
        selectedField={selectedField!}
        selectedTime={selectedTime!}
      />
    </div>
  );
};

export default CameraControl;
