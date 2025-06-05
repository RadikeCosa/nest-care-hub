// src/components/ui/inputField.tsx
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
  label: string;
  error?: string;
  helperText?: string;
  type?: InputType;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  helperText,
  id,
  className,
  type = "text",
  ...inputProps
}) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
  const hasError = Boolean(error);

  return (
    <div className="mb-4">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {inputProps.required && (
          <span className="text-red-500 ml-1" aria-label="Campo requerido">
            *
          </span>
        )}
      </label>

      <input
        id={inputId}
        type={type}
        aria-invalid={hasError ? "true" : undefined}
        aria-describedby={
          error
            ? `${inputId}-error`
            : helperText
            ? `${inputId}-helper`
            : undefined
        }
        className={`
          block w-full rounded-md border px-3 py-2 placeholder-gray-400 
          focus:outline-none focus:ring-2 focus:ring-offset-0 sm:text-sm
          transition-colors duration-200 ease-in-out
          ${
            hasError
              ? "border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-white hover:border-gray-400"
          } 
          ${className || ""}
        `}
        {...inputProps}
      />

      {/* Texto de ayuda */}
      {helperText && !error && (
        <p id={`${inputId}-helper`} className="mt-1 text-xs text-gray-500">
          {helperText}
        </p>
      )}

      {/* Mensaje de error */}
      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-1 text-sm text-red-600 flex items-center"
          role="alert"
        >
          <svg
            className="w-4 h-4 mr-1 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
