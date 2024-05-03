import React, { useState } from "react";
import { BaseInput } from "../BaseInput";
import { useForm, Controller } from "react-hook-form";
import { initialSignUpData, signUpSchema } from "./form-validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { BaseButton } from "../BaseButton";
import style from "./form.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpUserMutation } from "src/store/users/userService";
export const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [signUpUser, { error }] = useSignUpUserMutation();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: initialSignUpData,
  });
  const onSubmit = async (data, e) => {
    setLoading(true);
    const { confirmPassword, ...rest } = data;
    try {
      const { data: resData } = await signUpUser(rest);
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
                placeholder="Full Name"
                label="Full Name"
                type="text"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            )}
            name="name"
          />
          <div>
            {errors.name && (
              <p className={style.textColor}>{errors.name.message}</p>
            )}
          </div>
        </div>
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
          <BaseButton label="Register" className="w-100 d-block">
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
