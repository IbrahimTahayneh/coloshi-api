/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */

import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import BrandModel from "../models/brandModel.js";
import {
  deleteOne,
  getAll,
  getOne,
  updateOne,
  createOne,
} from "./handlersFactory.js";
import { uploadSingleImage } from "../middleware/uploadImageMiddleware.js";

export const uploadBrandImage = uploadSingleImage("image");

export const resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 95 })
    .toFile(`uploads/brands/${filename}`);

  // Save image into our db
  req.body.image = filename;

  next();
});

// @desc    Get list of brands
// @route   GET /api/v1/brands
// @access  Public

export const getBrands = getAll(BrandModel);

// @desc    Get specific brand by id
// @route   GET /api/v1/brands/:id
// @access  Public

export const getBrand = getOne(BrandModel);

// @desc    Create brand
// @route   POST  /api/v1/brands
// @access  Private

export const createBrand = createOne(BrandModel);

// @desc    Update specific brand
// @route   PUT /api/v1/brands/:id
// @access  Private

export const updateBrand = updateOne(BrandModel);

// @desc    Delete specific brand
// @route   DELETE /api/v1/brands/:id
// @access  Private

export const deleteBrand = deleteOne(BrandModel);
