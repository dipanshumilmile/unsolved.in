"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/auth";

export default function ProblemFilters({ active, onChange }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    }

    loadUser();
  }, []);

  const tabs =
    user?.role === "PROFESSIONAL"
      ? [
          {
            label: "My Problems",
            value: "my-problems",
          },
          {
            label: "Saved",
            value: "saved",
          },
        ]
      : [
          {
            label: "My Problems",
            value: "my-problems",
          },
          {
            label: "My Submissions",
            value: "my-submissions",
          },
          {
            label: "Saved",
            value: "saved",
          },
          {
            label: "My Teams",
            value: "my-teams",
            disabled: true,
          },
        ];
  
  

  return (
    <div className="mt-6 flex gap-5 border-b border-gray-200">
      {tabs.map(({ label, value, disabled }) => (
        <button
          key={value}
          disabled={disabled}
          onClick={() => !disabled && onChange(value)}
          className={`pb-2 text-sm font-medium transition-all ${
            disabled
              ? "cursor-not-allowed opacity-50"
              : active === value
                ? "border-b-2 border-teal-600 text-teal-600"
                : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {label}

          {disabled && (
            <span className="ml-2 rounded bg-slate-100 px-2 py-0.5 text-[10px]">
              Soon
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
