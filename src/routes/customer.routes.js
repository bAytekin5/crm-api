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

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Müşteri listesini getir
 *     tags: [Customers]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Müşteri ismine göre arama
 *     responses:
 *       200:
 *         description: Müşteri listesi döndürüldü
 */
router.get("/", protect, customerController.getAll);

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
