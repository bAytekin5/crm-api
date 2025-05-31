import Customer from "../db/models/CustomerModel.js";
import ApiError from "../utils/ApiError.js";
import { HTTP_CODES } from "../config/Enum.js";
import { validateObjectId } from "../utils/validateObjectId.js";

export default class CustomerService {
  constructor() {
    this.model = Customer;
  }

  async create(data, userId) {
    return await Customer.create({ ...data, createdBy: userId });
  }

  async getAll() {
    return await Customer.find({ isDeleted: false });
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
