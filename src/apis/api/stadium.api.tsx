/**
 * Stadium 관련 API
 */
import { CommonResponse } from '../dto/common.response';
import {
  defaultInstance,
  authFileInstance,
  authInstance,
} from '../utils/instance';

// 경기장 전체 조회
export const getStadiums = async (city: string, state: string) => {
  try {
    const res: CommonResponse = await defaultInstance.get(
      `api/stadium?city=${city}&state=${state}`,
    );
    return res;
  } catch (e: any) {
    return {
      status: e.response.status,
    };
  }
};

// 경기장 세부 조회
export const getStadiumDetail = async (stadiumId: number) => {
  try {
    const res: CommonResponse = await defaultInstance.get(
      `api/stadiums/${stadiumId}/detail`,
    );
    return res.data;
  } catch (e: any) {
    return {
      status: e.response.status,
    };
  }
};
