"use client";

import Link from "next/link";

function Pill({ label }) {
  return (
    <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
      {label}
    </span>
  );
}

export default function MyProblemCard({ problem }) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <Pill label={problem.status} />

        <span className="text-sm text-gray-500">
          {problem.solutionCount} Solution
          {problem.solutionCount !== 1 ? "s" : ""}
        </span>
      </div>

      <h2 className="mt-4 text-lg font-semibold">{problem.title}</h2>

      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
        {problem.description}
      </p>

      <div className="mt-3 text-sm text-gray-500">
        📍 {problem.city}, {problem.state}
      </div>

      <div className="mt-5 flex justify-end">
        <Link
          href={`/dashboard/problems/${problem.id}`}
          className="rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
        >
          View Solutions
        </Link>
      </div>
    </article>
  );
}
