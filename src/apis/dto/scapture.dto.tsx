export interface Stadium {
  stadiumId: number;
  name: string;
  location: string;
  hours: string;
  environment: string;
  // isOutside: boolean; // true: 실외 & false: 실외
  isParking: boolean;
  // parking: string;
  isFree: boolean;
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
  isFree: boolean;
  hours: string;
  images: StadiumImage[];
  fields: StadiumFileds[];
}

export interface StadiumHoursData {
  scheduleId: number;
  hours: string;
  videoCount: number;
}

export interface ScheduleVideosDTO {
  isDownload: boolean;
  videos: ScheduleVideo[];
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

export interface VideoDetail {
  name: string;
  image: string;
  video: string;
  isLiked: boolean;
  likeCount: number;
  isStored: boolean;
  views: number;
  stadium: {
    name: string;
    description: string;
    location: string;
    isOutside: boolean; // true: 실외 & false: 실내
    isFree: boolean;
  };

  videos: {
    beforeVideo: number;
    afterVideo: number;
  };
}
