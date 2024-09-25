/**
 * 유저 정보 관련 API
 */
import { CommonResponse } from '../dto/common.response';
import { authInstance } from '../utils/instance';

//버내너 개수 가져오기
export const getBananaCnt = async () => {
  try {
    const res: CommonResponse = await authInstance.get(`api/user/bananas`);
    return res.data;
  } catch (e: any) {
    return {
      status: e.response.status,
    };
  }
};
