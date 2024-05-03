import React from "react";
import { ForgotPasswordForm } from "src/components/forms/ForgotPasswordForm";
import style from "../components/forms/auth.module.css";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
  return (
    <div className={style.form_container}>
      <div className={style.form_wrapper}>
        <div className="">
          <div className={style.greet_me}>
            <h4>Forgot your password ?</h4>
          </div>
          <ForgotPasswordForm />
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
