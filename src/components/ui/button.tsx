// components/ui/Button.tsx
import React from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 transition-colors duration-150",
  secondary:
    "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 transition-colors duration-150",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 transition-colors duration-150",
  ghost:
    "bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500 transition-colors duration-150",
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  disabled,
  isLoading = false,
  type = "button",
  ...props
}) => {
  return (
    <button
      className={`
        inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]} ${className}
      `}
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      aria-label={isLoading ? "Cargando" : props["aria-label"]}
      type={type}
      {...props}
    >
      {isLoading && (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <span className="sr-only">Cargando...</span>
        </>
      )}
      {children}
    </button>
  );
};

export default Button;
