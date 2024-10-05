import React, { useEffect, useRef, useState } from 'react';
import styles from '../../scss/createStadium.module.scss';
import {
  selectState,
  SelectStateType,
} from '../../../MyPage/const/select.const';

import DownArrow from '../../../../../assets/Icon/dropDown.svg';

const EditBasicInfo = () => {
  /**
   *
   *
   * 위치 관련 작업
   *
   *
   */
  const [selectedCity, setSelectedCity] = useState<keyof SelectStateType | ''>(
    '',
  );
  const [selectedRegion, setSelectedRegion] = useState('');

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
      }
    };

    document.addEventListener('keydown', handleEscPress);
    return () => {
      document.removeEventListener('keydown', handleEscPress);
    };
  }, []);

  // 도시 변경
  const handleCityChange = (city: keyof SelectStateType) => {
    setSelectedCity(city);
    setSelectedRegion(selectState[city][0]); // 도시를 변경시 지역 초기화
    setCityDropdownOpen(false);
    // if (city !== myProfileData?.data?.city) {
    //   setProfileChanges(prev => ({
    //     ...prev,
    //     city,
    //     state: selectState[city][0],
    //   }));
    // } else {
    //   setProfileChanges(prev => {
    //     const { city, ...rest } = prev;
    //     return rest;
    //   });
    // }
  };

  const handleRegionChange = (state: string) => {
    setSelectedRegion(state);
    setRegionDropdownOpen(false);
    // if (state !== myProfileData?.data?.state) {
    //   setProfileChanges(prev => ({ ...prev, state }));
    // } else {
    //   setProfileChanges(prev => {
    //     const { state, ...rest } = prev;
    //     return rest;
    //   });
    // }
  };

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

  const [selectedStartTime, setSelectedStartTime] = useState<string | null>(
    null,
  );
  const [selectedEndTime, setSelectedEndTime] = useState<string | null>(null);

  const [startDropdownOpen, setStartDropdownOpen] = useState(false);
  const [endDropdownOpen, setEndDropdownOpen] = useState(false);

  // 시작 시간 선택 핸들러
  const handleStartTimeChange = (time: string) => {
    setSelectedStartTime(time);
    setSelectedEndTime(null); // 시작 시간을 변경하면 마감 시간을 초기화
    setStartDropdownOpen(false);
  };

  // 마감 시간 선택 핸들러
  const handleEndTimeChange = (time: string) => {
    setSelectedEndTime(time);
    setEndDropdownOpen(false);
  };

  // 마감 시간 필터링: 시작 시간 이후의 시간만 보여줌
  const getAvailableEndTimes = () => {
    if (!selectedStartTime) return hours;
    const startTimeIndex = hours.indexOf(selectedStartTime);
    return hours.slice(startTimeIndex + 1); // 시작 시간 이후의 시간만 반환
  };

  const [selectedIsAvailable, setSelectedIsAvailable] = useState<string | null>(
    null,
  );
  const [selectedIsFree, setSelectedIsFree] = useState<string | null>(null);

  const [availDropdownOpen, setAvailDropdownOpen] = useState(false);
  const [isFreeDropdownOpen, setisFreeDropdownOpen] = useState(false);

  // 시작 시간 선택 핸들러
  const handleAvailChange = (isAvail: string) => {
    setSelectedIsAvailable(isAvail);
    setSelectedIsFree(null); // 시작 시간을 변경하면 마감 시간을 초기화
    setAvailDropdownOpen(false);
  };

  // 마감 시간 선택 핸들러
  const handleIsFreeChange = (isFree: string) => {
    setSelectedIsFree(isFree);
    setisFreeDropdownOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.header}>
          <div className={styles.mainTitle}>기본 정보</div>
          <div className={styles.change}>완료</div>
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
          <input type="text" placeholder="구장명 입력"></input>
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
              {selectedCity === '' ? '도시' : selectedCity}
            </div>
            <img className={styles.dropdownImg} src={DownArrow}></img>
            {cityDropdownOpen && (
              <div className={styles.dropdownMenu}>
                {Object.keys(selectState).map((city: string, idx: number) => (
                  <div
                    key={idx}
                    className={styles.dropdownItem}
                    onClick={() =>
                      handleCityChange(city as keyof SelectStateType)
                    }
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
              {selectedRegion === '' ? '지역' : selectedRegion}
            </div>
            <img className={styles.dropdownImg} src={DownArrow}></img>
            {regionDropdownOpen && (
              <div className={styles.dropdownMenu}>
                {selectedCity !== '' &&
                  selectState[selectedCity].length > 0 &&
                  selectState[selectedCity].map((region: string) => (
                    <div
                      key={region}
                      className={styles.dropdownItem}
                      onClick={() => handleRegionChange(region)}
                    >
                      {region}
                    </div>
                  ))}
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
          <input type="text" placeholder="상세 주소 입력"></input>
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
              {selectedStartTime ? selectedStartTime : '시작시간'}
            </div>
            <img className={styles.dropdownImg} src={DownArrow}></img>
            {startDropdownOpen && (
              <div className={styles.dropdownMenu}>
                {hours.map((time, idx) => (
                  <div
                    key={idx}
                    className={styles.dropdownItem}
                    onClick={() => handleStartTimeChange(time)}
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
              {selectedEndTime ? selectedEndTime : '마감시간'}
            </div>
            <img className={styles.dropdownImg} src={DownArrow}></img>
            {endDropdownOpen && (
              <div className={styles.dropdownMenu}>
                {getAvailableEndTimes().map((time, idx) => (
                  <div
                    key={idx}
                    className={styles.dropdownItem}
                    onClick={() => handleEndTimeChange(time)}
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
              {selectedIsAvailable ? selectedIsAvailable : '가능 여부'}
            </div>
            <img className={styles.dropdownImg} src={DownArrow}></img>
            {availDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <div
                  className={styles.dropdownItem}
                  onClick={() => handleAvailChange('주차 가능')}
                >
                  주차 가능
                </div>
                <div
                  className={styles.dropdownItem}
                  onClick={() => handleAvailChange('주차 불가능')}
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
              {selectedIsFree ? selectedIsFree : '비용 유무'}
            </div>
            <img className={styles.dropdownImg} src={DownArrow}></img>
            {isFreeDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <div
                  className={styles.dropdownItem}
                  onClick={() => handleIsFreeChange('무료')}
                >
                  무료
                </div>
                <div
                  className={styles.dropdownItem}
                  onClick={() => handleIsFreeChange('유료')}
                >
                  유료
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.secName}>
          소개글<span>*</span>
        </div>
        <div className={styles.editIntro}>
          <textarea
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
