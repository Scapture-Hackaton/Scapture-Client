/**
 * Stadium 관련 API
 */
import { CommonResponse } from '../dto/common.response';
import { defaultInstance, authInstance } from '../utils/instance';

// 영상 권한 부여
export const checkAuthDownloadVideo = async (videoId: number) => {
  try {
    const res: CommonResponse = await authInstance.post(
      `api/videos/${videoId}/download`,
    );

    return res.data;
  } catch (e: any) {
    console.log(e);
    return {
      status: e.response.status,
    };
  }
};

// 영상 권한 확인
export const downloadVideo = async (videoId: number) => {
  try {
    const res: CommonResponse = await authInstance.get(
      `api/videos/${videoId}/download`,
    );

    return res.data;
  } catch (e: any) {
    console.log(e);
    return {
      status: e.response.status,
    };
  }
};
