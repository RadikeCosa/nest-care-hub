// PatientBasicForm.tsx
"use client";

import React, { useState, useTransition } from "react";
import InputField from "@/components/ui/inputField";
import Button from "@/components/ui/button";
import { addPatient, type State } from "@/lib/actions/patientActions";

const PatientBasicForm = () => {
  const [formState, setFormState] = useState<State>({
    success: false,
    message: "",
  });
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      // Crear un estado inicial para pasar a addPatient
      const initialState: State = { success: false, message: "" };

      const result = await addPatient(initialState, formData);
      setFormState(result);

      if (result.success) {
        const form = document.querySelector("form") as HTMLFormElement;
        form?.reset();

        // Limpiar mensaje de éxito después de 3 segundos
        setTimeout(() => {
          setFormState({ success: false, message: "" });
        }, 3000);
      }
    });
  };

  return (
    <div className="p-6 shadow-md">
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
          name="full_name"
          placeholder="Ej: Juan Pérez"
          autoComplete="name"
          required
        />
        <InputField
          label="DNI"
          name="dni"
          placeholder="Ej: 12345678"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={9}
          required
        />
        <InputField
          label="Fecha de nacimiento"
          name="birth_date"
          type="date"
          max={new Date().toISOString().split("T")[0]} // Evita fechas futuras
          required
        />

        <Button
          type="submit"
          variant="primary"
          className="w-50 mt-4"
          disabled={isPending}
        >
          {isPending ? "Guardando..." : "Guardar paciente"}
        </Button>
      </form>
    </div>
  );
};

export default PatientBasicForm;
