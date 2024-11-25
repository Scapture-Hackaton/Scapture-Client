/**
 * 유저 정보 관련 API
 */
import { PaymentRequestDto } from '../../common/component/Payment/dto/request.dto';
import { CommonResponse } from '../dto/common.response';
import { authInstance } from '../utils/instance';

//버내너 개수 가져오기
export const getBananaCnt = async () => {
  try {
    const token = localStorage.getItem('TOKEN');
    const type = localStorage.getItem('LoginType');

    if (token && type) {
      const res: CommonResponse = await authInstance.get(`/api/user/bananas`);
      return res.data;
    } else {
      return null;
    }
  } catch (e: any) {
    return {
      status: e.response.status,
    };
  }
};

// 하이라이트 요청
export const postHighlight = async (scheduleId: number) => {
  try {
    const res: CommonResponse = await authInstance.post(
      `/api/highlights/${scheduleId}`,
    );
    return res.data;
  } catch (e: any) {
    return {
      status: e.response.status,
    };
  }
};

// 결제 임시 요청
export const postTempReqPay = async (req: PaymentRequestDto) => {
  try {
    const res: CommonResponse = await authInstance.post(`/api/payments`, req);
    return res.data;
  } catch (e: any) {
    return {
      status: e.response.status,
    };
  }
};
