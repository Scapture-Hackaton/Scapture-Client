interface imageInfo {
  imageId: number;
  image: string;
}

interface filedInfo {
  fieldId: number;
  name: string;
}

export interface StadiumDetail {
  name: string;
  description: string;
  location: string;
  isOutside: boolean; // true: 실외 & false: 실내
  parking: string;
  images: [imageInfo];
  fields: [filedInfo];
}
