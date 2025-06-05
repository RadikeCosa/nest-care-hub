// src/hooks/usePatients.ts
import { useEffect, useState } from "react";
import {
  getPatients,
  getActivePatients,
  getInactivePatients,
  Patient,
} from "@/lib/actions/patientActions";

export type Filter = "all" | "active" | "inactive";

interface UsePatients {
  patients: Patient[];
  loading: boolean;
  error: string | null;
  filter: Filter;
  setFilter: (filter: Filter) => void;
  refetch: () => void;
}

export function usePatients(): UsePatients {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  const loadPatients = async (selectedFilter: Filter) => {
    setLoading(true);
    setError(null);

    try {
      let data: Patient[] = [];

      switch (selectedFilter) {
        case "all":
          data = await getPatients();
          break;
        case "active":
          data = await getActivePatients();
          break;
        case "inactive":
          data = await getInactivePatients();
          break;
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
  };

  const refetch = () => {
    loadPatients(filter);
  };

  useEffect(() => {
    loadPatients(filter);
  }, [filter]);

  return {
    patients,
    loading,
    error,
    filter,
    setFilter,
    refetch,
  };
}
