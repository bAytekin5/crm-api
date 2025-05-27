import Customer from "../db/models/CustomerModel.js";

export default class CustomerService {
  async create(data, userId) {
    return await Customer.create({ ...data, createdBy: userId });
  }

  async getAll() {
    return await Customer.find({ isDeleted: false });
  }

  async getById(id) {
    return await Customer.findById(id);
  }

  async update(id, data) {
    return await Customer.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Customer.findByIdAndUpdate(id, { isDeleted: true });
  }
}
