import React, { useEffect, useState } from 'react';
// import styles from '../../scss/createStadium.module.scss';
import styles from './scss/EditInfo.module.scss';

// import TestImg from '../../../image/test.png';
import PlusBtnIcon from '../../../../../assets/Icon/plusBtnIcon.svg';
import PictureIcon from '../../../../../assets/Icon/pictureIcon.svg';
import cancelBtnIcon from '../../../../../assets/Icon/cancelBtnIcon.svg';
import {
  deleteImage,
  postStadiumImages,
} from '../../../../../apis/api/admin.api';

interface EditBasicInfoProps {
  nextStep: (chapter: string) => void;
  isStadiumId: number | null;
  stadiumImages?: {
    representImage: { imageId: number; url: string };
    images: { imageId: number; url: string }[];
  };
  type: string;
}

const EditImage: React.FC<EditBasicInfoProps> = ({
  nextStep,
  isStadiumId,
  stadiumImages,
  type,
}) => {
  // 수정 모드일 때 기존 이미지 미리 채우기

  useEffect(() => {
    if (type === 'EDIT' && stadiumImages) {
      if (stadiumImages?.representImage?.url) {
        setPreviewImage(stadiumImages.representImage.url); // 대표 이미지 설정
      }

      if (stadiumImages?.images?.length > 0) {
        setImages(stadiumImages.images.map(image => image.url)); // 세부 이미지 설정
      }
    }
  }, [stadiumImages, type]);

  // 이미지 미리보기
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewImageFile, setPreviewImageFile] = useState<File | null>(null);

  // 대표 이미지 변경 핸들러
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const previewUrl = URL.createObjectURL(file); // 미리보기 URL 생성
      setPreviewImage(previewUrl); // 미리보기 업데이트
      setPreviewImageFile(file); // 파일 저장

      event.target.value = ''; // 파일 선택 초기화
    }
  };

  const [isImages, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const addDetailImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isImages.length === 9) {
      alert('세부 이미지는 최대 9장까지 등록 가능합니다.');
    } else {
      const file = event.target.files?.[0];

      if (file) {
        const previewUrl = URL.createObjectURL(file); // 미리보기 URL 생성
        setImages(prev => [...prev, previewUrl]); // 미리보기 업데이트
        setImageFiles(prev => [...prev, file]); // 파일 저장

        event.target.value = ''; // 파일 선택 초기화
      }
    }
  };

  // 빈 슬롯 이미지 생성
  const noImages = () => {
    const result = [];
    for (let i = 1; i < 10 - isImages.length; i++) {
      result.push(
        <div className={styles.noImageFrame} key={i}>
          <img src={PictureIcon} alt="" width="31%" height="118px" />
        </div>,
      );
    }
    return result;
  };

  const [checkRepresent, setCheckRepresent] = useState(true);
  // 대표 이미지 삭제하기
  const handleRemoveRepresent = async () => {
    if (type === 'EDIT' && stadiumImages?.representImage && checkRepresent) {
      await deleteImage(stadiumImages.representImage.imageId);
      setCheckRepresent(false);
    }

    setPreviewImage(null);
    setPreviewImageFile(null);
  };

  // 세부 이미지 삭제 핸들러
  const handleRemoveImage = async (index: number) => {
    if (type === 'EDIT' && stadiumImages?.images?.[index]) {
      await deleteImage(stadiumImages.images?.[index].imageId);
    }

    setImages(prevImages => prevImages.filter((_, idx) => idx !== index));
    setImageFiles(prevFiles => prevFiles.filter((_, idx) => idx !== index));
  };

  // 서버로 이미지 전송
  const makeImages = async () => {
    if (isStadiumId !== null) {
      if (!previewImageFile && type === 'CREATE') {
        alert('대표 이미지를 선택해주세요.');
        return; // Exit the function if validation fails
      }

      const formData = new FormData();

      // 대표 이미지 추가
      if (previewImageFile) {
        formData.append('representImage', previewImageFile);
      }

      // 세부 이미지 추가
      imageFiles.forEach(file => {
        formData.append('images', file);
      });

      try {
        await postStadiumImages(isStadiumId, formData); // 서버로 전송
        nextStep('second'); // 다음 단계로 이동
      } catch (error) {
        console.error('이미지 업로드 중 에러 발생:', error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.header}>
          <div className={styles.mainTitle}>구장 이미지</div>
          <div className={styles.change} onClick={() => makeImages()}>
            완료
          </div>
        </div>
        <div className={styles.subDes}>총 10장까지 등록 가능합니다.</div>
      </div>

      <div className={styles.article}>
        <div className={styles.artName}>
          대표 이미지<span>*</span>
        </div>

        {previewImage ? (
          <div className={styles.representImg}>
            <img
              src={previewImage}
              alt=""
              width="100%"
              height="100%"
              className={styles.detailImage}
            />
            <img
              src={cancelBtnIcon}
              alt=""
              className={styles.cancel}
              width="16px"
              height="16px"
              loading="lazy"
              onClick={() => handleRemoveRepresent()}
            ></img>
          </div>
        ) : (
          <div
            className={styles.addImage}
            onClick={() => document.getElementById('imageUpload')?.click()}
          >
            <img src={PlusBtnIcon} alt="" width="40px" height="40px" />
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </div>
        )}
      </div>

      <div className={styles.article}>
        <div className={styles.artName}>세부 이미지</div>
        <div
          className={styles.addImage}
          onClick={() => document.getElementById('detailImageUpload')?.click()}
        >
          <img src={PlusBtnIcon} alt="" width="40px" height="40px" />

          <input
            id="detailImageUpload"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={addDetailImg}
          />
        </div>

        <div className={styles.images}>
          {isImages.map((imgName: string, idx: number) => (
            <div className={styles.imageFrame} key={`${imgName}${idx}`}>
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
      </div>
    </div>
  );
};

export default EditImage;
