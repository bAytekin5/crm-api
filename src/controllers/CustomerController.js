import { HTTP_CODES } from "../config/Enum.js";
import BaseController from "../core/BaseController.js";

export default class CustomerController extends BaseController {
  constructor(service) {
    super(service);

    this.create = this.create.bind(this);
  }

  async create(req, res, next) {
    try {
      const customer = await this.service.create(req.body, req.user._id);
      res.status(HTTP_CODES.CREATED).json(customer);
    } catch (err) {
      next(err);
    }
  }
}
