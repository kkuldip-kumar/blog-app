import express from "express";

import {
  addBlog,
  getOneBlog,
  getAllBlogsList,
  removeOneBlog,
  updateOneBlog,
  getAllBlogsByCategoryForAdmin,
  getAllBlogsByCategory,
} from "../controllers/Blog.controller.js";
import { Auth } from "../middlewares/Auth.js";

const router = express.Router();

router
  .route("/")
  .get(getAllBlogsList, getAllBlogsByCategory)
  .post(Auth, addBlog);
router.route("/admin").get(Auth, getAllBlogsByCategoryForAdmin);
router
  .route("/:blogId")
  .get(getOneBlog)
  .put(Auth, updateOneBlog)
  .delete(Auth, removeOneBlog);
export default router;
