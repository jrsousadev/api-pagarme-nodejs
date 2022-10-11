import type { PaymentType, Status } from "@prisma/client";

export interface TransactionDTO {
  id: string;
  cartCode: string;
  
  status: Status;
  paymentType: PaymentType;
  installments: number;
  total: number;

  pixQRCODE: string;
  pixExpiration: string;

  billetBarcode: string;
  billetExpiration: string;
  billetUrl: string;

  customerEmail: string;
  customerName: string;
  customerMobile: string;
  customerDocument: string;

  billingAddress: string;
  billingNumber: string;
  billingNeighborhood: string;
  billingCity: string;
  billingState: string;
  billingZipCode: string;
}
