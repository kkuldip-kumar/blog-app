import React from "react";
import style from "../components/forms/auth.module.css";
import { Link } from "react-router-dom";
import { ResetPasswordForm } from "src/components/forms/ResetPasswordForm";

export const ResetPassword = () => {
  return (
    <div className={style.form_container}>
      <div className={style.form_wrapper}>
        <div className="">
          <div className={style.greet_me}>
            <h4>Reset your password </h4>
          </div>
          <ResetPasswordForm />
          <div className={style.bottom_message}>
            <p>
              Login ? <Link to="/auth/">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
