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
import { protect, allowedTo } from "../services/authService.js";

const router = Router({ mergeParams: true });

router
  .route("/")
  .post(
    protect,
    allowedTo("admin", "manager"),
    setCategoryIdtoBody,
    createSubCategoryValidator,
    createSubCategory
  )
  .get(createFilterObject, getSubCategories);

router
  .route("/:id")
  .get(getSubCategoryValidator, getsubCategory)
  .put(
    protect,
    allowedTo("admin", "manager"),
    updateSubCategoryValidator,
    updateSubCategory
  )
  .delete(
    protect,
    allowedTo("admin"),
    deleteSubCategoryValidator,
    deleteSubCategory
  );

export default router;
