import {
  getUserForManager,
  giveUserBananas,
} from '../../../../apis/api/manager.api';

import styles from '../../scss/manager.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UserInfoDTO } from '../../dto/userInfo.dto';

const UserInfoManage = () => {
  //   const { data: highlights } = useQuery({
  //     queryKey: ['getHighlightsForManager'],
  //     queryFn: () => getHighlightsForManager(),
  //     initialData: [] as HighlightsRes[], // 초기 데이터를 빈 배열로 설정
  //   });

  const navigate = useNavigate();

  const [isName, setName] = useState<string>('');
  const [userInfo, setUserInfo] = useState<UserInfoDTO[] | null>(null);

  const searchUser = async () => {
    const data = await getUserForManager(isName);
    console.log(data);
    setUserInfo(data);
    setName('');
  };

  // 변경되는 텍스트 state에 저장
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setName(value);
  };

  // 엔터 눌러서 검색 가능
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchUser();
    }
  };

  return (
    <>
      <div className={styles.headerTitle}>사용자 버내너 지급 페이지</div>
      <div className={styles.inputPwd}>
        <div className={styles.editDes}>
          <input
            value={isName}
            type="text"
            name="name"
            placeholder="사용자명 입력"
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          ></input>
        </div>
        <div className={styles.button} onClick={() => searchUser()}>
          확인
        </div>
      </div>
      <table>
        <thead>
          <tr className={`${styles.title} ${styles.line}`}>
            <th>이름</th>
            <th>전화번호</th>
            <th>버내너 지급</th>
          </tr>
        </thead>
        <tbody>
          {userInfo && userInfo.length > 0 ? (
            userInfo.map((data: UserInfoDTO, idx: number) => (
              <tr className={`${styles.des} ${styles.line}`} key={idx}>
                <td>
                  <div
                    className={styles.hyperLink}
                    onClick={() => navigate(`/admin/user/${data.userId}`)}
                  >
                    {data.name}
                  </div>
                </td>
                <td>{data.phoneNumber}</td>

                <td>
                  <div
                    className={styles.btn}
                    onClick={async () => {
                      const res = prompt('지급할 버내너 개수를 입력해주세요.');
                      if (res !== null) {
                        if (Number(res)) {
                          await giveUserBananas(data.userId, res);
                        }
                      }
                    }}
                  >
                    지급
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className={styles.noData}>
                조회된 데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default UserInfoManage;
