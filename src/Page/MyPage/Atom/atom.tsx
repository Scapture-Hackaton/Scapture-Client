import { atom } from 'recoil';

interface userData {
  endDate: string | null;
  image: string | null;
  location: string | null;
  name: string;
  role: string;
  team: string | null;
}

interface bananaData {
  balance: number;
  subscribed: boolean;
}

export const userData = atom<userData>({
  key: 'userData',
  default: {
    endDate: null,
    image: 'undefined',
    location: null,
    name: 'undefined',
    role: 'undefined',
    team: null,
  },
});

export const bananaData = atom<bananaData>({
  key: 'bananaData',
  default: {
    balance: 0,
    subscribed: false,
  },
});
