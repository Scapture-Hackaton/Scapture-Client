import { CommonResponse } from '../dto/common.response';
import { authInstance } from '../utils/instance';

// 관리 중인 구장 정보 (get)
export const getManageStadium = async (): Promise<
  CommonResponse | undefined
> => {
  try {
    const res = await authInstance.get(`api/manages/stadiums`);

    return res.data;
  } catch (error) {
    console.error('Error: ', error);
  }
};
