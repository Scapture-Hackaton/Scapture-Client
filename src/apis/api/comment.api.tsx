/**
 * Comment 관련 API
 */
import { CommonResponse } from '../dto/common.response';
import { defaultInstance } from '../utils/instance';

// 댓글 전체 조회
export const getComments = async (videoId: string) => {
  try {
    const res: CommonResponse = await defaultInstance.get(
      `api/comments/${videoId}`,
    );
    return res.data;
  } catch (e: any) {
    return {
      status: e.response.status,
    };
  }
};
