import { z } from "zod";

export const createCustomerSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalı"),
  email: z.string().email("Geçerli bir e-posta giriniz"),
  phone: z.string().min(8).max(20).optional(),
  company: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const updateCustomerSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(8).max(20).optional(),
  company: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const customerIdParamSchema = z.object({
  id: z.string().length(24, "Geçerli müşteri ID giriniz"),
});
