// src/components/PatientStatusBadge.tsx
import React from "react";

interface PatientStatusBadgeProps {
  isActive: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-2 text-base",
};

export default function PatientStatusBadge({
  isActive,
  size = "md",
}: PatientStatusBadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-2 rounded-full font-medium
        ${sizeClasses[size]}
        ${
          isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
        }
      `}
    >
      <span
        className={`
          w-2 h-2 rounded-full
          ${isActive ? "bg-green-500" : "bg-gray-400"}
        `}
      />
      {isActive ? "Activo" : "Inactivo"}
    </span>
  );
}
