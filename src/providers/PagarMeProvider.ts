import { cpf } from "cpf-cnpj-validator";
import { AppError } from "../shared/errors/AppError";
import pagarme from "pagarme";

interface Customer {
  email: string;
  name: string;
  document: string;
  mobile: string;
}
interface CreditCard {
  number: string;
  expiration: string;
  cvv: string;
  holderName: string;
}
interface Billing {
  name: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  zipcode: string;
  complementary: string;
}
interface Item {
  id: string;
  title: string;
  amount: number;
  quantity: number;
}
interface PagarMeProviderData {
  transactionCode: string;
  paymentType: string;
  total: number;
  installments: number;
  creditCard: CreditCard;
  customer: Customer;
  billing: Billing;
  items: Item[];
  pixExpirationDate: string;
}
interface CreateBillingParamsData {
  billing: Billing;
}
interface CreateItemsParams {
  items: Item[];
  transactionCode: string;
  total: number;
}

export class PagarMeProvider {
  private createBillingParams(data: CreateBillingParamsData) {
    const billing = {
      name: data.billing.name,
      address: {
        country: "br",
        state: data.billing.state,
        city: data.billing.city,
        neighborhood: data.billing.neighborhood,
        street: data.billing.street,
        street_number: data.billing.number,
        zipcode: data.billing.zipcode.replace(/[^?0-9]/g, ""),
        complementary: data.billing.complementary,
      },
    };

    return billing;
  }

  private createItemsParams({
    items,
    total,
    transactionCode,
  }: CreateItemsParams) {
    if (items && items.length <= 0) {
      const itemsData = {
        items: [
          {
            id: "1",
            title: `t-${transactionCode}`,
            unit_price: total * 100,
            quantity: 1,
            tangible: false,
          },
        ],
      };

      return itemsData;
    }

    const itemsData = {
      items: items.map((item: Item) => ({
        id: item?.id.toString(),
        title: item?.title,
        unit_price: item?.amount * 100,
        quantity: item?.quantity || 1,
        tangible: false,
      })),
    };

    return itemsData;
  }

  public translateStatus(status: string): string {
    const statusMap: any = {
      processing: "processing",
      waiting_payment: "pending",
      authorized: "pending",
      paid: "approved",
      refused: "refused",
      pending_refund: "refunded",
      refunded: "refunded",
      chargedback: "chargeback",
    };

    return statusMap[status];
  }

  private translatePaymentType(
    payment: string
  ): "credit_card" | "boleto" | "pix" {
    const paymentTypeMap: any = {
      credit_card: "credit_card",
      pix: "pix",
      billet: "boleto",
    };

    return paymentTypeMap[payment];
  }

  async process({
    billing,
    creditCard,
    customer,
    installments,
    items,
    paymentType,
    total,
    transactionCode,
    pixExpirationDate,
  }: PagarMeProviderData) {
    let methodPaymentParams: any = {};
    const billingParams = this.createBillingParams({ billing });
    const payment_method = this.translatePaymentType(paymentType);
    const itemsParams = this.createItemsParams({
      items,
      total,
      transactionCode,
    });

    if (payment_method === "credit_card") {
      methodPaymentParams = {
        card_cvv: creditCard.cvv.replace(/[^?0-9]/g, ""),
        card_expiration_date: creditCard.expiration.replace(/[^?0-9]/g, ""),
        card_holder_name: creditCard.holderName,
        card_number: creditCard.number.replace(/[^?0-9]/g, ""),
      };
    }

    if (payment_method === "pix") {
      methodPaymentParams = {
        pix_expiration_date: pixExpirationDate,
      };
    }

    try {
      const client = await pagarme.client.connect({
        api_key: process.env.PAGARME_API_KEY,
      });

      const response = await client.transactions.create({
        amount: total * 100,
        installments: String(
          paymentType === "pix" || paymentType === "billet" ? "1" : installments
        ),
        payment_method: payment_method,
        items: itemsParams.items,

        ...methodPaymentParams,

        billing: billingParams,

        customer: {
          external_id: customer.email,
          name: customer.name,
          email: customer.email,
          type: cpf.isValid(customer.document) ? "individual" : "corporation",
          country: "br",
          phone_numbers: [customer.mobile],
          documents: [
            {
              type: cpf.isValid(customer.document) ? "cpf" : "cnpj",
              number: customer.document.replace(/[^?0-9]/g, ""),
            },
          ],
        },

        metadata: transactionCode,
        capture: paymentType === "credit_card" ? true : false,
        async: false,
        postback_url: process.env.PAGARME_WEBHOOK_URL,
      });

      let capture: any = {};
      if (response.payment_method !== "credit_card") {
        capture = await client.transactions.capture({
          amount: response.amount,
          id: String(response.id),
        });
      }

      return {
        transactionId: response.id,
        status:
          response.payment_method !== "credit_card"
            ? this.translateStatus(capture.status)
            : this.translateStatus(response.status),
        card: {
          id: response.acquirer_id,
        },
        pix: {
          qrcode: capture?.pix_qr_code,
          expiration: capture?.pix_expiration_date,
        },
        billet: {
          url: capture?.boleto_url,
          barcode: capture?.boleto_barcode,
          expiration: capture?.boleto_expiration_date,
        },
      };
    } catch (err) {
      throw new AppError("Internal server error");
    }
  }
}
