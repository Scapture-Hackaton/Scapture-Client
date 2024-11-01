import { StadiumBasicInfoDto } from '../dto/admin.dto';
import { CommonResponse } from '../dto/common.response';
import { authInstance } from '../utils/instance';

// 관리 중인 구장 리스트 정보 (get)
export const getManageStadium = async (): Promise<
  CommonResponse | undefined
> => {
  try {
    const res = await authInstance.get(`/api/manages/stadiums`);

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
    const res = await authInstance.get(`/api/manages/stadiums/${stadiumId}`);

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
    const res = await authInstance.post(`/api/manages/stadiums`, content);

    return res.data;
  } catch (error) {
    console.error('Error: ', error);
  }
};

export const putStadium = async (
  stadiumId: number,
  content: StadiumBasicInfoDto,
): Promise<CommonResponse | undefined> => {
  try {
    const res = await authInstance.put(
      `/api/manages/stadiums/${stadiumId}`,
      content,
    );

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
//       `/api/manages/stadiums/${stadiumId}/images`,
//     );

//     return res.data;
//   } catch (error) {
//     console.error('Error: ', error);
//   }
// };

// 구장 이미지 생성 (post)
export const postStadiumImages = async (
  stadiumId: number,
  formData: FormData,
): Promise<CommonResponse | undefined> => {
  try {
    const res = await authInstance.post(
      `/api/manages/stadiums/${stadiumId}/images`,
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

// 구장 이미지 생성 (delete)
export const deleteImage = async (
  imageId: number,
): Promise<CommonResponse | undefined> => {
  try {
    const res = await authInstance.delete(`/api/manages/images/${imageId}`);

    return res.data;
  } catch (error) {
    console.error('Error: ', error);
  }
};

// 구역 생성 (post)
export const postField = async (
  stadiumId: number,
  formData: FormData,
): Promise<CommonResponse | undefined> => {
  try {
    const res = await authInstance.post(
      `/api/manages/fields/${stadiumId}`,
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

export const putField = async (
  fieldId: number,
  formData: FormData,
): Promise<CommonResponse | undefined> => {
  try {
    const res = await authInstance.put(
      `/api/manages/fields/${fieldId}`,
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

// 구역 삭제
export const deleteField = async (
  fieldId: number,
): Promise<CommonResponse | undefined> => {
  try {
    const res = await authInstance.delete(`api/manages/fields/${fieldId}`);

    return res.data;
  } catch (error) {
    console.error('Error: ', error);
  }
};

// 녹화 시작 (post)
export const startRecording = async (
  fieldId: number,
  time: number,
): Promise<CommonResponse | undefined> => {
  try {
    const res = await authInstance.post(
      `/api/records/${fieldId}/start?time=${time}`,
    );

    return res.data;
  } catch (error) {
    console.error('Error: ', error);
  }
};

export const stopRecording = async (
  fieldId: number,
): Promise<CommonResponse | undefined> => {
  try {
    const res = await authInstance.post(`/api/records/${fieldId}/stop`);

    return res.data;
  } catch (error) {
    console.error('Error: ', error);
  }
};
