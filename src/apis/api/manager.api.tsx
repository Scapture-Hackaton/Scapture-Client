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
