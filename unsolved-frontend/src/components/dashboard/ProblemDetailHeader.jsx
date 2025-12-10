// src/components/dashboard/(components)/ProblemDetailHeader.jsx
"use client";

import React from "react";

function Pill({ label, colorClass }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClass}`}
    >
      {label}
    </span>
  );
}

export default function ProblemDetailHeader({ problem }) {
  if (!problem) return null;

  const severityLabel =
    problem.severity === "High"
      ? "High Severity"
      : problem.severity === "Critical"
      ? "Critical Severity"
      : `${problem.severity} Severity`;

  const severityColor =
    problem.severity === "High"
      ? "bg-orange-50 text-orange-700"
      : problem.severity === "Critical"
      ? "bg-red-50 text-red-700"
      : "bg-gray-100 text-gray-700";

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      {/* status row */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Pill label={problem.status} colorClass="bg-cyan-50 text-cyan-700" />
          <Pill label={severityLabel} colorClass={severityColor} />
        </div>

        <button className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-gray-50">
          {/* eye icon placeholder */}
          View Public Page →
        </button>
      </div>

      <h1 className="mb-2 text-lg font-semibold text-slate-900">
        {problem.title}
      </h1>

      {/* Meta */}
      <div className="mb-3 flex flex-wrap items-center gap-4 text-xs text-gray-500">
        <span>📍 {problem.location}</span>
        <span>🗓️ Submitted {problem.timeAgo}</span>
        <span>⬆ {problem.votes} upvotes</span>
      </div>

      {/* Big description */}
      <p className="mb-3 text-sm text-gray-700">
        {problem.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {problem.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium text-slate-700"
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}
