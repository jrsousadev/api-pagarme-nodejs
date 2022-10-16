import * as Yup from "yup";

export const CreateCartSchema = Yup.object().shape({
  code: Yup.string().required(),
  price: Yup.number().required(),
});

export const UpdateCartSchema = Yup.object().shape({
  code: Yup.string().required(),
  price: Yup.number().required(),
});
