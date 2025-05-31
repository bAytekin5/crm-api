import { z } from "zod";

export const createCustomerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
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
