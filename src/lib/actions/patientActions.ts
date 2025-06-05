// src/lib/actions/patientActions.ts
"use server";

import { supabase } from "@/lib/supabase";
import {
  patientSchema,
  patientUpdateSchema,
  patientSearchSchema,
  patientIdSchema,
  type PatientUpdateInput,
} from "@/schemas/patient.schema";
import { revalidatePath } from "next/cache";

export type State = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export type Patient = {
  id: string;
  full_name: string;
  dni: string;
  birth_date: string;
  created_at: string;
  is_active: boolean;
};

/**
 * Maneja errores de Supabase y devuelve mensajes apropiados
 */
function handleSupabaseError(error: {
  code?: string;
  message: string;
  constraint?: string;
}): string {
  switch (error.code) {
    case "23505":
      if (error.constraint?.includes("dni")) {
        return "Ya existe un paciente con este DNI";
      }
      return "Ya existe un registro con estos datos";
    case "23503":
      return "Error de referencia en la base de datos";
    case "23514":
      return "Los datos no cumplen con las restricciones requeridas";
    case "PGRST116":
      return "No se encontró el registro solicitado";
    default:
      return `Error de base de datos: ${error.message}`;
  }
}

/**
 * Agrega un nuevo paciente a la base de datos
 */
export async function addPatient(
  prevState: State,
  formData: FormData
): Promise<State> {
  try {
    // Extraer y limpiar datos del formulario
    const rawData = {
      full_name: formData.get("full_name")?.toString()?.trim() || "",
      dni: formData.get("dni")?.toString()?.trim() || "",
      birth_date: formData.get("birth_date")?.toString()?.trim() || "",
    };

    // Validación con Zod
    const validationResult = patientSchema.safeParse(rawData);

    if (!validationResult.success) {
      const errors: Record<string, string[]> = {};
      validationResult.error.issues.forEach((issue) => {
        const path = issue.path.join(".");
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(issue.message);
      });

      return {
        success: false,
        message: "Por favor corrige los errores en el formulario",
        errors,
      };
    }

    const validatedData = validationResult.data;

    // Verificar si ya existe un paciente con el mismo DNI
    const { data: existingPatient } = await supabase
      .from("patients")
      .select("id, full_name")
      .eq("dni", validatedData.dni)
      .single();

    if (existingPatient) {
      return {
        success: false,
        message: `Ya existe un paciente con DNI ${validatedData.dni}: ${existingPatient.full_name}`,
      };
    }

    // Insertar en Supabase
    const { error } = await supabase.from("patients").insert({
      full_name: validatedData.full_name,
      dni: validatedData.dni,
      birth_date: validatedData.birth_date,
    });

    if (error) {
      console.error("Error inserting patient:", error);
      return {
        success: false,
        message: handleSupabaseError(error),
      };
    }

    revalidatePath("/patients");
    return {
      success: true,
      message: `Paciente ${validatedData.full_name} agregado exitosamente`,
    };
  } catch (error) {
    console.error("Unexpected error in addPatient:", error);
    return {
      success: false,
      message: "Error inesperado al agregar el paciente",
    };
  }
}

/**
 * Obtiene todos los pacientes de la base de datos
 */
export async function getPatients(): Promise<Patient[]> {
  try {
    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(handleSupabaseError(error));
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw new Error("Error al obtener la lista de pacientes");
  }
}

/**
 * Obtiene solo los pacientes activos
 */
export async function getActivePatients(): Promise<Patient[]> {
  try {
    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(handleSupabaseError(error));
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching active patients:", error);
    throw new Error("Error al obtener pacientes activos");
  }
}

/**
 * Obtiene solo los pacientes inactivos
 */
export async function getInactivePatients(): Promise<Patient[]> {
  try {
    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .eq("is_active", false)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(handleSupabaseError(error));
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching inactive patients:", error);
    throw new Error("Error al obtener pacientes inactivos");
  }
}

/**
 * Obtiene un paciente por ID
 */
