import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  description: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
});

const paymentSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  method: {
    type: String,
    enum: ["cash", "credit_cart", "bank_transfer"],
    required: true,
  },
  note: { type: String },
});

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      index: true,
    },

    items: [itemSchema],

    taxRate: { type: Number, default: 0 },
    taxTotal: { type: Number, default: 0 },
    total: { type: Number, required: true },

    paidAmount: { type: Number, default: 0 },
    paymentHistory: [paymentSchema],

    status: {
      type: String,
      enum: ["draft", "sent", "paid", "overdue"],
      default: "draft",
      index: true,
    },

    dueDate: { type: Date, required: true, index: true },

    notes: { type: String },
    attachments: [{ type: String }],

    isDeleted: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Invoice", invoiceSchema);
