// src/components/PatientCard.tsx
import React from "react";
import { Patient } from "@/lib/actions/patientActions";
import { calculateAge } from "@/lib/validators";

interface PatientCardProps {
  patient: Patient;
  onClick?: (patient: Patient) => void;
}

export default function PatientCard({ patient, onClick }: PatientCardProps) {
  const age = calculateAge(patient.birth_date);
  const isActive = patient.is_active;

  const handleClick = () => {
    if (onClick) {
      onClick(patient);
    }
  };

  return (
    <div
      className={`
        relative p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer
        hover:shadow-md hover:scale-105
        ${
          isActive
            ? "border-green-200 bg-green-50 hover:border-green-300"
            : "border-gray-200 bg-gray-50 hover:border-gray-300"
        }
        ${onClick ? "hover:bg-opacity-80" : ""}
      `}
      onClick={handleClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Indicador de estado */}
      <div
        className={`
          absolute top-3 right-3 w-3 h-3 rounded-full
          ${isActive ? "bg-green-500" : "bg-gray-400"}
        `}
        title={isActive ? "Activo" : "Inactivo"}
      />

      {/* Contenido principal */}
      <div className="pr-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {patient.full_name}
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {age} año{age !== 1 ? "s" : ""}
          </span>

          <span
            className={`
              px-2 py-1 rounded-full text-xs font-medium
              ${
                isActive
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-600"
              }
            `}
          >
            {isActive ? "Activo" : "Inactivo"}
          </span>
        </div>
      </div>
    </div>
  );
}
