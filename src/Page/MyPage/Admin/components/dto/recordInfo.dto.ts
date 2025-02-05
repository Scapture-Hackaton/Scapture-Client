export interface RecordInfoDto {
  field: string;
  time: string;
}

export interface RecordedList {
  scheduleId: number;
  name: string;
  date: string;
  fieldName: string;
  hours: string;
}

export interface OriginalVideoItemDto {
  name: string;
  url: string;
  imageUrl: string;
}
