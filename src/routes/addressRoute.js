/* eslint-disable import/extensions */
import express from "express";
import { protect, allowedTo } from "../services/authService.js";

import {
  addAddress,
  removeAddress,
  getLoggedUserAddresses,
} from "../services/addressService.js";

const router = express.Router();

router.use(protect, allowedTo("user"));

router.route("/").post(addAddress).get(getLoggedUserAddresses);

router.delete("/:addressId", removeAddress);

export default router;
