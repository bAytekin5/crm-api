import Invoice from "../db/models/InvoiceModel.js";

export async function generateInvoiceNumber() {
  const year = new Date().getFullYear();
  const prefix = `INV-${year}-`;

  const latestInvoice = await Invoice.findOne({
    invoiceNumber: { $regex: `^${prefix}` },
  })
    .sort({ createdAt: -1 })
    .lean();

  let nextNumber = 1;

  if (latestInvoice) {
    const lastNumber = parseInt(latestInvoice.invoiceNumber.split("-")[2], 10);
    nextNumber = lastNumber + 1;
  }

  // Pad numarası: 0001, 0002
  const paddedNumber = String(nextNumber).padStart(4, "0");
  return `${prefix}${paddedNumber}`;
}
