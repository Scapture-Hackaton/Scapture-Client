export const dummy = {
  status: 200,
  data: {
    stadium: {
      stadiumId: 1,
      name: 'Scapture 구장', // 경기장 이름
      city: '서울시',
      state: '관악구',
      location: '서울특별시 관악구 ~',
      startTime: 10, // 운영시간 - 시작시간
      endTime: 18, // 운영시간 - 마감시간
      environment: 'INDOOR', // INDOOR: 실내, OUTDOOR: 실외, OVERALL: 둘 다
      isParking: true, // 주차 - 가능 여부
      isFree: false, // 주차 - 비용 유무
      description:
        '간단한 소개글 입력 공간입니다.\n구장의 환경, 소재, 이용 방법 등을 간략하게 적어놓을 수 있습니다. 간단한 소개글 입력 공간입니다. 구장의 환경, 소재, 이용 방법 등을 간략하게 적어놓을 수 있습니다.',
    },

    stadiumImages: {
      representImage: {
        imageId: 12,
        url: 'fjlkasjfdjk~',
      },
      images: [
        {
          imageId: 124,
          url: 'http://~ ',
        },
        {
          imageId: 124,
          url: 'http://~ ',
        },
      ],
    },
    fields: [
      {
        fieldId: 1,
        name: '실내 구장',
        isOutside: true,
        type: '5vs5',
        price: 120000,
      },
      {
        fieldId: 1,
        name: '실내 구장',
        isOutside: true,
        type: '5vs5',
        price: 120000,
      },
    ],
  },

  messsage: '관리자 - 경기장 세부 조회 완료되었습니다.',
};
