import mongoose from "mongoose";
import ApiError from "./ApiError.js";
import { HTTP_CODES } from "../config/Enum.js";

export function validateObjectId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, "Invalid ID format");
  }
}
