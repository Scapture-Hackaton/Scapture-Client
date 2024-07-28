import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = `http://${process.env.SERVER_URL}:${process.env.SERVER_PORT}/`;
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
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const authFileApi = axios.create({
  // baseURL: BASE_URL,
  headers: { 'Content-Type': 'multipart/form-data; charset: UTF-8;' },
});

authFileApi.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const defaultInstance = defaultApi;
export const authInstance = authApi;
export const authFileInstance = authFileApi;
