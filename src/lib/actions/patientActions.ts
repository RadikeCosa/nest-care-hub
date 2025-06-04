// patientActions.ts
"use server";
import { patientSchema } from "@/schemas/patient.schema";
import { supabase } from "@/lib/supabase";

export async function savePatient(formData: FormData): Promise<{
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}> {
  const data = {
    fullName: formData.get("fullName")?.toString() ?? "",
    dni: formData.get("dni")?.toString() ?? "",
    birthDate: formData.get("birthDate")?.toString() ?? "",
  };

  const result = patientSchema.safeParse(data);
  if (!result.success) {
    const fieldErrors: Record<string, string> = {};

    // Convertir errores de Zod a formato más amigable
    Object.entries(result.error.format()).forEach(([key, error]) => {
      if (
        key !== "_errors" &&
        error &&
        typeof error === "object" &&
        "_errors" in error
      ) {
        fieldErrors[key] = error._errors[0] || "Campo inválido";
      }
    });

    return {
      success: false,
      message: "Por favor corrige los errores en el formulario",
      errors: fieldErrors,
    };
  }

  try {
    const { error } = await supabase.from("patients").insert([
      {
        full_name: result.data.fullName,
        dni: result.data.dni,
        birth_date: result.data.birthDate,
      },
    ]);

    if (error) {
      return {
        success: false,
        message: "Error al guardar el paciente. Por favor intenta nuevamente.",
      };
    }

    return {
      success: true,
      message: "Paciente guardado exitosamente",
    };
  } catch {
    return {
      success: false,
      message: "Error inesperado. Por favor intenta nuevamente.",
    };
  }
}
