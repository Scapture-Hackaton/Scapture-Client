/**
 * Stadium 관련 api
 */
import { CommonResponse } from '../dto/common.response';
import { defaultInstance, authInstance } from '../utils/instance';

// 경기장 전체 조회
export const getStadiums = async (city: string, state: string) => {
  try {
    const res: CommonResponse = await defaultInstance.get(
      `/api/stadium?city=${city}&state=${state}`,
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
      `/api/stadiums/${stadiumId}/detail`,
    );
    return res.data.data;
  } catch (e: any) {
    return {
      status: e.response.status,
    };
  }
};

// 경기장 운영 시간 조회
export const getStadiumDHours = async (fieldId: number, date: string) => {
  try {
    const res: CommonResponse = await defaultInstance.get(
      `/api/stadiums/${fieldId}?date=${date}`,
    );

    // console.log(fieldId);
    // console.log(date);

    // console.log(res);

    return res.data.data;
  } catch (e: any) {
    return {
      status: e.response.status,
    };
  }
};

// 특정 운영 시간의 video 조회
export const getVideoScheduled = async (scheduleId: number) => {
  try {
    const res: CommonResponse = await defaultInstance.get(
      `/api/videos/${scheduleId}`,
    );
    return res.data.data;
  } catch (e: any) {
    return {
      status: e.response.status,
    };
  }
};

// 영상 세부 조회
export const getVideoDetail = async (videoId: number) => {
  try {
    const res: CommonResponse = await authInstance.get(
      `/api/videos/${videoId}/details`,
    );
    return res.data.data;
  } catch (e: any) {
    return {
      status: e.response.status,
    };
  }
};

// 영상 좋아요 추가
export const likesVideo = async (videoId: number) => {
  try {
    const res: CommonResponse = await authInstance.post(
      `/api/videos/${videoId}/likes`,
    );

    return res.data;
  } catch (e: any) {
    return {
      status: e.response.status,
    };
  }
};

// 영상 좋아요 해제
export const unLikeVideo = async (videoId: number) => {
  try {
    const res: CommonResponse = await authInstance.delete(
      `/api/videos/${videoId}/likes`,
    );

    return res.data;
  } catch (e: any) {
    return {
      status: e.response.status,
    };
  }
};

// 존재하는 구장의 위치들 조회
export const getStadiumLocations = async () => {
  try {
    const res: CommonResponse = await defaultInstance.get(
      `/api/stadiums/location`,
    );

    return res.data.data;
  } catch (e: any) {
    return {
      status: e.response.status,
    };
  }
};
