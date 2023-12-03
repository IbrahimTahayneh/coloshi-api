/* eslint-disable import/extensions */
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import BrandModel from "../models/brandModel.js";
import ApiError from "../utils/apiError.js";

// @desc    Get list of brands
// @route   GET /api/v1/brands
// @access  Public

export const getBrands = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const brand = await BrandModel.find({}).skip(skip).limit(limit);

  res.status(200).json({ result: brand.length, page, data: brand });
});

// @desc    Get specific brand by id
// @route   GET /api/v1/brands/:id
// @access  Public

export const getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const brand = await BrandModel.findById(id);

  if (!brand) {
    return next(ApiError(`No brand found for this id: ${id}`, 404));
  }

  res.status(200).json({ data: brand });
});

// @desc    Create brand
// @route   POST  /api/v1/brands
// @access  Private

export const createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const newBrand = await BrandModel.create({ name, slug: slugify(name) });

  res.status(201).json({ data: newBrand });
});

// @desc    Update specific brand
// @route   PUT /api/v1/brands/:id
// @access  Private

export const updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const brand = await BrandModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );

  if (!brand) {
    return next(ApiError(`No brand found for this id: ${id}`, 404));
  }

  res.status(200).json({ data: brand });
});

// @desc    Delete specific brand
// @route   DELETE /api/v1/brands/:id
// @access  Private

export const deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const brand = await BrandModel.findOneAndDelete(id);

  if (!brand) {
    return next(ApiError(`No brand found for this id: ${id}`, 404));
  }
  res.status(204).send();
});
