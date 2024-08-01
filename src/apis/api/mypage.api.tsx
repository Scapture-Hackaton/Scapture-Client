import { CommonResponse } from '../dto/common.response';
import { authInstance } from '../utils/instance';

export const getProfile = async () => {
  try {
    const res: CommonResponse = await authInstance.get(`api/user/profile`);
    console.log('Response:', res);
  } catch (error) {
    console.error('Error: ', error);
  }
};
