import * as yup from "yup";

export const initialSignUpData = {
  name: "",
  email: "",
  password: "",
  role: "user",
  confirmPassword: "",
};
export const initialForgotPassword = {
  email: "",
};
export const initialResetPassword = {
  password: "",
  confirmPassword: "",
};

export const forgoSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid Email"),
});
export const resetSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g,
      "password must be strong"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "password must match")
    .required("Confirm password is required"),
});
export const signUpSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid Email"),
  name: yup.string().required("Full Name is required "),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g,
      "password must be strong"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "password must match")
    .required("Confirm password is required"),
});

export const initialUser = {
  name: "",
  email: "",
  password: "",
  role: "user",
};

export const UserSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid Email"),
  name: yup.string().required("Full Name is required "),
});

export const initialLoginData = {
  email: "",
  password: "",
};

export const loginSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g,
      "password must be strong"
    ),
});
