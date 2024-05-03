import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User } from "../models/User.modal.js";
import { errorHandler } from "../utils/ErrorHandler.js";

const tokenBlacklist = [];
export const Auth = (req, res, next) => {
  const auth = req.headers.authorization || req.headers.Authorization;
  if (!auth?.startsWith("Bearer ")) {
    return res.status(401).json({ ok: false, message: "Unauthorized" });
  }
  const token = auth.split(" ")[1];
  if (tokenBlacklist.includes(token)) {
    return res
      .status(403)
      .json({ ok: false, message: "Forbidden - Token expired or revoked" });
  }
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          tokenBlacklist.push(token);
          return res.status(403).json({
            ok: false,
            message: "Forbidden - Token expired or revoked",
          });
        }
        return res.status(403).json({ ok: false, message: "Forbidden" });
      }
      try {
        const userData = await User.findById(decoded.id);
        if (userData.status === "Blocked") {
          throw new Error();
        } else {
          req.user = userData;
          next();
        }
      } catch (error) {
        return res.status(401).json({ ok: false, message: "Unauthorized" });
      }
    })
  );
};

export const logout = (req, res) => {
  const auth = req.headers.authorization || req.headers.Authorization;
  try {
    if (auth?.startsWith("Bearer ")) {
      const token = auth.split(" ")[1];
      tokenBlacklist.push(token);
    }
    res.json({ ok: true, message: "Logout successful" });
  } catch (error) {
    return res.status(401).json({ ok: false, message: error.message });
  }
};
