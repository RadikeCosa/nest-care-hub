// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nest Care Hub",
  description: "A platform with utilities for home healthcare providers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
        {/* Header común para toda la app */}
        <header className="w-full py-8 bg-primary-500 text-white shadow-md">
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-6">
            <h1 className="text-3xl font-extrabold tracking-tight">
              Nest Care Hub
            </h1>
            <span className="mt-2 sm:mt-0 text-base font-medium opacity-80">
              Utilities for Home Health Care
            </span>
          </div>
        </header>

        {/* Contenido principal */}
        <main className="flex-1">{children}</main>

        {/* Footer común */}
        <footer className="w-full py-4 bg-gray-100 text-gray-500 flex justify-center items-center text-sm">
          &copy; {new Date().getFullYear()} Nest Care Hub · Made by ChinaTown
        </footer>
      </body>
    </html>
  );
}
