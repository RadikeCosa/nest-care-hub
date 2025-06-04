// PatientBasicForm.tsx
"use client";
import React, { useState, useTransition } from "react";
import InputField from "@/components/ui/inputField";
import Button from "@/components/ui/button";
import { savePatient } from "@/lib/actions/patientActions";

interface FormState {
  success: boolean | null;
  message: string;
  errors?: Record<string, string>;
}

const PatientBasicForm = () => {
  const [formState, setFormState] = useState<FormState>({
    success: null,
    message: "",
  });
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await savePatient(formData);
      setFormState(result);

      // Si fue exitoso, limpiar el formulario
      if (result.success) {
        const form = document.querySelector("form") as HTMLFormElement;
        form?.reset();

        // Limpiar mensaje de éxito después de 3 segundos
        setTimeout(() => {
          setFormState({ success: null, message: "" });
        }, 3000);
      }
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      {/* Mensaje de estado */}
      {formState.message && (
        <div
          className={`mb-4 p-3 rounded-md text-sm font-medium ${
            formState.success
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {formState.message}
        </div>
      )}

      <form action={handleSubmit}>
        <InputField
          label="Nombre completo"
          name="fullName"
          placeholder="Ej: Juan Pérez"
          autoComplete="name"
          required
          error={formState.errors?.fullName}
        />
        <InputField
          label="DNI"
          name="dni"
          placeholder="Ej: 12345678"
          type="text"
          inputMode="numeric"
          required
          error={formState.errors?.dni}
        />
        <InputField
          label="Fecha de nacimiento"
          name="birthDate"
          type="date"
          required
          error={formState.errors?.birthDate}
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full mt-4"
          disabled={isPending}
        >
          {isPending ? "Guardando..." : "Guardar paciente"}
        </Button>
      </form>
    </div>
  );
};

export default PatientBasicForm;
