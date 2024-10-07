/**
 * Scapture 관련 api
 */
import { CommonResponse } from '../dto/common.response';
import { defaultInstance } from '../utils/instance';

// Stadium 리스트 조회
export const getStadiumList = async (city: string, state: string) => {
  try {
    const res: CommonResponse = await defaultInstance.get(
      `/api/stadiums?city=${city}&state=${state}`,
    );

    return res.data.data;
  } catch (e: any) {
    return {
      status: e.response.status,
    };
  }
};

// Stadium 검색으로 리스트 조회
export const searchStadiumList = async (keyword: string) => {
  try {
    const res: CommonResponse = await defaultInstance.get(
      `/api/stadiums/search?keyword=${keyword}`,
    );

    return res.data.data;
  } catch (e: any) {
    return {
      status: e.response.status,
    };
  }
};
