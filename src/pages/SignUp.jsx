import React from "react";
import { SignUpForm } from "src/components/forms/SignUpForm";
import style from "../components/forms/auth.module.css";
import { Link } from "react-router-dom";
export const SignUp = () => {
  return (
    <div className={style.form_container}>
      <div className={style.form_wrapper}>
        <div className="">
          <div className={style.greet_me}>
            <h4>Lets Get Started</h4>
            <p>Welcome</p>
          </div>
          <SignUpForm />
          <div className={style.bottom_message}>
            <p>
              Already have an account ? <Link to="/auth/">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
