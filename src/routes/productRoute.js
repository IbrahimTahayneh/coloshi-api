/* eslint-disable import/extensions */
import { Router } from "express";
import {
  getProduct,
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  resizeProductImages,
} from "../services/productService.js";
import {
  createProductValidator,
  deleteProductValidator,
  getProductValidator,
  updateProductValidator,
} from "../utils/validators/productVaildator.js";
import { protect, allowedTo } from "../services/authService.js";

const router = Router();

router
  .route("/")
  .get(getProducts)
  .post(
    protect,
    allowedTo("admin", "manager"),
    uploadProductImages,
    resizeProductImages,
    createProductValidator,
    createProduct
  );

router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(
    protect,
    allowedTo("admin", "manager"),
    uploadProductImages,
    resizeProductImages,
    updateProductValidator,
    updateProduct
  )
  .delete(protect, allowedTo("admin"), deleteProductValidator, deleteProduct);

export default router;
