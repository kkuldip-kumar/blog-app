import Joi from "joi";
import joiObjectId from "joi-objectid";
Joi.objectId = joiObjectId(Joi);
const passwordRegex = /^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*])[\w!@#$%^&*]{5,}$/;
const userRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .regex(passwordRegex)
    .message("password must be strong"),
  name: Joi.string().required(),
  role: Joi.string().valid("admin", "user").default("user"),
});

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  rememberMe: Joi.boolean().default(false),
  password: Joi.string()
    .regex(passwordRegex)
    .message("password must be strong"),
});

export const validateUser = (userData) => userRegisterSchema.validate(userData);
export const validateLogin = (userData) => userLoginSchema.validate(userData);
