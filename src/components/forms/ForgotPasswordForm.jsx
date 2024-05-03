import React, { useState } from "react";

import { BaseInput } from "../BaseInput";
import { useForm, Controller } from "react-hook-form";
import { initialForgotPassword, forgoSchema } from "./form-validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { BaseButton } from "../BaseButton";
import style from "./form.module.css";
import { useNavigate } from "react-router-dom";
import { useForgotUserPasswordMutation } from "src/store/auth/authService";

export const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [forgotUserPassword, { error }] = useForgotUserPasswordMutation();
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgoSchema),
    defaultValues: initialForgotPassword,
  });
  const onSubmit = async (data, e) => {
    setLoading(true);
    try {
      const { data: resData, error: errData } = await forgotUserPassword(data);
      if (errData) {
        throw new Error(errData.data.message);
      }
      if (resData) {
        console.log(resData);
        reset({});
        navigate(
          `/auth/reset-password?userId=${resData.userId}&token=${resData.token}`
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <BaseInput
                placeholder="Email"
                label="Email"
                type="email"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            )}
            name="email"
          />
          <div>
            {errors.email && (
              <p className={style.textColor}>{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="mb-3">
          <BaseButton label="Submit" type="submit" className="w-100 d-block ">
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                ></span>
                <span role="status">Loading...</span>
              </>
            ) : (
              ""
            )}
          </BaseButton>
        </div>
      </form>
    </>
  );
};
