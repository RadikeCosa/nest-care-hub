// src/app/(dashboard)/layout.tsx
"use client";

import { useState } from "react";
import SideNav from "@/components/ui/sideNav";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-full bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <SideNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Overlay para menú móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Contenido principal */}
      <div
        className={`flex flex-col flex-1 min-h-screen transition-all duration-300 ${
          sidebarOpen ? "md:pl-64" : "md:pl-0"
        }`}
      >
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
