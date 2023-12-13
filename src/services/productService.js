/* eslint-disable import/extensions */

import Product from "../models/productModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlersFactory.js";

// @desc     Get list of Products
// @route    GET /api/v1/products
// @access    Public

export const getProducts = getAll(Product);

// @desc     Get specific  product by id
// @route    GET /api/v1/products/:id
// @access    Public

export const getProduct = getOne(Product);

// @desc     Create  products
// @route    POST /api/v1/products
// @access    Private

export const createProduct = createOne(Product);

// @desc     Update specific product
// @route    Update /api/v1/products/:id
// @access    private

export const updateProduct = updateOne(Product);

// @desc     Delete specific  product
// @route    Delete /api/v1/products/:id
// @access    private

export const deleteProduct = deleteOne(Product);
