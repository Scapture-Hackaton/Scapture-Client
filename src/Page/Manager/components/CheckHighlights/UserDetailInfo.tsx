import { getUserDetailForManager } from '../../../../apis/api/manager.api';
import { useQuery } from '@tanstack/react-query';
import styles from '../../scss/manager.module.scss';
import React from 'react';
import { UserDetailDTO } from '../../dto/userInfo.dto';

interface UserDetailInfoProps {
  userId: string;
}

const UserDetailInfo: React.FC<UserDetailInfoProps> = ({ userId }) => {
  const { data: userDetail } = useQuery({
    queryKey: ['getUserDetailForManager'],
    queryFn: () => getUserDetailForManager(userId),
    initialData: {} as UserDetailDTO, // 초기 데이터를 빈 배열로 설정
  });

  console.log(userDetail);

  return (
    <div className={styles.container}>
      <div className={styles.headerTitle}>
        [{userId}] 하이라이트 추출 요청 인원
      </div>
      <table>
        <thead>
          <tr className={`${styles.title} ${styles.line}`}>
            <th>이름</th>
            <th>성별</th>
            <th>출생연도</th>
            <th>전화번호</th>
          </tr>
        </thead>
        <tbody>
          {userDetail ? (
            <tr className={`${styles.des} ${styles.line}`}>
              <td>{userDetail.name}</td>
              <td>{userDetail.gender}</td>
              <td>{userDetail.birthYear}</td>
              <td>{userDetail.phoneNumber}</td>
            </tr>
          ) : (
            <tr>
              <td colSpan={8} className={styles.noData}>
                조회된 데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetailInfo;
