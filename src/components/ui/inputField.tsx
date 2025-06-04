import React from "react";

type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "date";

interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string; // Etiqueta del campo, requerida para accesibilidad
  error?: string; // Mensaje de error opcional
  type?: InputType; // Tipo de input restringido a valores específicos
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  id,
  className,
  type = "text",
  ...inputProps
}) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="mb-4">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
          error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""
        } ${className || ""}`}
        {...inputProps}
      />
      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
