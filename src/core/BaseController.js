// src/core/BaseController.js
import { HTTP_CODES } from "../config/Enum.js";
import ApiError from "../utils/ApiError.js";
import logger from "../utils/logger.js";

export default class BaseController {
  constructor(service) {
    this.service = service;

    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req, res, next) {
    try {
      const data = await this.service.create(req.body, req.user?._id);
      logger.info(`Created record by user  ${req.user?._id}`);
      res.status(HTTP_CODES.CREATED).json(data);
    } catch (err) {
      logger.error(`Create failed: ${err.message}`);
      next(err);
    }
  }

  async getAll(req, res, next) {
    try {
      const data = await this.service.getAll(req.query);
      logger.info(`Fetched list - query: ${JSON.stringify(req.query)}`);
      res.status(HTTP_CODES.OK).json(data);
    } catch (err) {
      logger.error(`[${req.method}] ${req.originalUrl} → ${err.message}`);
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const data = await this.service.getById(req.params.id);
      if (!data) {
        throw new ApiError(HTTP_CODES.NOT_FOUND, "No record found!");
      }
      logger.info(`Fetched record by ID ${req.params.id}`);
      res.status(HTTP_CODES.OK).json(data);
    } catch (err) {
      logger.error(`Fetch by ID failed: ${err.message}`);
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const data = await this.service.update(
        req.params.id,
        req.body,
        req.user?._id
      );
      if (!data) {
        throw new ApiError(HTTP_CODES.NOT_FOUND, "No record found to update!");
      }
      logger.info(`Updated record ${req.params.id} by user ${req.user?._id}`);
      res.status(HTTP_CODES.OK).json(data);
    } catch (err) {
      logger.error(`Update failed: ${err.message}`);
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const data = await this.service.delete(req.params.id, req.user?._id);
      if (!data) {
        throw new ApiError(HTTP_CODES.NOT_FOUND, "No record found to delete!");
      }
      logger.info(`Deleted record ${req.params.id} by user ${req.user?._id}`);
      res.status(HTTP_CODES.OK).json(data);
    } catch (err) {
      logger.error(`Delete failed: ${err.message}`);
      next(err);
    }
  }
}
