/**
 * Community 관련 API
 */
import { CommonResponse } from '../dto/common.response';
import { authInstance, defaultInstance } from '../utils/instance';

// 인기 영상 조회
export const getPopularVideos = async () => {
  try {
    const res: CommonResponse = await defaultInstance.get(`api/videos/popular`);
    return res.data;
  } catch (e: any) {
    return {
      status: e.response.status,
    };
  }
};

// 댓글 전체 조회
export const getComments = async (videoId: number) => {
  try {
    const res: CommonResponse = await defaultInstance.get(
      `api/comments/${videoId}`,
    );
    return res.data;
  } catch (e: any) {
    return [];
  }
};

// 댓글 작성
export const writeComment = async (videoId: number, content: string) => {
  try {
    const res: CommonResponse = await authInstance.post(`api/comments`, {
      videoId,
      content,
    });
    console.log(res);

    return res.data;
  } catch (e: any) {
    console.log(e);
    return {
      status: e.response.status,
    };
  }
};
