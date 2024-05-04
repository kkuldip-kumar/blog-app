import asyncHandler from "express-async-handler";
import { errorHandler } from "../utils/ErrorHandler.js";
import mongoose from "mongoose";
import blogService from "../services/Blog.service.js";
import { decodeAndSaveBase64ToFile } from "../utils/decodeBase64.js";
import { isBase64Image } from "../utils/helperFunction.js";

import generatePaginationData from "../utils/pagination.js";
import _ from "lodash";
import { removeLocalFile } from "../utils/removeLocalFile.js";
import { validateBlog } from "../utils/blog-validation.js";
import fileService from "../services/file.service.js";
import { Blog } from "../models/Blog.modal.js";
export const getAllBlogsList = asyncHandler(async (req, res, next) => {
  if (!req.query["category"]) {
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.items_per_page) || 12;
    const skip = (page - 1) * itemsPerPage;
    try {
      let queryCondition = {};
      let options = {
        page: page,
        skip: skip,
        limit: itemsPerPage,
        populate: [
          {
            path: "postedBy",
            select: "name",
          },
        ],
        sort: {
          createdAt: -1,
        },
      };
      const resultData = await blogService.getAllBlogs(
        res,
        queryCondition,
        options
      );
      const {
        total,
        totalPages,
        totalDocs,
        limit,
        docs,
        page: pageVal,
        prevPage,
        nextPage,
        pages,
      } = resultData;
      res.json({
        ok: true,
        totalPages,
        data: docs,
        prevPage,
        nextPage,
        limit,
        page: pageVal,
        pages,
        totalDocs,
        total,
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        message: error.message,
      });
    }
  } else {
    next();
  }
});

export const getAllBlogsByCategory = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const itemsPerPage = parseInt(req.query.items_per_page) || 12;
  const skip = (page - 1) * itemsPerPage;
  try {
    let queryCondition = {};
    let options = {
      page: page,
      skip: skip,
      limit: itemsPerPage,
      populate: [
        {
          path: "postedBy",
          select: "name",
        },
      ],
      sort: {
        createdAt: -1,
      },
    };
    const resultData = await blogService.getAllBlogs(
      res,
      queryCondition,
      options
    );
    const {
      total,
      totalPages,
      totalDocs,
      limit,
      docs,
      page: pageVal,
      prevPage,
      nextPage,
      pages,
    } = resultData;
    res.json({
      ok: true,
      totalPages,
      data: docs,
      prevPage,
      nextPage,
      limit,
      page: pageVal,
      pages,
      totalDocs,
      total,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
});
export const getAllBlogsByCategoryForAdmin = asyncHandler(
  async (req, res, next) => {
    if (req.user.role === "admin") {
      const page = parseInt(req.query.page) || 1;
      const itemsPerPage = parseInt(req.query.items_per_page) || 10;
      const skip = (page - 1) * itemsPerPage;
      const order = req.query.order || "desc";
      try {
        let queryCondition = {};
        let options = {
          page: page,
          skip: skip,
          limit: itemsPerPage,
          sort: {
            createdAt: order,
          },
        };

        const resultData = await blogService.getAllBlogs(
          res,
          queryCondition,
          options
        );
        const { totalDocs, totalPages, docs } = resultData;
        const pagination = generatePaginationData(
          page,
          totalPages,
          skip,
          itemsPerPage,
          totalDocs,
          docs
        );
        res.json({
          ok: true,
          data: docs,
          payload: {
            pagination,
          },
        });
      } catch (error) {
        res.status(500).json({
          ok: false,
          message: error.message,
        });
      }
    } else {
      next();
    }
  }
);

// add one Blog

export const addBlog = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  try {
    if (!userId) {
      return errorHandler(res, 404, "user Id is required");
    }
    const { error, value: blogInfoData } = await validateBlog(req.body);
    if (error)
      return res
        .status(400)
        .json({ ok: false, message: error.details[0].message });

    var imageUrl = "";
    if (blogInfoData?.image) {
      const filePath = await decodeAndSaveBase64ToFile(
        blogInfoData?.image,
        "storage"
      );

      imageUrl = await fileService.uploadImageFile(filePath, req);
    }
    const blogInfo = {
      ...blogInfoData,
      postedBy: userId,
      image: imageUrl ? imageUrl : "",
    };
    const newBlog = await Blog.create(blogInfo);
    if (!newBlog) {
      return res.status(400).json({
        ok: false,
        message: "unable to create new record",
      });
    }

    res.json({
      message: "create new record !",
      data: newBlog,
    });
  } catch (error) {
    res.status(500).json({
      ok: true,
      message: error.message,
    });
  }
});

// get one blog
export const getOneBlog = asyncHandler(async (req, res, next) => {
  if (!req.params["blogId"]) {
    return res.status(400).json({ ok: false, message: "blogId is required" });
  }
  try {
    const { blogId } = req.params;

    const foundBlog = await Blog.findById(blogId);
    if (!foundBlog) {
      return res.status(400).json({
        ok: false,
        message: "no blog  for this id",
      });
    }
    res.json({
      ok: true,
      data: foundBlog,
    });
  } catch (error) {
    res.status(500).json({
      ok: true,
      message: error.message,
    });
  }
});

// update One blog
export const updateOneBlog = asyncHandler(async (req, res, next) => {
  if (!req.params["blogId"]) {
    return res.status(400).json({ ok: false, message: "blogId is required" });
  }
  try {
    const { blogId } = req.params;
    const foundBlog = await Blog.findById(blogId);
    if (!foundBlog) {
      return res.status(400).json({
        ok: false,
        message: "no blog  for this id",
      });
    }
    const oldFilePath = foundBlog.image;
    const imageData = req.body.image;
    let image = "";
    if (imageData && isBase64Image(imageData)) {
      const filePath = await decodeAndSaveBase64ToFile(base64String, `storage`);
      image = await fileService.uploadImageFile(filePath, req);
    }
    const updatedData = {
      ...req.body,
      image: image ? image : imageData,
    };
    const updatedDoc = await Blog.findByIdAndUpdate(
      blogId,
      { $set: updatedData },
      { new: true }
    );

    if (image && oldFilePath && updatedDoc.image !== oldFilePath) {
      const { pathname } = new URL(oldFilePath);
      const filepath = pathname.slice(1).replace(/\//g, "\\");
      await removeLocalFile(filepath);
    }
    res.json({
      ok: true,
      data: updatedDoc,
    });
  } catch (error) {
    res.status(500).json({
      ok: true,
      message: error.message,
    });
  }
});

// remove One blog
export const removeOneBlog = asyncHandler(async (req, res, next) => {
  if (!req.params["blogId"]) {
    return res.status(400).json({ message: "blogId is required" });
  }
  try {
    // if (req.user.role !== "admin") {
    //   return res.status(403).json({ message: "unauthorize user" });
    // }
    const { blogId } = req.params;
    const blogID = new mongoose.Types.ObjectId(blogId);
    const foundDoc = await Blog.findById(blogID);
    if (!foundDoc) {
      return res.status(400).json({
        message: "no blog  for this id",
      });
    }
    const removedDoc = await Blog.deleteOne({
      _id: blogID,
    });
    if (!removedDoc) return errorHandler(res, 401, "unable to remove record");
    if (removedDoc && foundDoc?.image) {
      const { pathname } = new URL(foundDoc.image);
      const filepath = pathname.slice(1).replace(/\//g, "\\");
      if (filepath) {
        await removeLocalFile(filepath);
      }
    }

    res.json({
      ok: true,
      message: "blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      ok: true,
      message: error.message,
    });
  }
});
