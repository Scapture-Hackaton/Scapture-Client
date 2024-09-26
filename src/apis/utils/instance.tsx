import axios from 'axios';

const BASE_URL = `http://${import.meta.env.VITE_SERVER_URL}:${import.meta.env.VITE_SERVER_PORT}/`;

// const BASE_URL = `http://localhost:8080/`;

const defaultApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

authApi.interceptors.request.use(config => {
  const token = localStorage.getItem('TOKEN');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터에서 토큰 만료 처리
authApi.interceptors.response.use(
  response => response, // 성공 응답은 그대로 반환
  error => {
    if (error.response && error.response.status === 401) {
      // 401 Unauthorized 응답일 때 토큰 만료 처리
      console.error('토큰이 만료되었습니다. 로그아웃 처리 중...');

      // 로컬 스토리지에서 토큰 삭제
      localStorage.removeItem('TOKEN');
      localStorage.removeItem('LoginType');

      return Promise.reject(
        new Error('토큰이 만료되었습니다. 다시 로그인해 주세요.'),
      );
    }

    return Promise.reject(error);
  },
);

const authFileApi = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'multipart/form-data; charset: UTF-8;' },
});

authFileApi.interceptors.request.use(config => {
  const token = localStorage.getItem('TOKEN');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const defaultInstance = defaultApi;
export const authInstance = authApi;
export const authFileInstance = authFileApi;
