// src/components/forms/patientBasicForm.tsx
"use client";

import React, { useState, useTransition } from "react";
import InputField from "@/components/ui/inputField";
import Button from "@/components/ui/button";
import { addPatient, type State } from "@/lib/actions/patientActions";
import { formatDni } from "@/lib/validators";

const PatientBasicForm = () => {
  const [formState, setFormState] = useState<State>({
    success: false,
    message: "",
  });
  const [isPending, startTransition] = useTransition();
  const [dniValue, setDniValue] = useState("");

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const initialState: State = { success: false, message: "" };
      const result = await addPatient(initialState, formData);
      setFormState(result);

      if (result.success) {
        const form = document.querySelector("form") as HTMLFormElement;
        form?.reset();
        setDniValue(""); // Limpiar el estado local del DNI

        // Limpiar mensaje de éxito después de 5 segundos
        setTimeout(() => {
          setFormState({ success: false, message: "" });
        }, 5000);
      }
    });
  };

  const handleDniChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Solo permitir números y puntos, máximo 10 caracteres (incluyendo puntos)
    const cleanValue = value.replace(/[^\d.]/g, "").slice(0, 10);
    setDniValue(cleanValue);
  };

  const handleDniBlur = () => {
    // Formatear DNI al perder el foco si tiene la longitud correcta
    if (dniValue.replace(/\./g, "").length >= 7) {
      setDniValue(formatDni(dniValue));
    }
  };

  // Función para obtener la fecha máxima (ayer)
  const getMaxDate = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split("T")[0];
  };

  // Función para obtener la fecha mínima (120 años atrás)
  const getMinDate = () => {
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 120);
    return minDate.toISOString().split("T")[0];
  };

  return (
    <div className="p-6 shadow-md bg-white rounded-lg">
      {/* Mensaje de estado */}
      <div className="mb-4 min-h-[3rem] flex items-center">
        <div
          className={`w-full p-3 rounded-md text-sm font-medium transition-all duration-300 ease-in-out border ${
            formState.message
              ? formState.success
                ? "bg-green-50 text-green-800 border-green-200 opacity-100 transform translate-y-0"
                : "bg-red-50 text-red-800 border-red-200 opacity-100 transform translate-y-0"
              : "bg-transparent border-transparent opacity-0 transform -translate-y-2"
          }`}
        >
          {formState.message || "\u00A0"}
        </div>
      </div>

      {/* Errores de validación detallados */}
      {formState.errors && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <h4 className="text-sm font-medium text-red-800 mb-2">
            Se encontraron los siguientes errores:
          </h4>
          <ul className="text-sm text-red-700 space-y-1">
            {Object.entries(formState.errors).map(([field, errors]) => (
              <li key={field} className="flex items-start">
                <span className="font-medium capitalize mr-2">
                  {field.replace("_", " ")}:
                </span>
                <span>{errors.join(", ")}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form action={handleSubmit} noValidate>
        <InputField
          label="Nombre completo"
          name="full_name"
          placeholder="Ej: Juan Carlos Pérez López"
          autoComplete="name"
          required
          error={formState.errors?.full_name?.[0]}
        />

        <InputField
          label="DNI"
          name="dni"
          placeholder="Ej: 12.345.678"
          type="text"
          inputMode="numeric"
          value={dniValue}
          onChange={handleDniChange}
          onBlur={handleDniBlur}
          maxLength={10}
          required
          error={formState.errors?.dni?.[0]}
          helperText="Ingrese el DNI sin puntos (se formatearán automáticamente)"
        />

        <InputField
          label="Fecha de nacimiento"
          name="birth_date"
          type="date"
          min={getMinDate()}
          max={getMaxDate()}
          required
          error={formState.errors?.birth_date?.[0]}
          helperText="La fecha no puede ser futura ni mayor a 120 años"
        />

        <div className="flex justify-between items-center mt-6">
          <Button
            type="submit"
            variant="primary"
            className="px-8 py-3"
            disabled={isPending}
            isLoading={isPending}
          >
            {isPending ? "Guardando..." : "Guardar paciente"}
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="px-6 py-3"
            disabled={isPending}
            onClick={() => {
              const form = document.querySelector("form") as HTMLFormElement;
              form?.reset();
              setDniValue("");
              setFormState({ success: false, message: "" });
            }}
          >
            Limpiar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PatientBasicForm;
