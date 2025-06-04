// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center container mx-auto px-6 py-12">
      {/* Main navigation */}
      <nav className="w-full max-w-md flex flex-col gap-6">
        <Link
          href="/patients"
          className="block w-full bg-primary-100 text-primary-700 hover:bg-primary-200 hover:text-primary-900 transition rounded-lg px-6 py-4 font-semibold text-lg shadow-sm border border-primary-200"
        >
          ➕ Add Patient
        </Link>
        <Link
          href="/patients"
          className="block w-full bg-primary-100 text-primary-700 hover:bg-primary-200 hover:text-primary-900 transition rounded-lg px-6 py-4 font-semibold text-lg shadow-sm border border-primary-200"
        >
          👥 View Patients
        </Link>
      </nav>
    </div>
  );
}