export async function getPatientById(id: string): Promise<Patient | null> {
  try {
    const validationResult = patientIdSchema.safeParse(id);

    if (!validationResult.success) {
      throw new Error("ID de paciente inválido");
    }

    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .eq("id", validationResult.data)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null;
      }
      throw new Error(handleSupabaseError(error));
    }

    return data;
  } catch (error) {
    console.error("Error fetching patient by ID:", error);
    throw new Error("Error al obtener el paciente");
  }
}

/**
 * Actualiza la información de un paciente
 */
export async function updatePatient(
  id: string,
  updates: PatientUpdateInput
): Promise<State> {
  try {
    const idValidation = patientIdSchema.safeParse(id);
    if (!idValidation.success) {
      return {
        success: false,
        message: "ID de paciente inválido",
      };
    }

    const validationResult = patientUpdateSchema.safeParse(updates);

    if (!validationResult.success) {
      const errors: Record<string, string[]> = {};
      validationResult.error.issues.forEach((issue) => {
        const path = issue.path.join(".");
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(issue.message);
      });

      return {
        success: false,
        message: "Por favor corrige los errores",
        errors,
      };
    }

    const validatedData = validationResult.data;

    // Si se está actualizando el DNI, verificar que no exista
    if (validatedData.dni) {
      const { data: existingPatient } = await supabase
        .from("patients")
        .select("id, full_name")
        .eq("dni", validatedData.dni)
        .neq("id", idValidation.data)
        .single();

      if (existingPatient) {
        return {
          success: false,
          message: `Ya existe otro paciente con DNI ${validatedData.dni}: ${existingPatient.full_name}`,
        };
      }
    }

    const { error } = await supabase
      .from("patients")
      .update(validatedData)
      .eq("id", idValidation.data);

    if (error) {
      console.error("Error updating patient:", error);
      return {
        success: false,
        message: handleSupabaseError(error),
      };
    }

    revalidatePath("/patients");
    return {
      success: true,
      message: "Paciente actualizado exitosamente",
    };
  } catch (error) {
    console.error("Unexpected error in updatePatient:", error);
    return {
      success: false,
      message: "Error inesperado al actualizar el paciente",
    };
  }
}

/**
 * Cambia el estado activo/inactivo de un paciente
 */
export async function togglePatientStatus(
  id: string,
  isActive: boolean
): Promise<State> {
  try {
    const idValidation = patientIdSchema.safeParse(id);
    if (!idValidation.success) {
      return {
        success: false,
        message: "ID de paciente inválido",
      };
    }

    const { error } = await supabase
      .from("patients")
      .update({ is_active: isActive })
      .eq("id", idValidation.data);

    if (error) {
      console.error("Error toggling patient status:", error);
      return {
        success: false,
        message: handleSupabaseError(error),
      };
    }

    revalidatePath("/patients");
    return {
      success: true,
      message: `Paciente ${isActive ? "activado" : "desactivado"} exitosamente`,
    };
  } catch (error) {
    console.error("Unexpected error in togglePatientStatus:", error);
    return {
      success: false,
      message: "Error inesperado al cambiar el estado del paciente",
    };
  }
}

/**
 * Desactiva un paciente (eliminación suave)
 */
export async function deactivatePatient(id: string): Promise<State> {
  return togglePatientStatus(id, false);
}

/**
 * Reactiva un paciente
 */
export async function reactivatePatient(id: string): Promise<State> {
  return togglePatientStatus(id, true);
}

/**
 * Busca pacientes por nombre o DNI
 */
export async function searchPatients(
  searchTerm: string,
  activeOnly: boolean = true
): Promise<Patient[]> {
  try {
    const validationResult = patientSearchSchema.safeParse({
      search_term: searchTerm,
      active_only: activeOnly,
    });

    if (!validationResult.success) {
      throw new Error("Parámetros de búsqueda inválidos");
    }

    const { search_term, active_only } = validationResult.data;

    let query = supabase
      .from("patients")
      .select("*")
      .or(`full_name.ilike.%${search_term}%,dni.ilike.%${search_term}%`)
      .order("created_at", { ascending: false });

    if (active_only) {
      query = query.eq("is_active", true);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(handleSupabaseError(error));
    }

    return data || [];
  } catch (error) {
    console.error("Error searching patients:", error);
    throw new Error("Error al buscar pacientes");
  }
}
