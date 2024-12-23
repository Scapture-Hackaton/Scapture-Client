/**
 * Stadium - video 관련 api
 */
import { CommonResponse } from '../dto/common.response';
import { authInstance } from '../utils/instance';

// 영상 권한 부여
export const checkAuthDownloadVideo = async (
  videoId: number,
  banana: number,
) => {
  try {
    const res: CommonResponse = await authInstance.post(
      `/api/videos/${videoId}/download`,
      { banana: banana },
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
// export const downloadVideo = async (videoId: number) => {
//   try {
//     const res: CommonResponse = await authInstance.get(
//       `/api/videos/${videoId}/download`,
//     );

//     return res.data;
//   } catch (e: any) {
//     console.log(e);
//     return {
//       status: e.response.status,
//     };
//   }
// };

// 영상 저장하기
export const storeVideo = async (videoId: number) => {
  try {
    const res: CommonResponse = await authInstance.post(
      `/api/videos/${videoId}/store`,
    );

    return res.data;
  } catch (e: any) {
    console.log(e);
    return {
      status: e.response.status,
    };
  }
};

// 영상 저장 해제
export const unStoreVideo = async (videoId: number) => {
  try {
    const res: CommonResponse = await authInstance.delete(
      `/api/videos/${videoId}/store`,
    );

    return res.data;
  } catch (e: any) {
    console.log(e);
    return {
      status: e.response.status,
    };
  }
};

// 원본 영상들 가져오기
export const getOriginalVideos = async (scheduleId: number) => {
  try {
    const res: CommonResponse = await authInstance.get(
      `/api/originals/${scheduleId}`,
    );

    return res.data.data;
  } catch (e: any) {
    console.log(e);
    return {
      status: e.response.status,
    };
  }
};
