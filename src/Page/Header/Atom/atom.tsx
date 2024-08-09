import { atom } from 'recoil';

// export const LoginResponse = atom<string>({
//   // 전역적으로 고유해야함
//   key: 'LoginResponse',
//   default: '',
// });

export interface loginData {
  state: boolean;
}

export interface headerState {
  state: number | null;
}

export const loginDataAtom = atom<loginData>({
  key: 'loginData',
  default: {
    state: false,
  },
});

export const headerState = atom<headerState>({
  key: 'headerState',
  default: {
    state: null,
  },
});
