/**
 * Stadium - video 관련 API
 */
import { CommonResponse } from '../dto/common.response';
import { authInstance, defaultInstance } from '../utils/instance';

// 구장 예약
export const reserveField = async (scheduleId: number) => {
  try {
    const res: CommonResponse = await authInstance.post(
      `api/reservations/${scheduleId}`,
    );

    return res.data;
  } catch (e: any) {
    console.log(e);
    return {
      status: e.response.status,
    };
  }
};

// 구장 예약 일정 조회
export const getReservationList = async (
  stadiumId: number,
  fieldId: number,
  date: string,
) => {
  try {
    const res: CommonResponse = await defaultInstance.get(
      `api/reservations/${stadiumId}/${fieldId}?date=${date}`,
    );

    return res.data.data;
  } catch (e: any) {
    console.log(e);
    return {
      status: e.response.status,
    };
  }
};

// 구장 예약 일정 조회
// export const getReservationList = async (stadiumId: number, date: string) => {
//   try {
//     const res: CommonResponse = await authInstance.get(
//       `api/reservations/${stadiumId}?date=${date}`,
//     );

//     return res.data.data;
//   } catch (e: any) {
//     console.log(e);
//     return {
//       status: e.response.status,
//     };
//   }
// };
