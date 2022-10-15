import { PaymentType, Status } from "@prisma/client";

export const getPaymentType = (paymentType: string) => {
  if (paymentType === PaymentType.credit_card) {
    return PaymentType.credit_card;
  }

  if (paymentType === PaymentType.pix) {
    return PaymentType.pix;
  }

  if (paymentType === PaymentType.billet) {
    return PaymentType.billet;
  }

  return "";
};

export const getStatusType = (status: string | undefined) => {
  if (typeof status !== "undefined") {
    if (status === Status.started) return Status.started;
    if (status === Status.approved) return Status.approved;
    if (status === Status.chargeback) return Status.chargeback;
    if (status === Status.error) return Status.error;
    if (status === Status.pending) return Status.pending;
    if (status === Status.processing) return Status.processing;
    if (status === Status.refunded) return Status.refunded;
    if (status === Status.refused) return Status.refused;
  }
};
