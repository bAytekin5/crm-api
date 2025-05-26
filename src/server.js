import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import logger from "./utils/logger.js";

import Database from "./db/Database.js";

import authRoutes from "./routes/auth.route.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  logger.info("Ana sayfa GET isteği geldi");
  res.status(200).json({ message: "CRM-API Aktif" });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  const db = new Database();
  await db.connect({ CONNECTION_STRING: process.env.CONNECTION_STRING });

  app.listen(PORT, () => {
    logger.info(`Server is running at: http://localhost:${PORT} '`);
  });
};

startServer();
