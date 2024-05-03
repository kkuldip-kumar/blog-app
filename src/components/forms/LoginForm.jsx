import React, { useState } from "react";

import { BaseInput } from "../BaseInput";
import { useForm, Controller } from "react-hook-form";
import { initialLoginData, loginSchema } from "./form-validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { BaseButton } from "../BaseButton";
import style from "./form.module.css";
import { useLoginUserMutation } from "src/store/auth/authService";
import { Link, useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [loginUser, { error }] = useLoginUserMutation();
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: initialLoginData,
  });
  const onSubmit = async (data, e) => {
    setLoading(true);
    try {
      const { data: resData } = await loginUser(data);
      if (resData) {
        reset({});
        navigate("/");
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
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <BaseInput
                placeholder="Password"
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
          <BaseButton label="Login" className="w-100 d-block">
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
          <div className={style.forgot_password}>
            <Link to="/auth/forgot-password">Forgot Password ?</Link>
          </div>
        </div>
      </form>
    </>
  );
};
