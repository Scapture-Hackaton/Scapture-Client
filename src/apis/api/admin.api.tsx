import { StadiumBasicInfoDto } from '../dto/admin.dto';
import { CommonResponse } from '../dto/common.response';
import { authInstance } from '../utils/instance';

// 관리 중인 구장 리스트 정보 (get)
export const getManageStadium = async (): Promise<
  CommonResponse | undefined
> => {
  try {
    const res = await authInstance.get(`api/manages/stadiums`);

    return res.data;
  } catch (error) {
    console.error('Error: ', error);
  }
};

// 관리 중인 구장 디테일 정보 (get)
export const getManageStadiumDetail = async (
  stadiumId: number,
): Promise<CommonResponse | undefined> => {
  try {
    const res = await authInstance.get(`api/manages/stadiums/${stadiumId}`);

    return res.data;
  } catch (error) {
    console.error('Error: ', error);
  }
};

// 구장 생성하기 (post)
export const postStadium = async (
  content: StadiumBasicInfoDto,
): Promise<CommonResponse | undefined> => {
  try {
    const res = await authInstance.post(`api/manages/stadiums`, content);

    return res.data;
  } catch (error) {
    console.error('Error: ', error);
  }
};

// export const postStadiumImages = async (
//   stadiumId: number,
// ): Promise<CommonResponse | undefined> => {
//   try {
//     const res = await authInstance.post(
//       `api/manages/stadiums/${stadiumId}/images`,
//     );

//     return res.data;
//   } catch (error) {
//     console.error('Error: ', error);
//   }
// };

export const postStadiumImages = async (
  stadiumId: number,
  formData: FormData,
): Promise<CommonResponse | undefined> => {
  try {
    const res = await authInstance.post(
      `api/manages/stadiums/${stadiumId}/images`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return res.data;
  } catch (error) {
    console.error('Error: ', error);
  }
};

export const postField = async (
  stadiumId: number,
  formData: FormData,
): Promise<CommonResponse | undefined> => {
  try {
    const res = await authInstance.post(
      `api/manages/fields/${stadiumId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return res.data;
  } catch (error) {
    console.error('Error: ', error);
  }
};
