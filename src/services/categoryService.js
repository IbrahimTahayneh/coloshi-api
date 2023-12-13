/* eslint-disable import/extensions */

import CategoryModel from "../models/categoryModel.js";
import {
  deleteOne,
  getAll,
  getOne,
  updateOne,
  createOne,
} from "./handlersFactory.js";

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
// @access    Private

export const createCategory = createOne(CategoryModel);

// @desc     Update specific  category
// @route    Update /api/v1/categories/:id
// @access    private

export const updateCategory = updateOne(CategoryModel);

// @desc     Delete specific  category
// @route    Delete /api/v1/categories/:id
// @access    private

export const deleteCategory = deleteOne(CategoryModel);
