import React, { useState } from 'react';
// import styles from '../../scss/createStadium.module.scss';
import styles from './scss/EditInfo.module.scss';

import FieldFrame from './FieldFrame';
import { postField } from '../../../../../apis/api/admin.api';
import { useNavigate } from 'react-router-dom';

interface EditFieldProps {
  nextStep: (chapter: string) => void;
  isStadiumId: number | null;
}

interface Field {
  name: string;
  type1: string;
  type2: string;
  isOutside: boolean | null;
  price: string;
  images: string[];
}

const EditField: React.FC<EditFieldProps> = ({ nextStep, isStadiumId }) => {
  const navigate = useNavigate();

  // 구역 데이터를 관리할 배열 상태
  const [fields, setFields] = useState<Field[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

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
        imageFiles.length > 0 // 이미지가 최소 1개는 있는지 확인
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
        await postField(isStadiumId, formData); // 서버로 전송
        nextStep('first');
        navigate('/mypage');
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
          key={index}
          field={field}
          onUpdateField={(updatedField: Field) =>
            updateField(index, updatedField)
          }
          onRemove={() => removeField(index)} // 구역 삭제 핸들러
          setImageFiles={setImageFiles}
        />
      ))}
      <div className={styles.addFieldBtn} onClick={addField}>
        + 구역 추가
      </div>
    </div>
  );
};

export default EditField;
