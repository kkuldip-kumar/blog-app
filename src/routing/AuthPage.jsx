import { Navigate, Route, Routes } from "react-router-dom";
import { AuthLayout } from "src/layouts/AuthLayout";
import { ForgotPassword } from "src/pages/ForgotPassword";
import { Login } from "src/pages/Login";
import { ResetPassword } from "src/pages/ResetPassword";
import { SignUp } from "src/pages/SignUp";

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route index element={<Navigate to="/auth/login" />} />
    </Route>
  </Routes>
);

export { AuthPage };
