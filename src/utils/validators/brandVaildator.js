/* eslint-disable import/extensions */

import { body, check } from "express-validator";
import slugify from "slugify";
import validatorMiddleware from "../../middleware/validatorMiddleware.js";

export const getBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand id format"),
  validatorMiddleware,
];

export const createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand required")
    .isLength({ min: 3 })
    .withMessage("Too short Brand name")
    .isLength({ max: 32 })
    .withMessage("Too long Brand name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

export const updateBrandValidator = [
  check("id")
    .notEmpty()
    .withMessage("Brand id must be a not empty")
    .isMongoId()
    .withMessage("Invalid Brand id format"),
  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

export const deleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand id format"),
  validatorMiddleware,
];
