// src/schemas/patientSchema.ts
import { z } from "zod/v4";

export const patientSchema = z.object({
  full_name: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Full name cannot exceed 100 characters"),
  dni: z
    .string()
    .min(1, "DNI is required")
    .max(9, "DNI cannot exceed 9 characters")
    .regex(/^\d+$/, "DNI must contain only numbers"),
  birth_date: z
    .string()
    .min(1, "Birth date is required")
    .refine((date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime()) && parsedDate <= new Date();
    }, "Birth date must be a valid date and not in the future"),
});

export const patientUpdateSchema = z.object({
  full_name: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Full name cannot exceed 100 characters")
    .optional(),
  dni: z
    .string()
    .min(1, "DNI is required")
    .max(9, "DNI cannot exceed 9 characters")
    .regex(/^\d+$/, "DNI must contain only numbers")
    .optional(),
  birth_date: z
    .string()
    .min(1, "Birth date is required")
    .refine((date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime()) && parsedDate <= new Date();
    }, "Birth date must be a valid date and not in the future")
    .optional(),
  is_active: z.boolean().optional(),
});

export type PatientInput = z.infer<typeof patientSchema>;
export type PatientUpdateInput = z.infer<typeof patientUpdateSchema>;
