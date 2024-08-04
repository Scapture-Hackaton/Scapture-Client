import { CommonResponse } from '../dto/common.response';
import { defaultInstance } from '../utils/instance';

// 메인 화면 인기 영상 / 제휴 구장 조회
export const getMainStadium = async () => {
  try {
    const res: CommonResponse = await defaultInstance.get(`/api/stadiums/main`);

    return res.data.data;
  } catch (e: any) {
    return {
      status: e.response.status,
    };
  }
};
