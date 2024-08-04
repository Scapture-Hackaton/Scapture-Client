import { atom } from 'recoil';

// export const LoginResponse = atom<string>({
//   // 전역적으로 고유해야함
//   key: 'LoginResponse',
//   default: '',
// });

export interface loginData {
  state: boolean;
}

export const loginDataAtom = atom<loginData>({
  key: 'loginData',
  default: {
    state: false,
  },
});
