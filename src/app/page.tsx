// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center container mt-20 ">
      <nav className="w-full max-w-md flex flex-col gap-6">
        <Link
          href="/add-patient"
          className="block w-full bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition rounded-lg px-6 py-4 font-semibold text-lg shadow-lg border border-gray-200"
        >
          ➕ Add Patient
        </Link>
        <Link
          href="/patients"
          className="block w-full bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition rounded-lg px-6 py-4 font-semibold text-lg shadow-lg border border-gray-200"
        >
          👥 View Patients
        </Link>
      </nav>
    </div>
  );
}
