import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import config from "./src/config/index.js";
import logger from "./src/utils/logger.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  logger.info("Ana sayfa GET isteği geldi");
  res.statusCode(200).json({ message: "CRM-API Aktif" });
});

const PORT = config.PORT;

app.listen(PORT, () => {
  logger.info(`Server ${PORT} portunda çalışıyor`);
});
