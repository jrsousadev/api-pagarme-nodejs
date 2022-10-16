import { inject, injectable } from "tsyringe";
import { AppError } from "../../errors/AppError";
import {
  CreateTransactionData,
  TransactionRepository,
} from "../../../repositories/TransactionRepository";
import { CartRepository } from "../../../repositories/CartRepository";
import { uuid } from "uuidv4";
import { getPaymentType, getStatusType } from "../../utils/getTypesPrisma";
import { parsePhoneNumber } from "libphonenumber-js";
import { PagarMeProvider } from "../../../providers/PagarMeProvider";

interface CreateTransactionUseCaseData {
  billingAddress: string;
  billingCity: string;
  billingNeighborhood: string;
  billingNumber: string;
  billingState: string;
  billingZipCode: string;
  billingComplementary: string;
  cartCode: string;
  customerDocument: string;
  customerEmail: string;
  customerMobile: string;
  customerName: string;
  installments: number;
  paymentType: string;
  creditCardNumber: string;
  creditCardExpiration: string;
  creditCardHolderName: string;
  creditCardCvv: string;
  pixExpirationDate: string;
}

@injectable()
export class CreateTransactionUseCase {
  constructor(
    @inject("TransactionRepository")
    private transactionRepository: TransactionRepository,

    @inject("CartRepository")
    private cartRepository: CartRepository,

    @inject("PagarMeProvider")
    private pagarMeProvider: PagarMeProvider
  ) {}

  execute = async ({
    billingAddress,
    billingCity,
    billingNeighborhood,
    billingNumber,
    billingState,
    billingZipCode,
    cartCode,
    customerDocument,
    customerEmail,
    customerMobile,
    customerName,
    installments,
    paymentType,
    creditCardCvv,
    creditCardExpiration,
    creditCardHolderName,
    creditCardNumber,
    billingComplementary,
    pixExpirationDate,
  }: CreateTransactionUseCaseData) => {
    const cart = await this.cartRepository.readOne({ code: cartCode });
    if (!cart) throw new AppError("Cart was not found", 400);

    let code = uuid();

    const codeIsExist = await this.transactionRepository.readOne({ code });
    if (codeIsExist) code = uuid();

    const initalStatus = "started";
    const paymentTypeValid = getPaymentType(paymentType);
    const statusValid = getStatusType(initalStatus);

    if (paymentTypeValid === "" || statusValid === undefined) {
      throw new AppError(`${paymentType} or status invalid`, 400);
    }

    const infosTransaction: CreateTransactionData = {
      cartCode: String(cart.id),
      code,
      total: cart.price,
      status: statusValid,
      paymentType: paymentTypeValid,
      installments,
      customerName,
      customerEmail,
      customerDocument,
      customerMobile: parsePhoneNumber(customerMobile, "BR").format("E.164"),
      billingAddress,
      billingCity,
      billingNeighborhood,
      billingNumber,
      billingState,
      billingZipCode,
      billingComplementary,
    };

    const transaction = await this.transactionRepository.create(
      infosTransaction
    );

    const creditCard = {
      number: creditCardNumber,
      holderName: creditCardHolderName,
      expiration: creditCardExpiration,
      cvv: creditCardCvv,
    };
    const customer = {
      name: customerName,
      email: customerEmail,
      document: customerDocument,
      mobile: parsePhoneNumber(customerMobile, "BR").format("E.164"),
    };
    const billing = {
      name: "Billing Address",
      state: billingState,
      city: billingCity,
      street: billingAddress,
      neighborhood: billingNeighborhood,
      number: billingNumber,
      zipcode: billingZipCode,
      complementary: billingComplementary,
    };

    const responsePagarme = await this.pagarMeProvider.process({
      creditCard,
      customer,
      total: transaction.total,
      billing,
      installments,
      transactionCode: transaction.code,
      items: [],
      paymentType,
      pixExpirationDate,
    });

    const transactionUpdated = await this.transactionRepository.update({
      id: transaction.id,
      status: responsePagarme.status,
      transactionId: String(responsePagarme.transactionId),
      pixExpiration: responsePagarme.pix.expiration,
      pixQRCODE: responsePagarme.pix.qrcode,
      billetBarcode: responsePagarme.billet.barcode,
      billetExpiration: responsePagarme.billet.expiration,
      billetUrl: responsePagarme.billet.url,
    });

    return transactionUpdated;
  };
}
