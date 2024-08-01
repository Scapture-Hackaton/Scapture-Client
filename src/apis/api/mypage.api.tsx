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

export const postBanana = async () // banana: number,
: Promise<CommonResponse | undefined> => {
  try {
    const res = await authInstance.post(`api/user/bananas`, 5);
    console.log('Response:', res);
    return res.data;
  } catch (error: any) {
    if (error) console.error('Error: ', error.message);
  }
};

export const getReservation = async (): Promise<CommonResponse | undefined> => {
  try {
    const res = await authInstance.get(`api/user/reservations`);
    console.log('Response:', res);
    return res.data;
  } catch (error) {
    console.error('Error: ', error);
  }
};

export const postSubscribe = async (subscribeData: {
  [key: string]: any;
}): Promise<CommonResponse | undefined> => {
  try {
    const res = await authInstance.post(`api/user/subscribe`, subscribeData);
    console.log('Response:', res);
    return res.data;
  } catch (error) {
    console.error('Error: ', error);
  }
};

export const putSubscribe = async (): Promise<CommonResponse | undefined> => {
  try {
    const res = await authInstance.put(`api/user/subscribe`);
    console.log('Response:', res);
    return res.data;
  } catch (error) {
    console.error('Error: ', error);
  }
};
