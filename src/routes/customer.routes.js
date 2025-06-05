import express from "express";
import CustomerService from "../services/CustomerService.js";
import CustomerController from "../controllers/CustomerController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/rbacMiddleware.js";
import validate from "../middlewares/validateMiddleware.js";
import {
  createCustomerSchema,
  updateCustomerSchema,
  customerIdParamSchema,
} from "../validators/customer.validator.js";

const router = express.Router();
const customerService = new CustomerService();
const customerController = new CustomerController(customerService);

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Yeni müşteri oluştur
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               company:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Müşteri başarıyla oluşturuldu
 *       400:
 *         description: Doğrulama hatası
 *       401:
 *         description: Yetkisiz erişim
 */
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
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: İsim veya e-posta ile arama
 *       - in: query
 *         name: tags
 *         schema:
 *           type: string
 *         description: Virgülle ayrılmış tag listesi (örnek: "vip,yeni")
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Sayfa numarası
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Sayfa başına sonuç sayısı
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sıralanacak alan (örnek: "createdAt")
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sıralama yönü
 *     responses:
 *       200:
 *         description: Müşteri listesi başarıyla getirildi
 *       401:
 *         description: Yetkisiz erişim
 */

router.get("/", protect, customerController.getAll);

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Belirli bir müşteri getir
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 64fe1234ab56cd7890ef1234
 *     responses:
 *       200:
 *         description: Müşteri bilgisi döndürüldü
 *       404:
 *         description: Müşteri bulunamadı
 */
router.get(
  "/:id",
  protect,
  authorizeRoles("admin", "sales"),
  validate(customerIdParamSchema, "params"),
  customerController.getById
);

/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Mevcut müşteri bilgilerini güncelle
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               company:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Müşteri başarıyla güncellendi
 *       404:
 *         description: Müşteri bulunamadı
 */
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "sales"),
  validate(customerIdParamSchema, "params"),
  validate(updateCustomerSchema),
  customerController.update
);

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Müşteri sil (soft delete)
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Müşteri silindi
 *       404:
 *         description: Müşteri bulunamadı
 */
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  validate(customerIdParamSchema, "params"),
  customerController.delete
);

export default router;
