// src/components/SideNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home", emoji: "🏠" },
  { href: "/patients", label: "Patients", emoji: "👥" },
  /* { href: "/caregivers", label: "Caregivers", emoji: "🧑‍⚕️" }, */
  { href: "/settings", label: "Settings", emoji: "⚙️" },
];

interface SideNavProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function SideNav({ sidebarOpen, setSidebarOpen }: SideNavProps) {
  const pathname = usePathname();

  return (
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
  );
}
