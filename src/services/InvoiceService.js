import { HTTP_CODES } from "../config/Enum.js";
import BaseAuditService from "../core/BaseAuditService.js";
import InvoiceModel from "../db/models/InvoiceModel.js";
import ApiError from "../utils/ApiError.js";
import { generateInvoiceNumber } from "../utils/invoiceUtils.js";
import { validateObjectId } from "../utils/validateObjectId.js";

export default class InvoiceService extends BaseAuditService {
  constructor() {
    super(InvoiceModel, "Invoice");
  }

  calculateTotals(items, taxRate = 0) {
    const totalBeforeTax = items.reduce((sum, item) => {
      return sum + item.quantity * item.price;
    }, 0);

    const taxTotal = (totalBeforeTax * taxRate) / 100;
    const total = totalBeforeTax + taxTotal;

    return { total, taxTotal, taxRate };
  }

  async create(data, userId) {
    if (!data.items || data.items.length === 0) {
      throw new ApiError(
        HTTP_CODES.BAD_REQUEST,
        "At least one item is required"
      );
    }

    const invoiceNumber = await generateInvoiceNumber();

    const { total, taxTotal, taxRate } = this.calculateTotals(
      data.items,
      data.taxRate
    );

    const newInvoice = await this.model.create({
      ...data,
      invoiceNumber,
      taxRate,
      taxTotal,
      total,
      createdBy: userId,
    });

    return newInvoice;
  }

  async update(id, data, userId) {
    validateObjectId(id);

    const invoice = await this.model.findOne({ _id: id, isDeleted: false });
    if (!invoice) {
      throw new ApiError(HTTP_CODES.NOT_FOUND, "Invoice not found");
    }

    if (data.items) {
      if (data.items.length === 0) {
        throw new ApiError(
          HTTP_CODES.BAD_REQUEST,
          "Invoice must contain at least one item"
        );
      }

      const { total, taxTotal, taxRate } = this.calculateTotals(
        data.items,
        data.taxRate ?? invoice.taxRate
      );

      data.total = total;
      data.taxTotal = taxTotal;
      data.taxRate = taxRate;
    }

    return await super.update(id, data, userId);
  }

  async delete(id, userId) {
    validateObjectId(id);

    return await super.delete(id, userId);
  }
}
