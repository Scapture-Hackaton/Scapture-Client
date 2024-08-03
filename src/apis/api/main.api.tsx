import { CommonResponse } from '../dto/common.response';
import { defaultInstance } from '../utils/instance';

// 인기 영상 조회
export const getPopularVideosInMain = async () => {
  try {
    const res: CommonResponse = await defaultInstance.get(`api/videos/popular`);

    return res.data.data;
  } catch (e: any) {
    return {
      status: e.response.status,
    };
  }
};

// 제휴 구장 조회
export const getStadium = async () => {
  try {
    const res: CommonResponse = await defaultInstance.get(`api/videos/popular`);

    return res.data.data;
  } catch (e: any) {
    return {
      status: e.response.status,
    };
  }
};
