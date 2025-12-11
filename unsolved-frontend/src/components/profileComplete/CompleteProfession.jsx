"use client";

import { useState } from "react";

export default function CompleteProfession({ category, profession, setProfession }) {
  const professions = [
    "Doctor",
    "Engineer",
    "Agriculture",
    "Lawyer",
    "Teacher",
    "Entrepreneur",
    "Government Officer",
    "NGO Worker",
    "Other",
  ];

  if (!category) return null;

  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <p className="mb-3 text-sm font-semibold text-slate-800">
        {category === "student" ? "Degree" : "Profession"}
      </p>

      {category === "student" ? (
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
          B.Tech (Default)
        </div>
      ) : (
        <select
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
        >
          <option value="">Select Profession</option>
          {professions.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      )}
    </section>
  );
}
