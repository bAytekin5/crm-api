import express from "express";
import AuthService from "../services/AuthService.js";
import AuthController from "../controllers/AuthController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
const authService = new AuthService();
const authController = new AuthController(authService);

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", protect, authController.getProfile);



export default router;
