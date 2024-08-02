import { atom } from 'recoil';

interface userData {
  endDate: string | null;
  image: string | null;
  location: string | null;
  name: string;
  role: string;
  team: string | null;
}

export const userData = atom<userData>({
  key: 'userData',
  default: {
    endDate: null,
    image: '',
    location: null,
    name: '',
    role: '',
    team: null,
  },
});
