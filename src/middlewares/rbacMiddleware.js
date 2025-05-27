import { HTTP_CODES } from "../config/Enum.js"
import ApiError from "../utils/ApiError.js"

export const authorizeRoles = (...allowedRoles) => {
    return(req, res, next) => {
        if(!req.user || !allowedRoles.includes(req.user.role)){
             throw new ApiError(HTTP_CODES.FORBIDDEN, "Access Denied - Unauthorized Role")
        }
        next();
    }
}