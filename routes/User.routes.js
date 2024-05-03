import express from "express";
import {
  removeUser,
  updateUser,
  getOneUser,
  getUsers,
} from "../controllers/User.controller.js";
import { Auth } from "../middlewares/Auth.js";
const router = express.Router();

// router.use(Auth);

router.route("/").get(Auth, getUsers);
// router.route("/me").get(Auth, getUser);
router
  .route("/:userId")
  .delete(Auth, removeUser)
  .get(Auth, getOneUser)
  .put(Auth, updateUser);

export default router;
