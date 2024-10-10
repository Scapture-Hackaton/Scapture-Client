/**
 * login 관련 API
 */
import { CommonResponse } from '../dto/common.response';
import { defaultInstance } from '../utils/instance';

//로그인 코큰
export const LoginToken = async (code: string, type: string) => {
  // console.log(code);

  //Object
  const APIURL: { [key: string]: string } = {
    kakao: `/api/oauth/social/kakao?code=${code}`,
    naver: `/api/oauth/social/naver?code=${code}&state=hLiDdL2uhPtsftcU`,
    google: `/api/oauth/social/google?code=${code}`,
  };

  const url = APIURL[type];

  try {
    const res: CommonResponse = await defaultInstance.post(url);
    const TOKEN = res.data.data.token || res.data.token;
    localStorage.setItem('TOKEN', TOKEN);

    window.location.reload();
    // if (!localStorage.getItem('RELOADED')) {
    //   localStorage.setItem('RELOADED', 'true');
    // } else {
    //   localStorage.removeItem('RELOADED');
    // }

    // console.log('TOKEN:', TOKEN);
    return res;
  } catch (error) {
    // console.error('Error: Failed to fetch token:', error);
  }
};
