// src/components/PatientList.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  getPatients,
  getActivePatients,
  getInactivePatients,
  Patient,
} from "@/lib/actions/patientActions";

type Filter = "all" | "active" | "inactive";

export default function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  // Función para cargar pacientes según filtro
  async function loadPatients(selectedFilter: Filter) {
    setLoading(true);
    setError(null);

    try {
      let data: Patient[] = [];

      if (selectedFilter === "all") {
        data = await getPatients();
      } else if (selectedFilter === "active") {
        data = await getActivePatients();
      } else if (selectedFilter === "inactive") {
        data = await getInactivePatients();
      }

      setPatients(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error loading patients");
      }
    } finally {
      setLoading(false);
    }
  }

  // Cargar pacientes al montar y cuando cambie el filtro
  useEffect(() => {
    loadPatients(filter);
  }, [filter]);

  return (
    <div className="patient-list-container">
      <h2>Patient List</h2>

      {/* Filtros */}
      <div className="filter-buttons" style={{ marginBottom: "1rem" }}>
        <button
          onClick={() => setFilter("all")}
          disabled={filter === "all"}
          style={{ marginRight: "0.5rem" }}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          disabled={filter === "active"}
          style={{ marginRight: "0.5rem" }}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("inactive")}
          disabled={filter === "inactive"}
        >
          Inactive
        </button>
      </div>

      {/* Estado de carga y error */}
      {loading && <p>Loading patients...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Lista de pacientes */}
      {!loading && !error && patients.length === 0 && <p>No patients found.</p>}

      {!loading && !error && patients.length > 0 && (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>
                Full Name
              </th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>
                DNI
              </th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>
                Birth Date
              </th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>
                Active
              </th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
                  {patient.full_name}
                </td>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
                  {patient.dni}
                </td>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
                  {new Date(patient.birth_date).toLocaleDateString()}
                </td>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
                  {patient.is_active ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
