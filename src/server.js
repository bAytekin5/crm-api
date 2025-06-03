import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import logger from "./utils/logger.js";
import { swaggerUi, swaggerSpec } from "./config/swagger.js";
import Database from "./db/Database.js";

import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import customerRoutes from "./routes/customer.routes.js";

import { HTTP_CODES } from "./config/Enum.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  logger.info("Ana sayfa GET isteği geldi");
  res.status(HTTP_CODES.OK).json({ message: "CRM-API Aktif" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  const db = new Database();
  await db.connect({ CONNECTION_STRING: process.env.CONNECTION_STRING });

  app.listen(PORT, () => {
    logger.info(`Server is running at: http://localhost:${PORT} '`);
  });
};

startServer();
