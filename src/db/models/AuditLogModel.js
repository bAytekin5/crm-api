import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    operation: {
      type: String,
      enum: ["create", "update", "delete", "login", "logout"],
      required: true,
    },
    model: { type: String, required: true },
    recordId: { type: mongoose.Schema.Types.ObjectId },
    details: { type: Object },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("AuditLog", auditLogSchema);
