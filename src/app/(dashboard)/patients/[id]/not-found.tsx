// src/app/(dashboard)/patients/[id]/not-found.tsx
import Link from "next/link";
import Button from "@/components/ui/button";

export default function PatientNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-24 w-24 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Paciente No Encontrado
        </h1>

        <p className="text-gray-600 mb-8 max-w-md">
          El paciente que estás buscando no existe o ha sido eliminado del
          sistema.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/patients">
            <Button variant="primary">Volver a la Lista de Pacientes</Button>
          </Link>

          <Link href="/patients/new">
            <Button variant="secondary">Agregar Nuevo Paciente</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
