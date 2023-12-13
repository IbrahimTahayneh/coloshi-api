/* eslint-disable import/extensions */
import subCategoryModel from "../models/subCategoryModel.js";
import {
  deleteOne,
  getAll,
  getOne,
  updateOne,
  createOne,
} from "./handlersFactory.js";

// Nested route (Create)

export const setCategoryIdtoBody = (req, _res, next) => {
  if (!req.body.category) {
    req.body.category = req.params.categoryId;
  }
  next();
};

// Nested route
// GET /api/v1/categories/:categoryId/subcategories

export const createFilterObject = (req, res, next) => {
  let filterObject = {};

  if (req.params.categoryId) {
    filterObject = { category: req.params.categoryId };
  }

  req.filterObj = filterObject;

  next();
};

// @desc     Create  categories
// @route    POST /api/v1/categories
// @access    Private

export const createSubCategory = createOne(subCategoryModel);

// @desc     Get list of subCategories
// @route    GET /api/v1/subcategories
// @access    public

export const getSubCategories = getAll(subCategoryModel);

// @desc     Get specific  subCategory by id
// @route    GET /api/v1/subcategories/:id
// @access    Public

export const getsubCategory = getOne(subCategoryModel);

// @desc     Update specific  subcategory
// @route    Update /api/v1/subcategories/:id
// @access    private

export const updateSubCategory = updateOne(subCategoryModel);

// @desc     Delete specific  subcategory
// @route    Delete /api/v1/categories/:id
// @access    private

export const deleteSubCategory = deleteOne(subCategoryModel);
