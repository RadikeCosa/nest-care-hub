// src/components/ui/Header.tsx
export default function Header() {
  return (
    <header className="w-full py-8 bg-gray-200 text-gray-600">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <h1 className="text-3xl font-extrabold">Nest Care Hub</h1>
        <span className="mt-2 sm:mt-0 text-base font-medium opacity-80">
          Utilities for Home Health Care
        </span>
      </div>
    </header>
  );
}
