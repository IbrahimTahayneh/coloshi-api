/* eslint-disable import/extensions */
import asyncHandler from "express-async-handler";
import slugify from "slugify";
import ApiError from "../utils/apiError.js";
import subCategoryModel from "../models/subCategoryModel.js";

export const setCategoryIdtoBody = (req, _res, next) => {
  if (!req.body.category) {
    req.body.category = req.params.categoryId;
  }
  next();
};
// @desc     Create  categories
// @route    POST /api/v1/categories
//@access    Private

export const createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;

  const subCategory = await subCategoryModel.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});

export const createFilterObject = (req, res, next) => {
  let filterObject = {};

  if (req.params.categoryId) {
    filterObject = { category: req.params.categoryId };
  }

  req.filterObj = filterObject;

  next();
};

// @desc     Get list of subCategories
// @route    GET /api/v1/subcategories
//@access    public
export const getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const subCategories = await subCategoryModel
    .find(req.filterObj)
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name" });

  res
    .status(200)
    .json({ results: subCategories.length, page, data: subCategories });
});

// @desc     Get specific  subCategory by id
// @route    GET /api/v1/subcategories/:id
//@access    Public

export const getsubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const subCategory = await subCategoryModel.findById(id);

  if (!subCategory) {
    return next(new ApiError(`No subCategory for this id ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});

// @desc     Update specific  subcategory
// @route    Update /api/v1/subcategories/:id
//@access    private

export const updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;

  const subCategory = await subCategoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true }
  );
  if (!subCategory) {
    return next(new ApiError(`No category for this id ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});

// @desc     Delete specific  subcategory
// @route    Delete /api/v1/categories/:id
//@access    private

export const deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const subcategory = await subCategoryModel.findByIdAndDelete(id);

  if (!subcategory) {
    return next(new ApiError(`No category for this id ${id}`, 404));
  }
  res.status(204).send();
});
