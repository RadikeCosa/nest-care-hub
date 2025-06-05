// src/app/(dashboard)/patients/[id]/page.tsx
import { notFound } from "next/navigation";
import { getPatientById } from "@/lib/actions/patientActions";
import PatientDetailView from "@/components/patientDetailView";

interface PatientDetailPageProps {
  params: {
    id: string;
  };
}

export default async function PatientDetailPage({
  params,
}: PatientDetailPageProps) {
  const patient = await getPatientById(params.id);

  if (!patient) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <PatientDetailView patient={patient} />
    </div>
  );
}
