import { z } from "zod";

const itemSchema = z.object({
  description: z.string().min(1, { message: "Açıklama gerekli" }),
  quantity: z.number().min(1, { message: "Miktar 1 veya daha fazla olmalı" }),
  price: z.number().min(0, { message: "Fiyat negatif olamaz" }),
});

const paymentHistorySchema = z.object({
  date: z.string().datetime({ message: "Tarih formatı geçersiz" }).optional(),
  amount: z.number().min(0, { message: "Ödeme tutarı negatif olamaz" }),
  method: z.enum(["cash", "credit_card", "bank_transfer"], {
    required_error: "Ödeme yöntemi gerekli",
  }),
  note: z.string().optional(),
});

export const createInvoiceSchema = z.object({
  customerId: z
    .string()
    .length(24, { message: "Geçerli müşteri ID giriniz (24 karakter)" }),

  items: z
    .array(itemSchema)
    .min(1, { message: "En az bir ürün/fatura kalemi giriniz" }),

  total: z.number().min(0, { message: "Toplam tutar pozitif olmalı" }),

  dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Geçerli tarih giriniz",
  }),

  notes: z.string().optional(),

  attachments: z.array(z.string()).optional(),

  paidAmount: z.number().min(0).optional(),

  paymentHistory: z.array(paymentHistorySchema).optional(),
});

export const updateInvoiceSchema = z.object({
  body: createInvoiceSchema.partial(),
});

export const invoiceIdParamSchema = z.object({
  id: z.string().length(24, { message: "Geçerli fatura ID giriniz" }),
});
