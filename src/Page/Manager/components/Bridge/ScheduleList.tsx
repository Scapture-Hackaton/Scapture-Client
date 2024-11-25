import React, { useRef, useState } from 'react';
import styles from '../../scss/scheduleList.module.scss';
import { useQuery } from '@tanstack/react-query';
import { getStadiumDHours } from '../../../../apis/api/stadium.api';
import { HighlightListsRes } from '../../dto/highlight.dto';
import { LoginModal } from '../../../Header/components/LoginModal';
import { loginData, loginDataAtom } from '../../../Header/Atom/atom';
import { useRecoilValue } from 'recoil';
import { modalNotice } from '../../../../common/functions/ModalFunction';
import RequestCheckModal from './RequestCheckModal';

interface ScheduleListProps {
  fieldId: number;
  fieldName: string;
  isMonth: string;
  isDay: string;
}

const ScheduleList: React.FC<ScheduleListProps> = ({
  fieldId,
  fieldName,
  isMonth,
  isDay,
}) => {
  const loginModalRef = useRef<HTMLDialogElement>(null);
  const isLoginState = useRecoilValue<loginData>(loginDataAtom);

  const getFormattedDate = () => {
    const currentYear = new Date().getFullYear(); // 현재 연도 가져오기
    const formattedMonth = isMonth.padStart(2, '0'); // 두 자리로 보정
    const formattedDay = isDay.padStart(2, '0'); // 두 자리로 보정
    return `${currentYear}-${formattedMonth}-${formattedDay}`;
  };

  const formattedDate = getFormattedDate();

  const { data: highlightList } = useQuery({
    queryKey: ['schedule', fieldId],
    queryFn: () => getStadiumDHours(fieldId, formattedDate),
    initialData: {} as HighlightListsRes[],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedScheduleId, setSelectedScheduleId] = useState(0);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className={styles.listContainer}>
        {highlightList && highlightList.length > 0 ? (
          <>
            {highlightList.map((item: any) => {
              const [startTime, endTime] = item.hours.split('~');
              return (
                <div key={item.scheduleId} className={styles.itemBox}>
                  <div className={styles.date}>
                    {isMonth.padStart(2, '0')}.{isDay.padStart(2, '0')}
                  </div>
                  <div className={styles.time}>
                    <span className={styles.startTime}>
                      {startTime.padStart(2, '0')}
                    </span>{' '}
                    ~ {endTime}
                  </div>
                  <div
                    onClick={() => {
                      if (isLoginState.state) {
                        setSelectedScheduleId(item.scheduleId);
                        setSelectedTime(item.hours);
                        openModal();
                      } else {
                        modalNotice(loginModalRef);
                      }
                    }}
                    className={`${styles.btn} ${styles.disabled}`}
                  >
                    요청하기
                  </div>
                </div>
              );
            })}
          </>
        ) : null}
        <LoginModal modalRef={loginModalRef}></LoginModal>
        <RequestCheckModal
          scheduleId={selectedScheduleId}
          isOpen={isModalOpen}
          onClose={closeModal}
          fieldName={fieldName}
          formattedDate={formattedDate}
          selectedTime={selectedTime}
        />
      </div>
    </>
  );
};

export default ScheduleList;
