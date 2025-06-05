import express from "express";
import InvoiceController from "../controllers/InvoiceController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/rbacMiddleware.js";
import validate from "../middlewares/validateMiddleware.js";
import {
  createInvoiceSchema,
  updateInvoiceSchema,
  invoiceIdParamSchema,
} from "../validators/invoice.validator.js";

const router = express.Router();
const invoiceController = new InvoiceController();

/**
 * @route   POST /invoices
 * @desc    Yeni fatura oluştur
 * @access  Admin, Finance
 */
router.post(
  "/",
  protect,
  authorizeRoles("admin", "finance"),
  validate(createInvoiceSchema),
  invoiceController.create
);

/**
 * @route   GET /invoices
 * @desc    Tüm faturaları getir (filtreleme/sıralama destekli)
 * @access  Admin, Finance
 */
router.get(
  "/",
  protect,
  authorizeRoles("admin", "finance"),
  invoiceController.getAll
);

/**
 * @route   GET /invoices/:id
 * @desc    Fatura detayını getir
 * @access  Admin, Finance
 */
router.get(
  "/:id",
  protect,
  authorizeRoles("admin", "finance"),
  validate(invoiceIdParamSchema, "params"),
  invoiceController.getById
);

/**
 * @route   PUT /invoices/:id
 * @desc    Fatura bilgilerini güncelle
 * @access  Admin, Finance
 */
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "finance"),
  validate(invoiceIdParamSchema, "params"),
  validate(updateInvoiceSchema),
  invoiceController.update
);

/**
 * @route   DELETE /invoices/:id
 * @desc    Faturayı sil (soft delete)
 * @access  Admin, Finance
 */
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin", "finance"),
  validate(invoiceIdParamSchema, "params"),
  invoiceController.delete
);

export default router;
