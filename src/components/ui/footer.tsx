// src/app/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-6 bg-gray-100 text-gray-600 flex items-center justify-center text-sm border-t border-gray-300 gap-4">
      <div>
        &copy; {new Date().getFullYear()} Nest Care Hub · Made by ChinaTown
      </div>
      <nav>
        <Link
          href="https://nest-care-docs.vercel.app/"
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          Docs
        </Link>
      </nav>
    </footer>
  );
}
