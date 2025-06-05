import AuditLogService from "../services/AuditLogService.js";
import { validateObjectId } from "../utils/validateObjectId.js";
import logger from "../utils/logger.js";

export default class BaseAuditService {
  constructor(model, modelName) {
    this.model = model;
    this.modelName = modelName;
  }

  async create(data, userId) {
    const document = await this.model.create({ ...data, createdBy: userId });

    await AuditLogService.log({
      userId,
      operation: "create",
      model: this.modelName,
      recordId: document._id,
      details: data,
    });

    logger.info(`[CREATE] ${this.modelName} created by user ${userId}`);
    return document;
  }

  async getAll(filter = {}) {
    return await this.model.find({ isDeleted: false, ...filter });
  }

  async getById(id) {
    validateObjectId(id);
    return await this.model.findOne({ _id: id, isDeleted: false });
  }

  async update(id, data, userId) {
    validateObjectId(id);

    const updated = await this.model.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { ...data, updatedBy: userId },
      { new: true }
    );

    if (updated) {
      await AuditLogService.log({
        userId,
        operation: "update",
        model: this.modelName,
        recordId: id,
        details: data,
      });

      logger.info(`[UPDATE] ${this.modelName} ${id} updated by user ${userId}`);
    }

    return updated;
  }

  async delete(id, userId) {
    validateObjectId(id);

    const deleted = await this.model.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true, updatedBy: userId },
      { new: true }
    );

    if (deleted) {
      await AuditLogService.log({
        userId,
        operation: "delete",
        model: this.modelName,
        recordId: id,
        details: { softDeleted: true },
      });

      logger.info(
        `[DELETE] ${this.modelName} ${id} soft-deleted by user ${userId}`
      );
    }

    return deleted;
  }
}
