import { CommonResponse } from '../dto/common.response';
import { authInstance } from '../utils/instance';

//프로필 정보 (get)
export const getProfile = async (): Promise<CommonResponse | undefined> => {
  try {
    const res = await authInstance.get(`/api/user/profile`);
    // console.log('Response:', res);
    return res.data;
  } catch (error) {
    // console.error('Error: ', error);
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('LoginType');
  }
};

//프로필 편집(put)
// export const putProfile = async (
//   profileData: { [key: string]: any },
//   imageFile: File | null,
// ): Promise<CommonResponse | undefined> => {
//   const formData = new FormData();
//   formData.append(
//     'data',
//     new Blob([JSON.stringify(profileData)], { type: 'application/json' }),
//   );

//   if (imageFile) {
//     formData.append('image', imageFile);
//   }

//   try {
//     const res = await authInstance.put('/api/user/profile', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     return res.data;
//   } catch (error) {
//     console.error('Error: ', error);
//   }
// };
export const putProfile = async (
  formData: FormData,
): Promise<CommonResponse | undefined> => {
  try {
    const res = await authInstance.put('/api/user/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (error) {
    console.error('Error: ', error);
  }
};

//버내너 정보(get)
export const getBanana = async (): Promise<CommonResponse | undefined> => {
  try {
    const res = await authInstance.get(`/api/user/bananas`);
    // console.log('Response:', res);
    return res.data;
  } catch (error) {
    console.error('Error: ', error);
  }
};

//버내너 충전(post)
export const postBanana = async (
  banana: number, // banana: number,
): Promise<CommonResponse | undefined> => {
  try {
    const res = await authInstance.post(`/api/user/bananas`, banana);
    // console.log('Response:', res);
    return res.data;
  } catch (error: any) {
    if (error) console.error('Error: ', error.message);
  }
};

//예약 정보(get)
export const getReservation = async (): Promise<CommonResponse | undefined> => {
  try {
    const res = await authInstance.get(`/api/user/reservations`);
    // console.log('Response:', res);
    return res.data;
  } catch (error) {
    console.error('Error: ', error);
  }
};

//구독 요청(post)
//subscribeData가 requestBody에 필요 없는지 확인 필요
export const postSubscribe = async (subscribeData: {
  [key: string]: any;
}): Promise<CommonResponse | undefined> => {
  try {
    const res = await authInstance.post(`/api/user/subscribe`, subscribeData);
    // console.log('Response:', res);
    return res.data;
  } catch (error) {
    console.error('Error: ', error);
  }
};

//구독 갱신(put)
export const putSubscribe = async (): Promise<CommonResponse | undefined> => {
  try {
    const res = await authInstance.put(`/api/user/subscribe`);
    // console.log('Response:', res);
    return res.data;
  } catch (error) {
    console.error('Error: ', error);
  }
};

export const getSortVideoLatest = async (): Promise<
  CommonResponse | undefined
> => {
  try {
    const res = await authInstance.get(`/api/videos/store`);
    return res.data;
  } catch (error) {
    console.error('Error: ', error);
  }
};

export const getSortVideoPopularity = async (): Promise<
  CommonResponse | undefined
> => {
  try {
    const res = await authInstance.get(`/api/videos/store?sort=popularity`);
    return res.data;
  } catch (error) {
    console.error('Error: ', error);
  }
};

export const getSortVideo = async (
  type: string,
): Promise<CommonResponse | undefined> => {
  try {
    const res = await authInstance.get(`/api/videos/store?sort=${type}`);
    return res.data;
  } catch (error) {
    console.error('Error: ', error);
  }
};

export const deleteUser = async (
  reasons: number[],
): Promise<CommonResponse | undefined> => {
  try {
    const res = await authInstance.delete(`/api/user`, { data: { reasons } });
    return res.data;
  } catch (error) {
    console.error('Error: ', error);
  }
};
