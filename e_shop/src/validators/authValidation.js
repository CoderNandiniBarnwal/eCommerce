//authValidation.js

import yup from "yup";

export const userValidationSchema = yup.object({
  userName: yup
    .string()
    .trim()
    .min(3, "Name must be minimum of 3 alphabets")
    .required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .trim()
    .min(3, "Name must be minimum of 3 alphabets")
    .max(12, "Name can be maximum of 12 alphabets")
    .required(),
  role: yup
    .string()
    .oneOf(["buyer" , "seller"], "Role must be either buyer or seller")
    .required(),
});
export const userValidate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
