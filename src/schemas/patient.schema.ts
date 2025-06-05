// src/schemas/patient.schema.ts
import { z } from "zod";
import {
  dniValidator,
  birthDateValidator,
  fullNameValidator,
} from "@/lib/validators";

export const patientSchema = z.object({
  full_name: fullNameValidator,
  dni: dniValidator,
  birth_date: birthDateValidator,
});

export const patientUpdateSchema = z.object({
  full_name: fullNameValidator.optional(),
  dni: dniValidator.optional(),
  birth_date: birthDateValidator.optional(),
  is_active: z.boolean().optional(),
});

// Schema para búsqueda de pacientes
export const patientSearchSchema = z.object({
  search_term: z.string().min(1, "Término de búsqueda requerido").trim(),
  active_only: z.boolean().default(true),
});

// Schema para validación de ID de paciente
export const patientIdSchema = z
  .string()
  .uuid("ID de paciente debe ser un UUID válido");

export type PatientInput = z.infer<typeof patientSchema>;
export type PatientUpdateInput = z.infer<typeof patientUpdateSchema>;
export type PatientSearchInput = z.infer<typeof patientSearchSchema>;
export type PatientId = z.infer<typeof patientIdSchema>;
