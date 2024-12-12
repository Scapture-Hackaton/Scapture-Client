import { CommonResponse } from '../dto/common.response';
import { defaultInstance } from '../utils/instance';

export const getHighlightsForManager = async () => {
  try {
    const res: CommonResponse = await defaultInstance.get(`/api/highlights`);

    return res.data.data;
  } catch (e: any) {
    return {
      status: e.response.status,
    };
  }
};

export const getHighlightsForManagerWithScheduleId = async (
  scheduleId: string,
) => {
  try {
    const res: CommonResponse = await defaultInstance.get(
      `/api/highlights/${scheduleId}`,
    );

    return res.data.data;
  } catch (e: any) {
    return {
      status: e.response.status,
    };
  }
};

export const getUserForManager = async (userName: string) => {
  try {
    const res: CommonResponse = await defaultInstance.get(
      `/api/user/search?name=${userName}`,
    );

    return res.data.data;
  } catch (e: any) {
    return {
      status: e.response.status,
    };
  }
};

export const getUserDetailForManager = async (userId: string) => {
  try {
    const res: CommonResponse = await defaultInstance.get(
      `/api/user/${userId}/detail`,
    );

    return res.data.data;
  } catch (e: any) {
    return {
      status: e.response.status,
    };
  }
};

export const giveUserBananas = async (userId: string, balance: string) => {
  try {
    const res: CommonResponse = await defaultInstance.post(
      `/api/user/${userId}/bananas`,
      { balance },
    );

    return res.data.data;
  } catch (e: any) {
    return {
      status: e.response.status,
    };
  }
};
