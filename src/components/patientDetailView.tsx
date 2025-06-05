// src/components/PatientDetailView.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Patient } from "@/lib/actions/patientActions";
import { calculateAge } from "@/lib/validators";
import Button from "@/components/ui/button";
import PatientInfoCard from "@/components/patientInfoCard";
import PatientStatusBadge from "@/components/patientStatusBadge";

interface PatientDetailViewProps {
  patient: Patient;
}

export default function PatientDetailView({ patient }: PatientDetailViewProps) {
  const router = useRouter();
  const age = calculateAge(patient.birth_date);

  const handleBackClick = () => {
    router.back();
  };

  const handleEditClick = () => {
    // TODO: Implementar navegación a página de edición
    console.log("Editar paciente:", patient.id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Header con navegación */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={handleBackClick}
            className="flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Volver
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <PatientStatusBadge isActive={patient.is_active} />
          <Button variant="primary" onClick={handleEditClick}>
            Editar Paciente
          </Button>
        </div>
      </div>

      {/* Título de la página */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {patient.full_name}
        </h1>
        <p className="text-gray-600">Información detallada del paciente</p>
      </div>

      {/* Información del paciente */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PatientInfoCard
          title="Información Personal"
          items={[
            { label: "Nombre Completo", value: patient.full_name },
            { label: "DNI", value: patient.dni },
            {
              label: "Fecha de Nacimiento",
              value: new Date(patient.birth_date).toLocaleDateString("es-ES"),
            },
            { label: "Edad", value: `${age} año${age !== 1 ? "s" : ""}` },
          ]}
        />

        <PatientInfoCard
          title="Información del Sistema"
          items={[
            {
              label: "Estado",
              value: patient.is_active ? "Activo" : "Inactivo",
              highlight: true,
              highlightColor: patient.is_active ? "green" : "gray",
            },
            {
              label: "Fecha de Registro",
              value: new Date(patient.created_at).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
            { label: "ID del Sistema", value: patient.id },
          ]}
        />
      </div>

      {/* Sección para futuras funcionalidades */}
      <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Historial Médico
        </h2>
        <p className="text-gray-500 italic">
          Esta sección estará disponible cuando se implementen las citas médicas
          y el historial clínico.
        </p>
      </div>
    </div>
  );
}
