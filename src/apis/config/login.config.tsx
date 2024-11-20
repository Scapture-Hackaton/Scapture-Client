// kakao Login for Token
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&response_type=code&prompt=login&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}?location=`;

export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=code&scope=email%20profile&prompt=login`;

export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${import.meta.env.VITE_NAVER_CLIENT_ID}&response_type=code&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&state=hLiDdL2uhPtsftcU&prompt=login`;
