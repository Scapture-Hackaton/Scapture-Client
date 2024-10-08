import React, { useEffect, useRef, useState } from 'react';
// import styles from '../../scss/createStadium.module.scss';
import styles from './scss/EditInfo.module.scss';

import {
  selectState,
  SelectStateType,
} from '../../../MyPage/const/select.const';

import DownArrow from '../../../../../assets/Icon/dropDown.svg';
import { postStadium, putStadium } from '../../../../../apis/api/admin.api';
import { StadiumBasicInfoDto } from '../../../../../apis/dto/admin.dto';
import { StadiumDto } from '../Stadium/dto/stadium.dto';

interface EditBasicInfoProps {
  nextStep: (chapter: string) => void;
  createdStadiumId: (stadiumId: number) => void;
  type: string;
  stadiumData: StadiumDto | null;
}

interface StadiumBasicInfo {
  name: string;
  description: string;
  location: string;
  city: string;
  state: string;
  // hours: string;
  startTime: string;
  endTime: string | null;
  isParking: string;
  isFree: string;
}

const EditBasicInfo: React.FC<EditBasicInfoProps> = ({
  nextStep,
  createdStadiumId,
  type,
  stadiumData,
}) => {
  const stadiumId = stadiumData?.stadiumId;

  console.log(stadiumId);

  const initData: StadiumBasicInfo =
    type === 'EDIT'
      ? {
          name: stadiumData?.name ?? '',
          description: stadiumData?.description ?? '',
          location: stadiumData?.location ?? '',
          city: stadiumData?.city ?? '',
          state: stadiumData?.state ?? '',
          startTime: stadiumData?.startTime ?? '',
          endTime: stadiumData?.endTime ?? '',
          isParking: stadiumData?.isParking ? '주차 가능' : '주차 불가능',
          isFree: stadiumData?.isFree ? '무료' : '유료',
        }
      : {
          name: '',
          description: '',
          location: '',
          city: '',
          state: '',
          startTime: '',
          endTime: '',
          isParking: '',
          isFree: '',
        };

  const [stadiumInfo, setStadiumInfo] = useState<StadiumBasicInfo>(initData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setStadiumInfo(prevInfo => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSelectChange = (
    name: keyof StadiumBasicInfo,
    value: string | boolean,
  ) => {
    if (name === 'city') {
      // 도시 변경시 state 초기화
      setStadiumInfo(prevInfo => ({
        ...prevInfo,
        state: selectState[value as keyof SelectStateType][0],
      }));

      setCityDropdownOpen(false);
    } else if (name === 'state') {
      setRegionDropdownOpen(false);
    } else if (name === 'startTime') {
      // 시작시간 변경시 마감시간 초기화
      setStadiumInfo(prevInfo => ({
        ...prevInfo,
        endTime: null,
      }));
      setStartDropdownOpen(false);
    } else if (name === 'endTime') {
      setEndDropdownOpen(false);
    } else if (name === 'isParking') {
      setAvailDropdownOpen(false);
    } else if (name === 'isFree') {
      setisFreeDropdownOpen(false);
    }

    setStadiumInfo(prevInfo => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setStadiumInfo(prevInfo => ({
      ...prevInfo,
      description: e.target.value,
    }));
  };

  /**
   *
   *
   * 위치 관련 작업
   *
   *
   */

  // 위치 정보
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);

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
        setStartDropdownOpen(false);
        setEndDropdownOpen(false);
        setAvailDropdownOpen(false);
        setisFreeDropdownOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscPress);
    return () => {
      document.removeEventListener('keydown', handleEscPress);
    };
  }, []);

  const toggleCityDropdown = () => {
    setCityDropdownOpen(!cityDropdownOpen);
  };

  const toggleRegionDropdown = () => {
    setRegionDropdownOpen(!regionDropdownOpen);
  };

  /**
   *
   *
   * 운영시간 관련 작업
   *
   *
   */
  const hours = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, '0')}:00`,
  );

  const [startDropdownOpen, setStartDropdownOpen] = useState(false);
  const [endDropdownOpen, setEndDropdownOpen] = useState(false);

  // 마감 시간 필터링: 시작 시간 이후의 시간만 보여줌
  const getAvailableEndTimes = () => {
    if (!stadiumInfo.startTime) return hours;
    const startTimeIndex = hours.indexOf(stadiumInfo.startTime);
    return hours.slice(startTimeIndex + 1); // 시작 시간 이후의 시간만 반환
  };

  const [availDropdownOpen, setAvailDropdownOpen] = useState(false);
  const [isFreeDropdownOpen, setisFreeDropdownOpen] = useState(false);

  const createStadium = async () => {
    // 필수 값이 모두 입력되었는지 확인
    const {
      name,
      city,
      state,
      location,
      startTime,
      endTime,
      isParking,
      isFree,
      description,
    } = stadiumInfo;

    if (
      !name ||
      !city ||
      !state ||
      !location ||
      !startTime ||
      !endTime ||
      !isParking ||
      !isFree ||
      !description
    ) {
      alert('모든 필수 항목을 입력해주세요.');
      return; // 데이터가 비어있으면 API 호출을 막음
    }

    const data: StadiumBasicInfoDto = {
      name: stadiumInfo.name,
      city: stadiumInfo.city,
      state: stadiumInfo.state,
      location: stadiumInfo.location,
      hours: `${stadiumInfo.startTime}~${stadiumInfo.endTime}`,
      isParking: stadiumInfo.isParking === '주차 가능' ? true : false,
      isFree: stadiumInfo.isFree === '무료' ? true : false,
      description: stadiumInfo.description,
    };

    // 생성인 경우
    if (type === 'CREATE') {
      const result = await postStadium(data);

      if (result?.status === 201) {
        // console.log(result.data.stadiumId);

        createdStadiumId(result?.data?.stadiumId);
      }
      nextStep('first');
    }
    // 수정인 경우
    else {
      if (stadiumId) {
        await putStadium(stadiumId, data);
      }

      nextStep('first');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.header}>
          <div className={styles.mainTitle}>기본 정보</div>
          <div
            className={styles.change}
            onClick={() => {
              createStadium();
            }}
          >
            완료
          </div>
        </div>
        <div className={styles.important}>
          <span>*</span>이 표시되어 있는 항목은 필수 입력사항 입니다.
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.secName}>
          구장명<span>*</span>
        </div>
        <div className={styles.editDes}>
          <input
            type="text"
            name="name"
            value={stadiumInfo.name}
            placeholder="구장명 입력"
            onChange={handleChange}
          ></input>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.secName}>
          위치<span>*</span>
        </div>
        <div className={styles.regionDropDown}>
          <div
            className={styles.editRegion}
            onClick={toggleCityDropdown}
            ref={cityDropdownRef}
          >
            <div className={styles.dropdownTitle}>
              {stadiumInfo.city === '' ? '도시' : stadiumInfo.city}
            </div>
            <img className={styles.dropdownImg} src={DownArrow}></img>
            {cityDropdownOpen && (
              <div className={styles.dropdownMenu}>
                {Object.keys(selectState).map((city: string, idx: number) => (
                  <div
                    key={idx}
                    className={styles.dropdownItem}
                    // onClick={() =>
                    //   handleCityChange(city as keyof SelectStateType)
                    // }
                    onClick={() => handleSelectChange('city', city)}
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
              {stadiumInfo.state === '' ? '지역' : stadiumInfo.state}
            </div>
            <img className={styles.dropdownImg} src={DownArrow}></img>
            {regionDropdownOpen && (
              <div className={styles.dropdownMenu}>
                {stadiumInfo.city !== '' &&
                  selectState[stadiumInfo.city as keyof SelectStateType]
                    .length > 0 &&
                  selectState[stadiumInfo.city as keyof SelectStateType].map(
                    (region: string) => (
                      <div
                        key={region}
                        className={styles.dropdownItem}
                        // onClick={() => handleRegionChange(region)}
                        onClick={() => handleSelectChange('state', region)}
                      >
                        {region}
                      </div>
                    ),
                  )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`${styles.section} ${styles.location}`}>
        <div className={styles.secName}>
          상세주소<span>*</span>
        </div>
        <div className={styles.editDes}>
          <input
            type="text"
            name="location"
            value={stadiumInfo.location}
            placeholder="상세 주소 입력"
            onChange={handleChange}
          ></input>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.secName}>
          운영시간<span>*</span>
        </div>
        <div className={styles.regionDropDown}>
          {/* 시작 시간 */}
          <div
            className={styles.editRegion}
            onClick={() => setStartDropdownOpen(!startDropdownOpen)}
          >
            <div className={styles.dropdownTitle}>
              {stadiumInfo.startTime ? stadiumInfo.startTime : '시작시간'}
            </div>
            <img className={styles.dropdownImg} src={DownArrow}></img>
            {startDropdownOpen && (
              <div className={styles.dropdownMenu}>
                {hours.map((time, idx) => (
                  <div
                    key={idx}
                    className={styles.dropdownItem}
                    // onClick={() => handleStartTimeChange(time)}
                    onClick={() => handleSelectChange('startTime', time)}
                  >
                    {time}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 마감 시간 */}
          <div
            className={styles.editRegion}
            onClick={() => setEndDropdownOpen(!endDropdownOpen)}
          >
            <div className={styles.dropdownTitle}>
              {stadiumInfo.endTime ? stadiumInfo.endTime : '마감시간'}
            </div>
            <img className={styles.dropdownImg} src={DownArrow}></img>
            {endDropdownOpen && (
              <div className={styles.dropdownMenu}>
                {getAvailableEndTimes().map((time, idx) => (
                  <div
                    key={idx}
                    className={styles.dropdownItem}
                    // onClick={() => handleEndTimeChange(time)}
                    onClick={() => handleSelectChange('endTime', time)}
                  >
                    {time}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.secName}>
          주차<span>*</span>
        </div>
        <div className={styles.regionDropDown}>
          {/* 가능 여부 */}
          <div
            className={styles.editRegion}
            onClick={() => setAvailDropdownOpen(!availDropdownOpen)}
          >
            <div className={styles.dropdownTitle}>
              {stadiumInfo.isParking ? stadiumInfo.isParking : '가능 여부'}
            </div>
            <img className={styles.dropdownImg} src={DownArrow}></img>
            {availDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <div
                  className={styles.dropdownItem}
                  // onClick={() => handleAvailChange('주차 가능')}
                  onClick={() => handleSelectChange('isParking', '주차 가능')}
                >
                  주차 가능
                </div>
                <div
                  className={styles.dropdownItem}
                  // onClick={() => handleAvailChange('주차 불가능')}
                  onClick={() => handleSelectChange('isParking', '주차 불가능')}
                >
                  주차 불가능
                </div>
              </div>
            )}
          </div>

          {/* 비용 유무 */}
          <div
            className={styles.editRegion}
            onClick={() => setisFreeDropdownOpen(!isFreeDropdownOpen)}
          >
            <div className={styles.dropdownTitle}>
              {stadiumInfo.isFree ? stadiumInfo.isFree : '비용 유무'}
            </div>
            <img className={styles.dropdownImg} src={DownArrow}></img>
            {isFreeDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <div
                  className={styles.dropdownItem}
                  // onClick={() => handleIsFreeChange('무료')}
                  onClick={() => handleSelectChange('isFree', '무료')}
                >
                  무료
                </div>
                <div
                  className={styles.dropdownItem}
                  // onClick={() => handleIsFreeChange('유료')}
                  onClick={() => handleSelectChange('isFree', '유료')}
                >
                  유료
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`${styles.section} ${styles.intro}`}>
        <div className={styles.secName}>
          소개글<span>*</span>
        </div>
        <div className={styles.editIntro}>
          <textarea
            name="description"
            value={stadiumInfo.description}
            onChange={handleDescriptionChange}
            placeholder="고정 휴무일, 공휴일 운영 여부 등
소개글을 200자 이내로 입력해주세요"
          ></textarea>
        </div>
      </div>

      <div className={styles.notice}>
        <div className={styles.noticeIcon}>Notice</div>
        <div className={styles.explain}>
          <span>구장 내 구역</span> 세부정보는 3번째 패이지에서 작성 가능합니다.
        </div>
      </div>
    </div>
  );
};

export default EditBasicInfo;
