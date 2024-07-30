/**
 * Scapture 관련 API
 */
import { CommonResponse } from '../dto/common.response';
import { defaultInstance } from '../utils/instance';

// Stadium 리스트 조회
export const getStadiumList = async (city: string, state: string) => {
  try {
    const res: CommonResponse = await defaultInstance.get(
      `api/stadiums?city=${city}&state=${state}`,
    );

    return res.data.data;
  } catch (e: any) {
    return {
      status: e.response.status,
    };
  }
};
