import Customer from "../db/models/CustomerModel.js";
import ApiError from "../utils/ApiError.js";
import { HTTP_CODES } from "../config/Enum.js";
import BaseAuditService from "../core/BaseAuditService.js";

export default class CustomerService extends BaseAuditService {
  constructor() {
    super(Customer, "Customer");
  }

  async getAll(query = {}) {
    const {
      search,
      tags,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
    } = query;

    const filter = { isDeleted: false };

    if (search) {
      filter.$or = [
        { name: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
      ];
    }

    if (tags) {
      const tagArray = tags.split(",").filter(tag => tag.trim() !== "");
      if (tagArray.length > 0) {
        filter.tags = { $in: tagArray };
      }
    }

    const parsedLimit = parseInt(limit, 10) || 10;
    const parsedPage = parseInt(page, 10) || 1;
    const skip = (parsedPage - 1) * parsedLimit;
    const sort = { [sortBy]: order === "desc" ? -1 : 1 };

    const [data, total] = await Promise.all([
      this.model.find(filter).sort(sort).skip(skip).limit(parsedLimit),
      this.model.countDocuments(filter),
    ]);

    return {
      total,
      page: parsedPage,
      limit: parsedLimit,
      data,
    };
  }

  async getById(id) {
    const customer = await super.getById(id);
    if (!customer) {
      throw new ApiError(HTTP_CODES.NOT_FOUND, "Customer not found");
    }
    return customer;
  }

  async delete(id, userId) {
    const customer = await super.delete(id, userId);
    if (!customer) {
      throw new ApiError(
        HTTP_CODES.NOT_FOUND,
        "Customer not found or already deleted"
      );
    }
    return { message: "Customer successfully deleted (soft delete)" };
  }
}
