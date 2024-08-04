import { useEffect } from 'react';

const LoginCallBack = () => {
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    console.log('Authorization code:', queryParams);
    const code = queryParams.get('code');
    console.log('Authorization code:', code);
    if (code) {
      console.log('Authorization code:', code);
    }
  }, []);
  return <h1>카카오 로그인 중...</h1>;
};
export default LoginCallBack;
