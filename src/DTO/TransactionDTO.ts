import type { PaymentType, Status } from "@prisma/client";

export interface TransactionDTO {
  code: string;
  id: string;
  cartCode: string;
  
  status: Status;
  paymentType: PaymentType;
  installments: number;
  total: number;

  pixQRCODE: string | null;
  pixExpiration: string | null;

  billetBarcode: string | null;
  billetExpiration: string | null;
  billetUrl: string | null;

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
