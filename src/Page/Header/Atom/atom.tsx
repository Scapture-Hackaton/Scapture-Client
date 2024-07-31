import { atom } from 'recoil';

export const LoginResponse = atom({
  // 전역적으로 고유해야함
  key: 'LoginResponse',
  default: [],
});
