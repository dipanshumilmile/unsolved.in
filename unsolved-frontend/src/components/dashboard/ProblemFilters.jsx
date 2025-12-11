"use client";

import { getCurrentUser } from "@/lib/fakeAuth";

export default function ProblemFilters({ active, onChange }) {
  const user = getCurrentUser();

  // Determine which tabs to show based on user type
  const tabs =
    user?.category === "professional"
      ? [
          { label: "Problems Reported", value: "problems-reported" },
          { label: "Saved", value: "saved" },
        ]
      : [
          { label: "My Submissions", value: "my-submissions" },
          { label: "My Teams", value: "my-teams" },
          { label: "Saved", value: "saved" },
        ];

  return (
    <div className="mt-6 flex gap-5 border-b border-gray-200">
      {tabs.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`pb-2 text-sm font-medium transition-all ${
            active === value
              ? "text-teal-600 border-b-2 border-teal-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
