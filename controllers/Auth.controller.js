import { User } from "../models/User.modal.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import asyncHandler from "express-async-handler";
import { errorHandler } from "../utils/ErrorHandler.js";
import { Token } from "../models/Token.modal.js";
import crypto from "crypto";
import { validateLogin, validateUser } from "../utils/user-validation.js";

// loginUser
export const loginUser = asyncHandler(async (req, res, next) => {
  const { error, value } = validateLogin(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const { email, password: userPassword } = value;
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      return res.status(401).json({ message: "username is not valid !" });
    }
    const isPasswordMatched = await bcrypt.compare(
      userPassword,
      foundUser.password
    );
    if (!isPasswordMatched) return errorHandler(res, 404, "password is wrong");
    const accessToken = jwt.sign(
      { id: foundUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    const { password, ...userData } = foundUser;
    const responseData = {
      user: userData,
      api_token: accessToken,
    };
    res.json(responseData);
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
});

// signup User
export const registerUser = asyncHandler(async (req, res, next) => {
  const userData = req.body;
  const { error, value } = validateUser(userData);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { email, password: passcodeData } = value;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(401)
        .json({ ok: false, message: "email is already registered" });
    }
    const hashedPassword = await bcrypt.hash(passcodeData, 12);
    const { password, ...rest } = req.body;

    const newUserInfo = {
      ...rest,
      password: hashedPassword,
    };
    const newUser = await User.create(newUserInfo);

    res.json({
      ok: true,
      message: "user created successfully",
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
});

// forgot password
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const userData = await User.findOne({ email: email });
    if (!userData) {
      return errorHandler(res, 404, "user not found !");
    }
    let tokenFound = await Token.findOne({ userId: userData._id });
    if (tokenFound) {
      tokenFound.deleteOne();
    }
    const newToken = await new Token({
      userId: userData._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    res.status(201).json({
      userId: userData._id,
      token: newToken.token,
      message: "Token created !",
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
});

// reset Password
export const resetPassword = asyncHandler(async (req, res) => {
  const { userId, token, password } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user)
      return res.status(400).json({ ok: true, message: "Unauthorize user" });

    const foundToken = await Token.findOne({
      userId: userId,
      token: token,
    });
    if (!foundToken)
      return res
        .status(400)
        .json({ ok: true, message: "invalid link or expired token" });
    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    await user.save();
    await foundToken.deleteOne();
    res.status(200).json({ ok: true, message: "password reset successfully." });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
});

// Update user Password
// export const updatePassword = asyncHandler(async (req, res) => {
//   const userId = req.user._id;
//   if (!userId) return res.status(401).json({ message: "userId is required " });
//   const { currentPassword, newPassword } = req.body;
//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }
//     const isPasswordValid = await bcrypt.compare(
//       currentPassword,
//       user.password
//     );

//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Current password is incorrect" });
//     }
//     const hashedPassword = await bcrypt.hash(newPassword, 12);
//     user.password = hashedPassword;
//     await user.save();
//     res.status(200).json({ message: "Password updated successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
