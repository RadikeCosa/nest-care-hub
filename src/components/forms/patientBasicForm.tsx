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

      // Solo limpiar el formulario si fue exitoso
      if (result.success) {
        const form = document.querySelector("form") as HTMLFormElement;
        form?.reset();

        // Limpiar mensaje de éxito después de 3 segundos
        setTimeout(() => {
          setFormState({ success: null, message: "" });
        }, 3000);
      }
      // Si hay errores, NO limpiamos el formulario para preservar los datos
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      {/* Mensaje de estado - espacio reservado */}
      <div className="mb-4 h-12 flex items-center">
        <div
          className={`w-full p-3 rounded-md text-sm font-medium transition-opacity duration-300 ease-in-out border ${
            formState.message
              ? formState.success
                ? "bg-green-50 text-green-800 border-green-200 opacity-100"
                : "bg-red-50 text-red-800 border-red-200 opacity-100"
              : "bg-transparent border-transparent opacity-0"
          }`}
        >
          {formState.message || "\u00A0"}
        </div>
      </div>

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
