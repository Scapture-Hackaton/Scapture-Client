import Footer from '../../../Footer/components/Footer';
import styles from '../scss/account-delete.module.scss';
import Header from '../../../Header/components/Header';
import Clock from '../image/Clock.svg';
import { useState } from 'react';
import Checkbox from './CheckBox';

const AccountDelete = () => {
  // 체크박스 상태 배열 생성
  const [checkedStates, setCheckedStates] = useState<boolean[]>(
    Array(8).fill(false),
  );

  // 체크박스 상태 업데이트 함수
  const handleCheckboxChange = (index: number, checked: boolean) => {
    const updatedStates = [...checkedStates];
    updatedStates[index] = checked; // 해당 인덱스 상태만 변경
    setCheckedStates(updatedStates);
  };

  const reasons = [
    '기록 삭제 목적',
    '이용이 불편하고 장애가 많아서',
    '비용이 비싸서',
    '다른 서비스가 더 좋아서',
    '삭제하고 싶은 내용이 있어서',
    '사용 빈도가 낮아서',
    '콘텐츠 불만',
    '기타',
  ];

  return (
    <div className={styles.test}>
      <Header index={0}></Header>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <img className={styles.backButton} src={Clock}></img>
          <div className={styles.title}>회원탈퇴</div>
        </div>
        <div className={styles.textContainer}>
          <div className={styles.mainText}>
            정말 탈퇴하시겠어요? <br></br>회원 탈퇴 이후에는 모든 정보가
            삭제됩니다.
          </div>
          <div className={styles.subText}>
            회원탈퇴의 이유를 말씀해주세요. <br></br>서비스 개선에 중요한 자료로
            활용하겠습니다.
          </div>
          <div className={styles.checkContainer}>
            {reasons.map((reason, index) => (
              <Checkbox
                key={index}
                checked={checkedStates[index]}
                onChange={checked => handleCheckboxChange(index, checked)}
              >
                {reason}
              </Checkbox>
            ))}
            <div className={styles.noticeContainer}>
              <div className={styles.noticeIcon}>Notice</div>
              <div className={styles.noticeText}>
                계정을 삭제하면 회원님의 모든 콘텐츠와 활동 기록, 포인트 사용
                내역이 삭제됩니다. 삭제된 정보는 복구할 수 없으니 신중하게
                결정해주세요.<br></br>
                <br></br>
                포인트 충전을 통해 적립한 포인트는 계정 삭제 시 환불이
                불가합니다. 또한 환불 신청 후 환불 처리가 완료되기 전 계정을
                삭제하는 경우 포인트 구매 기록을 확인할 수 없으므로 환불이
                불가합니다.
              </div>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <div className={styles.deleteButton}>탈퇴하기</div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AccountDelete;
