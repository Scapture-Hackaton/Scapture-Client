export interface ReservationDto {
  scheduleId: number;
  name: string;
  type: string;
  hours: string;
  date: string;
  isReserved: boolean;
  price: number;
}
