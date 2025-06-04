import { z } from "zod/v4";

export const patientSchema = z.object({
  fullName: z
    .string()
    .min(3, "El nombre completo debe tener al menos 3 caracteres")
    .max(100, "El nombre completo no puede exceder 100 caracteres"),
  dni: z
    .string()
    .min(7, "El DNI debe tener al menos 7 caracteres")
    .max(9, "El DNI no puede exceder 9 caracteres")
    .regex(/^\d+$/, "El DNI debe contener solo números"),
  birthDate: z.string().refine(
    (date) => {
      // Validar formato ISO yyyy-mm-dd y que no sea fecha futura
      const parsed = Date.parse(date);
      return !isNaN(parsed) && parsed <= Date.now();
    },
    {
      message: "Fecha de nacimiento inválida o futura",
    }
  ),
});
