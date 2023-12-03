/* eslint-disable import/extensions */
import { check } from "express-validator";
import validatorMiddleware from "../../middleware/validatorMiddleware.js";

export const getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory id format"),
  validatorMiddleware,
];

export const createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory required")
    .isLength({ min: 2 })
    .withMessage("Too short SubCategory name")
    .isLength({ max: 32 })
    .withMessage("Too long SubCategory name"),
  check("category")
    .notEmpty()
    .withMessage("SubCategory must be belong to category")
    .isMongoId()
    .withMessage("Invalid category id format"),
  validatorMiddleware,
];

export const updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory id format"),
  validatorMiddleware,
];

export const deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory id format"),
  validatorMiddleware,
];
