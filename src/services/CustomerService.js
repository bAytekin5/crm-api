import Customer from "../db/models/CustomerModel.js";
import ApiError from "../utils/ApiError.js";
import { HTTP_CODES } from "../config/Enum.js";
import { validateObjectId } from "../utils/validateObjectId.js";

export default class CustomerService {
  constructor() {
    this.model = Customer;
  }

  async create(data, userId) {
    return await this.model.create({ ...data, createdBy: userId });
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
      const tagArray = tags.split(",");
      filter.tags = { $in: tagArray };
    }

    const sort = { [sortBy]: order === "desc" ? -1 : 1 };
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.model.find(filter).sort(sort).skip(skip).limit(parseInt(limit)),
      this.model.countDocuments(filter),
    ]);

    return { total, page: parseInt(page), limit: parseInt(limit), data };
  }

  async getById(id) {
    validateObjectId(id);

    const customer = await this.model.findOne({ _id: id, isDeleted: false });

    if (!customer) {
      throw new ApiError(HTTP_CODES.NOT_FOUND, "Customer not found");
    }

    return customer;
  }

  async update(id, data, userId) {
    validateObjectId(id);

    const customer = await this.model.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { ...data, updatedBy: userId },
      { new: true }
    );

    if (!customer) {
      throw new ApiError(
        HTTP_CODES.NOT_FOUND,
        "Customer not found or already deleted"
      );
    }
    return customer;
  }

  async delete(id, userId) {
    validateObjectId(id);

    const customer = await this.model.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true, updatedBy: userId },
      { new: true }
    );

    if (!customer) {
      throw new ApiError(
        HTTP_CODES.NOT_FOUND,
        "Customer not found or already deleted"
      );
    }
    return { message: "Customer successfully delete (soft delete)" };
  }
}
