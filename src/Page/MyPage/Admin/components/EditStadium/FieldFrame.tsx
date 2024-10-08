import React, { useRef, useState } from 'react';
// import styles from '../../scss/createStadium.module.scss';
import styles from './scss/EditInfo.module.scss';

import DownArrow from '../../../../../assets/Icon/dropDown.svg';
import cancelBtnIcon from '../../../../../assets/Icon/cancelBtnIcon.svg';
import PictureIcon from '../../../../../assets/Icon/pictureIcon.svg';
import PlusBtnIcon from '../../../../../assets/Icon/plusBtnIcon.svg';

interface FieldFrameProps {
  key: number;
  field: {
    name: string;
    type1: string;
    type2: string;
    isOutside: boolean | null;
    price: string;
    images: string[];
  };
  onUpdateField: (field: {
    name: string;
    type1: string;
    type2: string;
    isOutside: boolean | null;
    price: string;
    images: string[];
  }) => void;
  onRemove: () => void;
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const FieldFrame: React.FC<FieldFrameProps> = ({
  key,
  field,
  onUpdateField,
  onRemove,
  setImageFiles,
}) => {
  const outsideDropdownRef = useRef<HTMLDivElement>(null);

  const [outsideDropdownOpen, setOutsideDropdownOpen] = useState(false);

  const toggleCityDropdown = () => {
    setOutsideDropdownOpen(!outsideDropdownOpen);
  };

  // const [isImages, setImages] = useState<string[]>(field.images);

  const addDetailImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (field.images.length === 5) {
      alert('구역 이미지는 최대 5장까지 등록 가능합니다.');
    } else {
      const file = event.target.files?.[0];
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        const updatedImages = [...field.images, previewUrl]; // 기존 이미지에 새 이미지 추가
        onUpdateField({ ...field, images: updatedImages }); // 부모 컴포넌트에 업데이트
        setImageFiles(prev => [...prev, file]); // 파일 저장
        event.target.value = ''; // 파일 선택 초기화
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = field.images.filter((_, idx) => idx !== index);
    onUpdateField({ ...field, images: updatedImages }); // 이미지를 제거한 후 업데이트
    setImageFiles(prevFiles => prevFiles.filter((_, idx) => idx !== index));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    const updatedField = { ...field, [key]: e.target.value };
    onUpdateField(updatedField); // 다른 필드들 변경
  };

  // 실내 / 실외 변경
  const handleOutsideChange = (isOutside: boolean) => {
    const updatedField = { ...field, isOutside };
    onUpdateField(updatedField); // 다른 필드들 변경
  };

  const noImages = () => {
    const result = [];
    for (let i = 1; i < 6 - field.images.length; i++) {
      result.push(
        <div className={styles.noImageFrame}>
          <img src={PictureIcon} alt="" width="31%" height="118px" />
        </div>,
      );
    }
    return result;
  };

  // 이미지 삭제 핸들러
  // const handleRemoveImage = (index: number) => {
  //   setImages(prevImages => prevImages.filter((_, idx) => idx !== index));
  // };

  const uniqueId = `fieldImgUpload-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={styles.addFieldFrame} key={key}>
      <div className={styles.line}>
        <div className={styles.editDes}>
          <input
            type="text"
            placeholder="구장명 입력"
            onChange={e => handleChange(e, 'name')}
          ></input>
        </div>
      </div>

      <div className={styles.line}>
        <div></div>
        <div className={styles.regionDropDown}>
          <div
            className={styles.editRegion}
            onClick={toggleCityDropdown}
            ref={outsideDropdownRef}
          >
            <div className={styles.dropdownTitle}>
              {/* {selectedCity === '' ? '도시' : selectedCity} */}
              {field.isOutside === null
                ? '실내/실외'
                : field.isOutside
                  ? '실외'
                  : '실내'}
            </div>
            <img className={styles.dropdownImg} src={DownArrow}></img>
            {outsideDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <div
                  className={styles.dropdownItem}
                  onClick={() => handleOutsideChange(false)}
                >
                  실내
                </div>
                <div
                  className={styles.dropdownItem}
                  onClick={() => handleOutsideChange(true)}
                >
                  실외
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.editPrice}>
          <input
            type="text"
            placeholder="가격"
            onChange={e => handleChange(e, 'price')}
          ></input>
        </div>
      </div>

      <div className={styles.line}>
        <div className={styles.title}>구역 정보(0vs0)</div>
        <div className={styles.versus}>
          <div className={styles.people}>
            <input
              type="text"
              placeholder="00"
              onChange={e => handleChange(e, 'type1')}
            ></input>
          </div>
          <div>VS</div>
          <div className={styles.people}>
            <input
              type="text"
              placeholder="00"
              onChange={e => handleChange(e, 'type2')}
            ></input>
          </div>
        </div>
      </div>

      <div className={styles.images}>
        <div
          className={styles.addImage}
          onClick={() => document.getElementById(uniqueId)?.click()}
        >
          <img src={PlusBtnIcon} alt="" width="40px" height="40px" />

          <input
            id={uniqueId}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={addDetailImg}
          />
        </div>
        {field.images.map((imgName: string, idx: number) => (
          <div className={styles.imageFrame} key={idx}>
            <img
              src={imgName}
              alt=""
              width="31%"
              height="118px"
              className={styles.detailImage}
              loading="lazy"
            />
            <img
              src={cancelBtnIcon}
              alt=""
              className={styles.cancel}
              width="16px"
              height="16px"
              loading="lazy"
              onClick={() => handleRemoveImage(idx)}
            ></img>
          </div>
        ))}
        {noImages()}
      </div>

      <div className={styles.deleteBtn}>
        <div className={styles.delete} onClick={onRemove}>
          삭제
        </div>
      </div>
    </div>
  );
};

export default FieldFrame;
