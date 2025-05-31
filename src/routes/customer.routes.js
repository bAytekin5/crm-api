import express from "express";

import CustomerService from "../services/CustomerService.js";
import CustomerController from "../controllers/CustomerController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/rbacMiddleware.js";
import {
  createCustomerSchema,
  updateCustomerSchema,
} from "../validators/customer.validator.js";

import validate from "../middlewares/validateMiddleware.js";

const router = express.Router();

const customerService = new CustomerService();
const customerController = new CustomerController(customerService);

router.post(
  "/",
  protect,
  authorizeRoles("admin", "sales"),
  validate(createCustomerSchema),
  customerController.create
);

router.get("/", protect, customerController.getAll);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "sales"),
  validate(updateCustomerSchema),
  customerController.update
);

router.get(
  "/:id",
  protect,
  authorizeRoles("admin", "sales"),
  customerController.getById
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  customerController.delete
);

export default router;
