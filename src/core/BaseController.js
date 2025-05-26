import { HTTP_CODES } from "../config/Enum.js";

export default class BaseController {
  constructor(service) {
    this.service = service;
  }

  async create(req, res, next) {
    try {
      const data = await this.service.create(req.body);
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
}
