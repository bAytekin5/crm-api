import { HTTP_CODES } from "../config/Enum.js";

export default function validate(schema, property = "body") {
  return (req, res, next) => {
    try {
      const result = schema.safeParse(req[property]);

      if (!result.success) {
        const errorDetails = result.error.errors.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        }));

        return res.status(HTTP_CODES.BAD_REQUEST).json({
          message: "Validation error",
          errors: errorDetails,
        });
      }

      req[property] = result.data;

      next();
    } catch (err) {
      next(err);
    }
  };
}
