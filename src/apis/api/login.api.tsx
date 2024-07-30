/**
 * login 관련 API
 */
import { CommonResponse } from '../dto/common.response';
import { authInstance } from '../utils/instance';

//로그인 코큰

export const LoginKAKAOToken = async (code: string) => {
  try {
    const res: CommonResponse = await authInstance.post(
      `api/oauth/social/kakao?code=${code}`,
    );
    const TOKEN = res.data.token;
    localStorage.setItem('TOKEN', TOKEN);
    console.log('Response:', res);
    return res;
  } catch (e: any) {
    console.error('Error : Failed to fetch token:', e);
  }
};
