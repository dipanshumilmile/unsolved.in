"use client";

import React from "react";
import { useRouter } from "next/navigation";

function Pill({ label, colorClass }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClass}`}
    >
      {label}
    </span>
  );
}

const STATUS_CONFIG = {
  OPEN: {
    label: "Open",
    color: "bg-sky-100 text-sky-700",
  },
  IN_PROGRESS: {
    label: "In Progress",
    color: "bg-amber-100 text-amber-700",
  },
  SOLVED: {
    label: "Solved",
    color: "bg-emerald-100 text-emerald-700",
  },
};

export default function ProblemDetailHeader({ problem }) {
  const router = useRouter();

  if (!problem) return null;

  const status = STATUS_CONFIG[problem.status] ?? {
    label: problem.status,
    color: "bg-gray-100 text-gray-700",
  };

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      {/* Status Row */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Pill label={status.label} colorClass={status.color} />
        </div>

        <button
          onClick={() => router.push(`/problems/${problem.id}`)}
          className="text-sm text-sky-600 hover:text-sky-700"
        >
          View Public Page →
        </button>
      </div>

      {/* Title */}
      <h1 className="mb-2 text-lg font-semibold text-slate-900">
        {problem.title}
      </h1>

      {/* Meta */}
      <div className="mb-3 flex flex-wrap items-center gap-4 text-xs text-gray-500">
        <span>
          📍 {problem.city}, {problem.state}
        </span>
        <span>🗓️ Submitted</span>
        <span>⬆ {problem.upvoteCount} upvotes</span>
      </div>

      {/* Description */}
      <p className="mb-3 text-sm text-gray-700">{problem.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {problem.tags?.map((tag) => (
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
