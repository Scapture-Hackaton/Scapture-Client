import React, { useEffect, useRef, useState } from 'react';
import styles from '../scss/reservation.module.scss';
import dropDown from '../../../assets/Icon/dropDown.svg';

interface SelectProps {
  selectList: string[];
  selectedOption: string;
  onOptionChange: (option: string) => void;
}

const SelectBtn: React.FC<SelectProps> = ({
  selectList,
  selectedOption,
  onOptionChange,
}) => {
  // 버튼을 눌렀는지에 대한 상태
  const [open, setOpen] = useState(false);

  // 현재 리스트의 첫번째 값
  //   const [selected, setSelected] = useState(selectList[0]);
  const selectRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  // 리스트 요소를 선택했을 경우
  const handleOptionClick = (option: string) => {
    onOptionChange(option);
    // setSelected(option);
    setOpen(false);
  };

  // 화면 밖을 클릭시 리스트 ui 제거
  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  // 화면 밖을 클릭시 리스트 ui 제거
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // city를 변경했을 경우 state 리스트가 변하도록
  //   useEffect(() => {
  //     if (type == 'state') {
  //       setSelected(selectList[0]);
  //     }
  //   }, [selectList]);

  return (
    <div
      className={`${styles.selectbox} ${open ? styles.open : ''}`}
      ref={selectRef}
    >
      <button type="button" onClick={toggleDropdown}>
        <span>{selectedOption}</span>
        <img src={dropDown} alt="" width="16px" height="16px"></img>
      </button>
      <ul>
        {selectList.length <= 0
          ? null
          : selectList.map((option, idx) => (
              <li key={idx}>
                <button
                  type="button"
                  onClick={() => handleOptionClick(`${option}`)}
                  className={selectedOption === option ? styles.selected : ''}
                >
                  {option}
                </button>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default SelectBtn;
