import React, { useEffect, useState } from 'react';
// import styles from '../../scss/createStadium.module.scss';
import styles from './scss/EditInfo.module.scss';

import FieldFrame from './FieldFrame';
import {
  deleteImage,
  postField,
  putField,
} from '../../../../../apis/api/admin.api';
import { useNavigate } from 'react-router-dom';
import { FieldDto } from '../Stadium/dto/field.dto';

interface Field {
  name: string;
  type1: string;
  type2: string;
  isOutside: boolean | null;
  price: string;
  images: string[];
}

interface ExistingImage {
  imageId: number;
  url: string;
}

interface EditFieldProps {
  nextStep: (chapter: string) => void;
  isStadiumId: number | null;
  selectedFieldData: FieldDto | null;
  type: string;
}

const EditField: React.FC<EditFieldProps> = ({
  nextStep,
  isStadiumId,
  selectedFieldData,
  type,
}) => {
  const navigate = useNavigate();

  // 구역 데이터를 관리할 배열 상태
  const [fields, setFields] = useState<Field[]>([]);
  const [existingImages, setExistingImages] = useState<ExistingImage[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  // 만약 수정하기인 경우 기본 데이터 삽입
  useEffect(() => {
    if (type === 'EDIT' && selectedFieldData) {
      const splitType1 = selectedFieldData?.type?.split('vs')[0].trim();
      const splitType2 = selectedFieldData?.type?.split('vs')[1].trim();

      const data: Field[] = [
        {
          name: selectedFieldData?.name ?? '',
          type1: splitType1 ?? '00',
          type2: splitType2 ?? '00',
          isOutside: selectedFieldData?.isOutside ?? null,
          price: selectedFieldData?.price.toString() ?? '',
          images: [],
        },
      ];
      setFields(data);
      setExistingImages(selectedFieldData?.images || []);
    }
  }, [type, selectedFieldData]);

  // 구역 추가 핸들러
  const addField = () => {
    setFields(prev => [
      ...prev,
      {
        name: '',
        type1: '00',
        type2: '00',
        isOutside: null,
        price: '',
        images: [],
      }, // 기본 필드 정보
    ]);
  };

  // 구역 정보 업데이트 핸들러
  const updateField = (index: number, updatedField: Field) => {
    setFields((prevFields: Field[]) =>
      prevFields.map((field: Field, idx: number) =>
        idx === index ? updatedField : field,
      ),
    );
  };

  // 구역 삭제 핸들러
  const removeField = (index: number) => {
    setFields((prevFields: Field[]) =>
      prevFields.filter((_: any, idx: number) => idx !== index),
    );
  };

  const handleRemoveExistingImage = async (imageId: number) => {
    try {
      // 서버로 이미지 삭제 요청 보내기
      await deleteImage(imageId); // 이 부분에서 실제 API 호출을 통해 이미지 삭제
      setExistingImages(prevImages =>
        prevImages.filter(image => image.imageId !== imageId),
      );
    } catch (error) {
      console.error('이미지 삭제 중 에러 발생:', error);
    }
  };

  // const handleSubmit = () => {
  //   // 완료 시 배열 데이터를 콘솔에 출력하거나 서버로 보낼 수 있음
  //   console.log(fields);
  //   // nextStep('second'); // 다음 단계로 이동
  // };

  // 서버로 이미지 전송
  const makeField = async () => {
    // 필드 데이터 검증
    const isFieldsValid = fields.every(field => {
      return (
        field.name.trim() !== '' && // 이름이 비어있지 않고
        field.type1 !== '00' && // type1이 기본값이 아니고
        field.type2 !== '00' && // type2가 기본값이 아니고
        field.isOutside !== null && // 실내외 구분이 선택되었고
        field.price.trim() !== '' && // 가격이 입력되었고
        imageFiles.length + existingImages.length > 0 // 이미지가 최소 1개는 있는지 확인
      );
    });

    if (!isFieldsValid) {
      alert(
        '모든 필수 정보를 입력해주세요. (이름, 타입, 실내외 여부, 가격, 이미지)',
      );
      return;
    }

    if (isStadiumId !== null) {
      const formData = new FormData();

      // 세부 이미지 추가
      imageFiles.forEach(file => {
        formData.append('images', file);
      });

      formData.append('name', fields[0].name);
      formData.append('type', `${fields[0].type1} vs ${fields[0].type2}`);
      formData.append(
        'isOutside',
        fields[0].isOutside !== null ? String(fields[0].isOutside) : '',
      );
      formData.append('price', fields[0].price);

      try {
        if (type === 'CREATE') {
          nextStep('first');
          await postField(isStadiumId, formData); // 서버로 전송
          navigate('/mypage');
        }

        if (type === 'EDIT') {
          if (selectedFieldData?.fieldId)
            await putField(selectedFieldData?.fieldId, formData);
          nextStep('third');
        }
      } catch (error) {
        console.error('이미지 업로드 중 에러 발생:', error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.header}>
          <div className={styles.mainTitle}>보유 구역</div>
          <div className={styles.change} onClick={() => makeField()}>
            완료
          </div>
        </div>
        <div className={styles.subDes}>
          구역 이미지는 구역당 5장씩 등록 가능합니다.
        </div>
      </div>
      {fields.map((field: Field, index: number) => (
        <FieldFrame
          frameIdx={index}
          field={field}
          onUpdateField={(updatedField: Field) =>
            updateField(index, updatedField)
          }
          onRemove={() => removeField(index)} // 구역 삭제 핸들러
          setImageFiles={setImageFiles}
          handleRemoveExistingImage={handleRemoveExistingImage}
          existingImages={existingImages}
        />
      ))}
      {type === 'CREATE' ? (
        <div className={styles.addFieldBtn} onClick={addField}>
          + 구역 추가
        </div>
      ) : null}
    </div>
  );
};

export default EditField;
