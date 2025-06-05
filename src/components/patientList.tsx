// src/components/PatientList.tsx
"use client";

import React from "react";
import { usePatients } from "@/lib/hooks/usePatients";
import { Patient } from "@/lib/actions/patientActions";
import PatientFilters from "@/components/patientFilters";
import PatientsGrid from "@/components/ui/patientGrid";

interface PatientListProps {
  onPatientSelect?: (patient: Patient) => void;
}

export default function PatientList({ onPatientSelect }: PatientListProps) {
  const { patients, loading, error, filter, setFilter } = usePatients();

  const handlePatientClick = (patient: Patient) => {
    if (onPatientSelect) {
      onPatientSelect(patient);
    }
    // Aquí podrías agregar navegación o abrir un modal
    console.log("Paciente seleccionado:", patient);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Lista de Pacientes
        </h1>
        <p className="text-gray-600">
          Gestiona y visualiza la información de tus pacientes
        </p>
      </div>

      {/* Filtros */}
      <PatientFilters
        currentFilter={filter}
        onFilterChange={setFilter}
        disabled={loading}
      />

      {/* Grid de pacientes */}
      <PatientsGrid
        patients={patients}
        loading={loading}
        error={error}
        onPatientClick={handlePatientClick}
      />

      {/* Información adicional */}
      {!loading && !error && patients.length > 0 && (
        <div className="mt-6 text-sm text-gray-500 text-center">
          Mostrando {patients.length} paciente{patients.length !== 1 ? "s" : ""}{" "}
          {filter !== "all" && (
            <span>({filter === "active" ? "activos" : "inactivos"})</span>
          )}
        </div>
      )}
    </div>
  );
}
