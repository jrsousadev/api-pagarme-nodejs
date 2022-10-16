import * as Yup from "yup";
import parsePhoneNumber from "libphonenumber-js";
import { cpf, cnpj } from "cpf-cnpj-validator";

export const CreateTransactionSchema = Yup.object().shape({
  cartCode: Yup.string().required(),
  paymentType: Yup.mixed().oneOf(["credit_card", "pix", "billet"]).required(),
  installments: Yup.number()
    .min(1)
    .when("paymentType", (paymentType, schema) =>
      paymentType === "credit_card" ? schema.max(12) : schema.max(1)
    ),
  customerName: Yup.string().required().min(3),
  customerEmail: Yup.string().required().email(),
  customerMobile: Yup.string()
    .required()
    .test("is-valid-phone", "${path} is not a mobile number", (value) => {
      if (typeof value !== "undefined") {
        const isValid = parsePhoneNumber(value, "BR")?.isValid();
        if (typeof isValid !== undefined && isValid === false) return false;
        return true;
      }
      return false;
    }),
  customerDocument: Yup.string()
    .required()
    .test("is-valid-document", "${path} is not a valid CPF / CNPJ", (value) => {
      if (typeof value !== "undefined") {
        return cpf.isValid(value) || cnpj.isValid(value);
      }

      return false;
    }),

  billingAddress: Yup.string().required(),
  billingNumber: Yup.string().required(),
  billingNeighborhood: Yup.string().required(),
  billingCity: Yup.string().required(),
  billingState: Yup.string().required(),
  billingZipCode: Yup.string().required(),

  pixExpirationDate: Yup.string(),
  creditCardNumber: Yup.string(),
  creditCardExpiration: Yup.string(),
  creditCardHolderName: Yup.string(),
  creditCardCvv: Yup.string(),
});
