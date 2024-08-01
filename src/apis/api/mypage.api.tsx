import { CommonResponse } from '../dto/common.response';
import { authInstance } from '../utils/instance';

export const getProfile = async (): Promise<CommonResponse | undefined> => {
  try {
    const res = await authInstance.get(`api/user/profile`);
    console.log('Response:', res);
    return res.data;
  } catch (error) {
    console.error('Error: ', error);
  }
};

export const putProfile = async (
  profileData: { [key: string]: any },
  imageFile: File,
): Promise<CommonResponse | undefined> => {
  const formData = new FormData();
  formData.append(
    'data',
    new Blob([JSON.stringify(profileData)], { type: 'application/json' }),
  );
  formData.append('image', imageFile);

  try {
    const res = await authInstance.put('api/user/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Response:', res);
    return res.data;
  } catch (error) {
    console.error('Error: ', error);
  }
};

export const getBanana = async (): Promise<CommonResponse | undefined> => {
  try {
    const res = await authInstance.get(`api/user/bananas`);
    console.log('Response:', res);
    return res.data;
  } catch (error) {
    console.error('Error: ', error);
  }
};
