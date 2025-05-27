import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/rbacMiddleware.js";

const router = express.Router();

router.get(
  "/admin-area",
  protect,
  authorizeRoles("admin", "sales"),
  (req, res) => {
    res.status(200).json({ message: `Welcome ${req.user.name} to the admin area` });
  }
);

export default router;
