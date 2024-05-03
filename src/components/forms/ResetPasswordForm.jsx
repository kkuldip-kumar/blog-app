import React, { useState } from "react";
import { BaseInput } from "../BaseInput";
import { useForm, Controller } from "react-hook-form";
import { initialResetPassword, resetSchema } from "./form-validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { BaseButton } from "../BaseButton";
import style from "./form.module.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useResetUserPasswordMutation } from "src/store/auth/authService";
export const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const [resetUserPassword, { error, success }] =
    useResetUserPasswordMutation();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetSchema),
    defaultValues: initialResetPassword,
  });
  const onSubmit = async (data, e) => {
    setLoading(true);
    const { password, ...rest } = data;
    const values = {
      password: password,
      userId: searchParams.get("userId"),
      token: searchParams.get("token"),
    };
    try {
      const { data: resData, error: errData } = await resetUserPassword(values);
      if (errData) {
        throw new Error(errData.data.message);
      }
      if (resData) {
        reset({});
        navigate("/auth/login");
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
                placeholder="New Password"
                label="Password"
                type="password"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            )}
            name="password"
          />
          <div>
            {errors.password && (
              <p className={style.textColor}>{errors.password.message}</p>
            )}
          </div>
        </div>
        <div className="mb-3">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <BaseInput
                placeholder="Confirm Password"
                label="Confirm Password"
                type="password"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            )}
            name="confirmPassword"
          />
          <div>
            {errors.confirmPassword && (
              <p className={style.textColor}>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
        <div className="mb-3">
          <BaseButton label="Submit" className="w-100 d-block">
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
