import mongoose from "mongoose";
import logger from "../utils/logger.js"
let instance = null;

export default class Database {
  constructor() {
    if (!instance) {
      this.mongoConnection = null;
      instance = this;
    }
    return instance;
  }

  async connect(options) {
    try {
      logger.info("Database Connecting...");
      let db = await mongoose.connect(options.CONNECTION_STRING);
      this.mongoConnection = db;

      logger.info("Database Connected.");
    } catch (err) {
      logger.error(`MongoDB Connection Error: ${err.message}`);
      process.exit(1);
    }
  }
}
