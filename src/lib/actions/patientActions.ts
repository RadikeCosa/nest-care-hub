// src/lib/actions.ts
"use server";

import { supabase } from "@/lib/supabase";
import { patientSchema, patientUpdateSchema } from "@/schemas/patient.schema";
import { revalidatePath } from "next/cache";

// Tipo exportado para reusarlo en el componente cliente
export type State = {
  success: boolean;
  message: string;
};

// Tipo para Patient actualizado según la nueva estructura
export type Patient = {
  id: string;
  full_name: string;
  dni: string;
  birth_date: string;
  created_at: string;
  is_active: boolean;
};

/**
 * Adds a new patient to the database.
 * @param prevState - Previous state of the form (for useActionState).
 * @param formData - Form data containing the patient's information.
 * @returns A promise resolving to the state object with success status and message.
 */
export async function addPatient(
  prevState: State,
  formData: FormData
): Promise<State> {
  // Extraer datos del formulario
  const full_name = formData.get("full_name");
  const dni = formData.get("dni");
  const birth_date = formData.get("birth_date");

  // Verificación inicial para evitar null/undefined
  if (!full_name || !dni || !birth_date) {
    return {
      success: false,
      message: "All fields are required.",
    };
  }

  // Validación con Zod
  const result = patientSchema.safeParse({
    full_name: full_name.toString(),
    dni: dni.toString(),
    birth_date: birth_date.toString(),
  });

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0].message,
    };
  }

  const {
    full_name: validFullName,
    dni: validDni,
    birth_date: validBirthDate,
  } = result.data;

  // Inserción en Supabase con manejo detallado de errores
  const { error } = await supabase.from("patients").insert({
    full_name: validFullName,
    dni: validDni,
    birth_date: validBirthDate,
  });

  if (error) {
    // Mapear errores específicos de Supabase
    if (error.code === "23505") {
      return {
        success: false,
        message: "A patient with this DNI already exists.",
      };
    }
    return {
      success: false,
      message: `Database error: ${error.message}`,
    };
  }

  revalidatePath("/patients");
  return {
    success: true,
    message: "Patient added successfully!",
  };
}

/**
 * Fetches all patients from the database.
 * @returns A promise resolving to the list of patients.
 * @throws Error if fetching patients fails.
 */
export async function getPatients(): Promise<Patient[]> {
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Error fetching patients: " + error.message);
  }

  return data || [];
}

/**
 * Fetches only active patients from the database.
 * @returns A promise resolving to the list of active patients.
 * @throws Error if fetching patients fails.
 */
export async function getActivePatients(): Promise<Patient[]> {
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Error fetching active patients: " + error.message);
  }

  return data || [];
}

/**
 * Fetches only inactive patients from the database.
 * @returns A promise resolving to the list of inactive patients.
 * @throws Error if fetching patients fails.
 */
export async function getInactivePatients(): Promise<Patient[]> {
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .eq("is_active", false)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Error fetching inactive patients: " + error.message);
  }

  return data || [];
}

/**
 * Fetches a single patient by ID.
 * @param id - Patient ID
 * @returns A promise resolving to the patient data or null if not found.
 */
export async function getPatientById(id: string): Promise<Patient | null> {
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // No rows returned
      return null;
    }
    throw new Error("Error fetching patient: " + error.message);
  }

  return data;
}

/**
 * Updates a patient's information.
 * @param id - Patient ID
 * @param updates - Object containing the fields to update
 * @returns A promise resolving to the state object with success status and message.
 */
export async function updatePatient(
  id: string,
  updates: Partial<
    Pick<Patient, "full_name" | "dni" | "birth_date" | "is_active">
  >
): Promise<State> {
  // Validación con Zod
  const result = patientUpdateSchema.safeParse(updates);

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0].message,
    };
  }

  const { error } = await supabase
    .from("patients")
    .update(result.data)
    .eq("id", id);

  if (error) {
    if (error.code === "23505") {
      return {
        success: false,
        message: "A patient with this DNI already exists.",
      };
    }
    return {
      success: false,
      message: `Database error: ${error.message}`,
    };
  }

  revalidatePath("/patients");
  return {
    success: true,
    message: "Patient updated successfully!",
  };
}

/**
 * Toggles a patient's active status.
 * @param id - Patient ID
 * @param isActive - New active status
 * @returns A promise resolving to the state object with success status and message.
 */
export async function togglePatientStatus(
  id: string,
  isActive: boolean
): Promise<State> {
  const { error } = await supabase
    .from("patients")
    .update({ is_active: isActive })
    .eq("id", id);

  if (error) {
    return {
      success: false,
      message: `Database error: ${error.message}`,
    };
  }

  revalidatePath("/patients");
  return {
    success: true,
    message: `Patient ${isActive ? "activated" : "deactivated"} successfully!`,
  };
}

/**
 * Deactivates a patient (soft delete).
 * @param id - Patient ID
 * @returns A promise resolving to the state object with success status and message.
 */
export async function deactivatePatient(id: string): Promise<State> {
  return togglePatientStatus(id, false);
}

/**
 * Reactivates a patient.
 * @param id - Patient ID
 * @returns A promise resolving to the state object with success status and message.
 */
export async function reactivatePatient(id: string): Promise<State> {
  return togglePatientStatus(id, true);
}

/**
 * Searches patients by name or DNI.
 * @param searchTerm - Term to search for
 * @param activeOnly - Whether to search only active patients
 * @returns A promise resolving to the list of matching patients.
 */
export async function searchPatients(
  searchTerm: string,
  activeOnly: boolean = true
): Promise<Patient[]> {
  let query = supabase
    .from("patients")
    .select("*")
    .or(`full_name.ilike.%${searchTerm}%,dni.ilike.%${searchTerm}%`)
    .order("created_at", { ascending: false });

  if (activeOnly) {
    query = query.eq("is_active", true);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error("Error searching patients: " + error.message);
  }

  return data || [];
}
