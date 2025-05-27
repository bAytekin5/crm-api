import express from "express";

import CustomerService from "../services/CustomerService.js";
import CustomerController from "../controllers/CustomerController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/rbacMiddleware.js";
import { createCustomerSchema } from "../validators/customer.validator.js";

import validate from "../middlewares/validateMiddleware.js";

const router = express.Router();

const customerService = new CustomerService();
const customerController = new CustomerController();

router.post(
  "/",
  protect,
  authorizeRoles("admin", "sales"),
  validate(createCustomerSchema),
  customerController.create
);

router.get("/", protect, customerController.getAll);

export default router;
