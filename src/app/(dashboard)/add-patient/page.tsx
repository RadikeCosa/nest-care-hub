import PatientBasicForm from "@/components/forms/patientBasicForm";

export default function PatientsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <div>
        <PatientBasicForm />
      </div>
    </div>
  );
}
