import AuditLog from "../db/models/AuditLogModel.js";

export default class AuditLogService {
  static async log({ userId, operation, model, recordId, details = {} }) {
    await AuditLog.create({ userId, operation, model, recordId, details });
  }
}
