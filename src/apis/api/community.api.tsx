/**
 * Community 관련 api
 */
import { CommonResponse } from '../dto/common.response';
import { authInstance, defaultInstance } from '../utils/instance';

// 인기 영상 조회
export const getPopularVideos = async () => {
  try {
    const res: CommonResponse =
      await defaultInstance.get(`/api/videos/popular`);

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

// 댓글 전체 조회
export const getComments = async (videoId: number) => {
  try {
    const res: CommonResponse = await authInstance.get(
      `/api/comments/${videoId}`,
    );
    return res.data;
  } catch (e: any) {
    return [];
  }
};

// 댓글 작성
export const writeComment = async (videoId: number, content: string) => {
  try {
    const res: CommonResponse = await authInstance.post(`/api/comments`, {
      videoId,
      content,
    });

    return res.data;
  } catch (e: any) {
    return {
      status: e.response.status,
    };
  }
};

// 댓글 좋아요 추가
export const likesComment = async (commentId: number) => {
  try {
    const res: CommonResponse = await authInstance.post(
      `/api/comments/${commentId}/likes`,
    );

    return res.data;
  } catch (e: any) {
    return {
      status: e.response.status,
    };
  }
};

// 댓글 좋아요 해제
export const unLikeComment = async (commentId: number) => {
  try {
    const res: CommonResponse = await authInstance.delete(
      `/api/comments/${commentId}/likes`,
    );

    return res.data;
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
