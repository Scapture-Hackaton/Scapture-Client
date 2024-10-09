export interface FieldDto {
  fieldId: number;
  images: {
    imageId: number;
    url: string;
  }[];
  name: string;
  isOutside: boolean;
  type: string;
  price: number;
}
