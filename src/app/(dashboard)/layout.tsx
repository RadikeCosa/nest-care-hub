// src/app/(dashboard)/layout.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home", emoji: "🏠" },
  { href: "/patients", label: "Patients", emoji: "👥" },
  /* { href: "/caregivers", label: "Caregivers", emoji: "🧑‍⚕️" }, */
  { href: "/settings", label: "Settings", emoji: "⚙️" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-full bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:inset-auto
          md:flex md:flex-col
        `}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 md:hidden">
          <h2 className="text-xl font-bold">Nest Care Hub</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
            className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navLinks.map(({ href, label, emoji }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-md font-semibold transition-colors
                  ${
                    isActive
                      ? "bg-primary-500 text-white"
                      : "text-gray-700 hover:bg-primary-100 hover:text-primary-700"
                  }
                `}
                onClick={() => setSidebarOpen(false)} // Cierra menú en móvil al clickear
              >
                <span className="text-lg">{emoji}</span>
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Overlay para menú móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Contenido principal */}
      <div className="flex flex-col flex-1 min-h-screen md:pl-64">
        {/* Header móvil para abrir sidebar */}
        <header className="flex items-center justify-between bg-white border-b border-gray-200 px-6 py-4 shadow-sm md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
          >
            {/* Icono hamburguesa */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <h1 className="text-xl font-bold">Nest Care Hub</h1>
        </header>

        {/* Contenido del dashboard */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
