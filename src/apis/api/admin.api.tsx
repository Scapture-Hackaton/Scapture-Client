import { CommonResponse } from '../dto/common.response';
import { authInstance } from '../utils/instance';

// 관리 중인 구장 리스트 정보 (get)
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

// 관리 중인 구장 디테일 정보 (get)
export const getManageStadiumDetail = async (
  stadiumId: number,
): Promise<CommonResponse | undefined> => {
  try {
    const res = await authInstance.get(`api/manages/stadiums/${stadiumId}`);

    return res.data;
  } catch (error) {
    console.error('Error: ', error);
  }
};
