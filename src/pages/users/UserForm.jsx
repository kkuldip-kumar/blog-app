import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BaseButton } from "src/components/BaseButton";
import style from "src/components/forms/form.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useUpdateOneUserMutation } from "src/store/users/userService";
import { BaseInput } from "src/components/BaseInput";
import { useUserListView } from "./ListViewProvider";
import { UserSchema } from "src/components/forms/form-validations";
import { initialUser } from "src/components/forms/form-validations";
import { useSignUpUserMutation } from "src/store/users/userService";
export const UserForm = ({ userData }) => {
  const [loading, setLoading] = useState(false);
  const { setIdForUpdate } = useUserListView();
  const navigate = useNavigate();
  const [userForEdit] = useState({ ...initialUser, ...userData });
  const [signUpUser] = useSignUpUserMutation();
  const [updateOneUser] = useUpdateOneUserMutation();
  // console.log("user for Edit", userForEdit);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues: userForEdit,
  });
  const onSubmit = async (dataValues) => {
    setLoading(true);
    try {
      if (dataValues._id) {
        const { password, ...rest } = dataValues;
        const { data: resData, error: errData } = await updateOneUser(rest);
        if (errData) {
          throw new Error(errData.data.message);
        }
        setIdForUpdate(undefined);
        reset({});
      } else {
        const { data: resData, error: errData } = await signUpUser(dataValues);
        if (errData) {
          throw new Error(errData.data.message);
        }
        setIdForUpdate(undefined);
        reset({});
      }
    } catch (error) {
      console.error("error:", error);
    } finally {
      setLoading(false);
    }
  };
  const onReset = () => {
    // setIdForUpdate(undefined);
    reset({});
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-lg-6">
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
          </div>
          <div className="col-lg-6">
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
          </div>
          {userForEdit._id ? null : (
            <div className="col-lg-6">
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
            </div>
          )}
          {userForEdit._id ? (
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">
                  Select Role <span className="required-star">*</span>
                </label>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...register("role")}
                      className="form-select"
                      aria-label="Default"
                    >
                      <option defaultValue value="" disabled>
                        Select Role
                      </option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  )}
                />
                <div>
                  {errors.category && (
                    <p className={style.textColor}>{errors.category.message}</p>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="mb-3">
          <div className="d-flex justify-content-end">
            <BaseButton label="Save" type="submit" />
            <BaseButton
              label="Cancel"
              className="reset_btn ms-3"
              onClick={onReset}
              type="reset"
            />
          </div>
        </div>
      </form>
    </>
  );
};
