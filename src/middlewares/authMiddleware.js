import jwt from "jsonwebtoken";
import User from "../db/models/UserModel.js";
import { HTTP_CODES } from "../config/Enum.js";
import ApiError from "../utils/ApiError.js";
import logger from "../utils/logger.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      return next();
    } catch (err) {
      logger.warn("JWT validation failed:", err.message);
      return next(new ApiError(HTTP_CODES.UNAUTHORIZED), "Invalid Token");
    }
  }

  if (!token) {
    logger.warn("Unauthorized access attempt – Token not found", err.message);
    throw new ApiError(
      HTTP_CODES.UNAUTHORIZED,
      "Unauthorized Access - No Token"
    );
  }
};
