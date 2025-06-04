import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="w-full py-8 bg-primary-500 text-white shadow-md">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-6">
          <h1 className="text-3xl font-extrabold tracking-tight   -500">
            Nest Care Hub
          </h1>
          <span className="mt-2 sm:mt-0 text-base font-medium opacity-80">
            Cuidando a quienes más importan
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto px-6 py-12 flex flex-col items-center">
        {/* Navegación principal */}
        <nav className="w-full max-w-md flex flex-col gap-6">
          <Link
            href="/"
            className="block w-full bg-primary-100 text-primary-700 hover:bg-primary-200 hover:text-primary-900 transition rounded-lg px-6 py-4 font-semibold text-lg shadow-sm border border-primary-200"
          >
            ➕ Agregar paciente
          </Link>
          {/* Ejemplo de futuros links */}
          {/* <Link
            href="/patients"
            className="block w-full bg-accent-100 text-accent-700 hover:bg-accent-200 hover:text-accent-900 transition rounded-lg px-6 py-4 font-semibold text-lg shadow-sm border border-accent-200"
          >
            👥 Ver pacientes
          </Link>
          <Link
            href="/caregivers"
            className="block w-full bg-success-100 text-success-700 hover:bg-success-200 hover:text-success-900 transition rounded-lg px-6 py-4 font-semibold text-lg shadow-sm border border-success-200"
          >
            🧑‍⚕️ Cuidadores
          </Link> */}
        </nav>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 bg-gray-100 text-gray-500 flex justify-center items-center text-sm">
        &copy; {new Date().getFullYear()} Nest Care Hub · Hecho por ChinaTown
      </footer>
    </div>
  );
}
