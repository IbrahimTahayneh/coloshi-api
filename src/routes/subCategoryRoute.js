/* eslint-disable import/extensions */
import { Router } from "express";
import {
  createFilterObject,
  createSubCategory,
  deleteSubCategory,
  getSubCategories,
  getsubCategory,
  setCategoryIdtoBody,
  updateSubCategory,
} from "../services/subCategoryService.js";
import {
  createSubCategoryValidator,
  deleteSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
} from "../utils/validators/subCategoryValidator.js";

const router = Router({ mergeParams: true });

router
  .route("/")
  .post(setCategoryIdtoBody, createSubCategoryValidator, createSubCategory)
  .get(createFilterObject, getSubCategories);

router
  .route("/:id")
  .get(getSubCategoryValidator, getsubCategory)
  .put(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory);

export default router;
