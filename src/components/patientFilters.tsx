// src/components/PatientFilters.tsx
import React from "react";
import Button from "@/components/ui/button";
import { Filter } from "@/lib/hooks/usePatients";

interface PatientFiltersProps {
  currentFilter: Filter;
  onFilterChange: (filter: Filter) => void;
  disabled?: boolean;
}

const filterLabels: Record<Filter, string> = {
  all: "Todos",
  active: "Activos",
  inactive: "Inactivos",
};

export default function PatientFilters({
  currentFilter,
  onFilterChange,
  disabled = false,
}: PatientFiltersProps) {
  const filters: Filter[] = ["all", "active", "inactive"];

  return (
    <div className="flex gap-2 mb-6">
      {filters.map((filter) => (
        <Button
          key={filter}
          variant={currentFilter === filter ? "primary" : "secondary"}
          onClick={() => onFilterChange(filter)}
          disabled={disabled}
          className={currentFilter === filter ? "" : ""}
        >
          {filterLabels[filter]}
        </Button>
      ))}
    </div>
  );
}
