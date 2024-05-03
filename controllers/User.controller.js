import { errorHandler } from "../utils/ErrorHandler.js";
import { User } from "../models/User.modal.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

import _ from "lodash";
import mongoose from "mongoose";

// // get current user
// export const getUser = asyncHandler(async (req, res, next) => {
//   try {
//     const userId = req.user._id;
//     if (!userId) return errorHandler(res, 400, "userId not provided");
//     const foundUser = await User.findById(userId);
//     if (!foundUser) return errorHandler(res, 404, "User not found");
//     res.status(200).json({
//       ok: true,
//       user: foundUser,
//     });
//   } catch (error) {
//     res.status(500).json({ ok: false, message: error.message });
//   }
// });
export const getOneUser = asyncHandler(async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) return errorHandler(res, 400, "userId not provided");
    const foundUser = await User.findById(userId);
    if (!foundUser) return errorHandler(res, 404, "User not found");
    res.status(200).json({
      ok: true,
      user: foundUser,
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
});

// export const createUser = asyncHandler(async (req, res, next) => {
//   const { email, password, name } = req.body;
//   try {
//     const user = await User.findOne({ email: email });
//     if (user) {
//       return res
//         .status(401)
//         .json({ ok: false, message: "email is already registered" });
//     }
//     const hashedPassword = await bcrypt.hash(password, 12);
//     const newUser = {
//       email: email,
//       password: hashedPassword,
//       name: name,
//     };

//     await User.create(newUser);
//     res.json({ ok: true, message: "user created successfully" });
//   } catch (error) {
//     res.status(500).json({ ok: false, message: error.message });
//   }
// });

// get all  user
export const getUsers = asyncHandler(async (req, res, next) => {
  try {
    const foundUser = await User.find({}).select("-password");
    if (!foundUser) return errorHandler(res, 404, "User not found");

    res.status(200).json({ ok: true, user: foundUser });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
});

// remove User
export const removeUser = asyncHandler(async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) return errorHandler(res, 400, "userId is required");
    const userID = new mongoose.Types.ObjectId(userId);
    const foundUser = await User.findById(userID);
    const removedDoc = await User.deleteOne({ _id: userID });
    if (!removedDoc) return errorHandler(res, 401, "unable to remove record");

    res
      .status(200)
      .json({ ok: true, userId, message: "user deleted successfully" });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
});

//update a user
export const updateUser = asyncHandler(async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) return errorHandler(res, 400, "userId not provided");
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { ...req.body } },
      { new: true }
    ).select("-password");
    res.status(200).json({ ok: true, user: updatedUser });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
});
