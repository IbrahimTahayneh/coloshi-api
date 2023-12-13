/* eslint-disable import/extensions */
import BrandModel from "../models/brandModel.js";
import {
  deleteOne,
  getAll,
  getOne,
  updateOne,
  createOne,
} from "./handlersFactory.js";

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
