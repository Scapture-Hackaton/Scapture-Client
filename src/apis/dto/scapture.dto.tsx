export interface Stadium {
  stadiumId: number;
  name: string;
  location: string;
  hours: string;
  isOutside: boolean; // true: 실외 & false: 실외
  parking: string;
  image: string;
}

interface StadiumImage {
  imageId: number;
  image: string;
}

export interface StadiumFileds {
  fieldId: number;
  name: string;
}

export interface StadiumDetail {
  name: string;
  description: string;
  location: string;
  isOutside: boolean; // true: 실외 & false: 실내
  parking: string;
  hours: string;
  images: StadiumImage[];
  fields: StadiumFileds[];
}

export interface StadiumHoursData {
  scheduleId: number;
  hours: string;
  videoCount: number;
}

export interface ScheduleVideo {
  videoId: number;
  name: string;
  image: string;
  stadiumName: string;
  views: number;
  date: string;
  hours: string;
}
