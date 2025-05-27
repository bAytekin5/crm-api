import { HTTP_CODES } from "../config/Enum.js";
import ApiError from "../utils/ApiError.js";

export default class BaseController {
  constructor(service) {
    this.service = service;

    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req, res, next) {
    try {
      const data = await this.service.create(req.body, req.user?._id);
      res.status(HTTP_CODES.CREATED).json(data);
    } catch (err) {
      next(err);
    }
  }

  async getAll(req, res, next) {
    try {
      const data = await this.service.getAll();
      res.status(HTTP_CODES.OK).json(data);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const data = await this.service.getById(req.params.id);
      if (!data) {
        throw new ApiError(HTTP_CODES.NOT_FOUND, "No record found!");
      }
      res.status(HTTP_CODES.OK).json(data);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const data = await this.service.update(req.params.id, req.body);
      if (!data) {
        throw new ApiError(HTTP_CODES.NOT_FOUND, "No record found to update!");
      }
      res.status(HTTP_CODES.OK).json(data);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const data = await this.service.delete(req.params.id);
      if (!data) {
        throw new ApiError(HTTP_CODES.NOT_FOUND, "No records found to delete!");
      }
      res.status(HTTP_CODES.OK).json(data);
    } catch (err) {
      next(err);
    }
  }
}
