import { atom } from 'recoil';
import {
  userData,
  bananaData,
  subscribedData,
} from '../../MyPage/dto/atom.interface';

export const userDataAtom = atom<userData>({
  key: 'userData',
  default: {
    endDate: null, // null로 초기화하여 명확하게 처리
    image: undefined,
    location: 'KOREA',
    name: 'undefined', // string 타입을 유지
    role: 'undefined',
    team: 'SCAPTURE',
  },
});

export const bananaDataAtom = atom<bananaData>({
  key: 'bananaData',
  default: {
    balance: 0,
    subscribed: false,
  },
});

export const subscribedAtom = atom<subscribedData>({
  key: 'subscribedData',
  default: {
    subscribed: false,
  },
});
