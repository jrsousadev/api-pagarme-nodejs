import { TransactionDTO } from "../DTO/TransactionDTO";
import type { PaymentType, Status } from "@prisma/client";

export interface CreateTransactionData {
  cartCode: string;
  code: string;
  status: Status;

  total: number;
  paymentType: PaymentType;
  installments: number;

  customerName: string;
  customerEmail: string;
  customerMobile: string;
  customerDocument: string;

  billingAddress: string;
  billingNumber: string;
  billingNeighborhood: string;
  billingCity: string;
  billingState: string;
  billingZipCode: string;
  billingComplementary: string;
}

export interface ReadOneTransactionData {
  id?: string;
  code?: string;
  transactionId?: string;
}

export interface UpdateTransactionData {
  id: string;
  status?: string;
  transactionId?: string;
  pixQRCODE?: string;
  pixExpiration?: string;
  billetBarcode?: string;
  billetExpiration?: string;
  billetUrl?: string;
}

export interface DeleteTransactionData {
  id: string;
}

export interface TransactionRepository {
  create: (data: CreateTransactionData) => Promise<TransactionDTO>;
  readOne: (data: ReadOneTransactionData) => Promise<TransactionDTO | null>;
  readAll: () => Promise<TransactionDTO[]>;
  update: (data: UpdateTransactionData) => Promise<TransactionDTO>; 
  delete: (data: DeleteTransactionData) => Promise<void>;
}