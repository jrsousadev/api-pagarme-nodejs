import * as Yup from "yup";

export const CreateCartSchema = {
  schema: {
    body: {
      yupSchema: Yup.object().shape({
        code: Yup.string().required(),
        price: Yup.number().required(),
      }),
    },
  },
};

export const UpdateCartSchema = {
  schema: {
    params: {
      yupSchema: Yup.object().shape({
        id: Yup.string().required(),
      }),
    },
    body: {
      yupSchema: Yup.object().shape({
        code: Yup.string().required(),
        price: Yup.number().required(),
      }),
    },
  },
};
