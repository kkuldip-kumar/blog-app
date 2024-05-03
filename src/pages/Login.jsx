import React from "react";
import { LoginForm } from "src/components/forms/LoginForm";
import style from "../components/forms/auth.module.css";
import { Link } from "react-router-dom";
export const Login = () => {
  return (
    <div className={style.form_container}>
      <div className={style.form_wrapper}>
        <div className="">
          <div className={style.greet_me}>
            <h4>Lets Get Started</h4>
            <p>Welcome Back ! Please enter your details</p>
          </div>
          <LoginForm />
          <div className={style.bottom_message}>
            <p>
              Don't have account ? <Link to="/auth/sign-up">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
