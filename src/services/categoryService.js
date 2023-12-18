/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import CategoryModel from "../models/categoryModel.js";
import {
  deleteOne,
  getAll,
  getOne,
  updateOne,
  createOne,
} from "./handlersFactory.js";
import { uploadSingleImage } from "../middleware/uploadImageMiddleware.js";

export const uploadCategoryImage = uploadSingleImage("image");

// Image processing
export const resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/categories/${filename}`);

    // Save image into our db
    req.body.image = filename;
  }
  next();
});

// @desc     Get list of categories
// @route    GET /api/v1/categories
// @access    Public

export const getCategories = getAll(CategoryModel);

// @desc     Get specific  category by id
// @route    GET /api/v1/categories/:id
//@access    Public

export const getCategory = getOne(CategoryModel);

// @desc     Create  categories
// @route    POST /api/v1/categories
// @access    Private/Admin-Manager

export const createCategory = createOne(CategoryModel);

// @desc     Update specific  category
// @route    Update /api/v1/categories/:id
// @access    private/Admin-Manager

export const updateCategory = updateOne(CategoryModel);

// @desc     Delete specific  category
// @route    Delete /api/v1/categories/:id
// @access    private/Admin

export const deleteCategory = deleteOne(CategoryModel);
