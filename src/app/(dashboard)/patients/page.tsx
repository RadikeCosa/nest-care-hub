// src/app/(dashboard)/patients/page.tsx
import PatientList from "@/components/patientList";

export default function PatientsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <div>
        <PatientList />
      </div>
    </div>
  );
}
