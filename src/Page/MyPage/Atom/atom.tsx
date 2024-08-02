import { atom } from 'recoil';
import { userData, bananaData } from '../../MyPage/dto/atom.interface';

export const userDataAtom = atom<userData>({
  key: 'userData',
  default: {
    endDate: null,
    image: null,
    location: 'KOREA',
    name: 'undefined',
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
