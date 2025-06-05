// src/components/PatientInfoCard.tsx
import React from "react";

interface InfoItem {
  label: string;
  value: string;
  highlight?: boolean;
  highlightColor?: "green" | "red" | "blue" | "gray";
}

interface PatientInfoCardProps {
  title: string;
  items: InfoItem[];
}

const highlightColorClasses = {
  green: "bg-green-100 text-green-800",
  red: "bg-red-100 text-red-800",
  blue: "bg-blue-100 text-blue-800",
  gray: "bg-gray-100 text-gray-600",
};

export default function PatientInfoCard({
  title,
  items,
}: PatientInfoCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-gray-500">
              {item.label}
            </span>
            {item.highlight ? (
              <span
                className={`inline-block px-2 py-1 rounded-full text-sm font-medium w-fit ${
                  highlightColorClasses[item.highlightColor || "gray"]
                }`}
              >
                {item.value}
              </span>
            ) : (
              <span className="text-gray-900 font-medium">{item.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
