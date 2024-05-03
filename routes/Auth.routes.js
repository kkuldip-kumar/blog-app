import express from "express";
const router = express();
import {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
} from "../controllers/Auth.controller.js";
import { Auth, logout } from "../middlewares/Auth.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/logout", Auth, logout);

export default router;
