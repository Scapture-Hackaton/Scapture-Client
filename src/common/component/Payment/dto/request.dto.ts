export interface PaymentRequestDto {
  orderId: string;
  amount: number;
  type: string;
  resource: string;
}
