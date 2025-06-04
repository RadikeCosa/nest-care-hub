// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

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
      <body className="flex flex-col h-screen bg-gray-50 text-gray-900">
        {/* Header común para toda la app */}
        <header className="w-full py-8 bg-gray-200 text-gray-600">
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between ">
            <h1 className="text-3xl font-extrabold ">Nest Care Hub</h1>
            <span className="mt-2 sm:mt-0 text-base font-medium opacity-80">
              Utilities for Home Health Care
            </span>
          </div>
        </header>

        <main className="flex-1 ">{children}</main>

        {/* Footer común */}
        <footer className="flex flex-col w-full py-4 bg-gray-200 text-gray-500  justify-center items-center text-sm">
          <div>
            {" "}
            &copy; {new Date().getFullYear()} Nest Care Hub · Made by ChinaTown{" "}
          </div>
          <div>
            <Link href="/"> Docs</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
