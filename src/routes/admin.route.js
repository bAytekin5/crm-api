import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/rbacMiddleware.js";
import { HTTP_CODES } from "../config/Enum.js";

const router = express.Router();

router.get(
  "/admin-area",
  protect,
  authorizeRoles("admin", "sales"),
  (req, res) => {
    res.status(HTTP_CODES.OK).json({ message: `Welcome ${req.user.name} to the admin area` });
  }
);

export default router;
