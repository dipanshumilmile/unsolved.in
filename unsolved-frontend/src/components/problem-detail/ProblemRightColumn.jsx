"use client";

import Link from "next/link";

export default function ProblemRightColumn({ problem }) {
  return (
    <div className="space-y-4">
      {/* CTA */}
      <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
        <h2 className="mb-1 text-sm font-semibold text-slate-900">
          Want to solve this?
        </h2>
        <p className="mb-4 text-xs text-slate-500">
          Form or join a team to work on a solution for this problem.
        </p>

        {/* Go to claim page */}
        <Link
          href={`/problems/${problem.id}/claim`}
          className="block w-full"
        >
          <button className="w-full rounded-full bg-sky-500 py-2 text-sm font-medium text-white hover:bg-sky-600">
            Start Solving
          </button>
        </Link>
      </section>

      {/* Problem details */}
      <section className="rounded-3xl border border-slate-100 bg-white p-5 text-sm text-slate-700 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-slate-900">
          Problem Details
        </h2>
        <dl className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <dt className="text-slate-500">Status</dt>
            <dd className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
              {problem.status.toLowerCase()}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-slate-500">Severity</dt>
            <dd className="rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-medium text-rose-700">
              {problem.severity.toLowerCase()}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-slate-500">Reported</dt>
            <dd className="text-slate-700">
              {problem.reportedAt || "Mar 20, 2024"}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-slate-500">Upvotes</dt>
            <dd className="text-slate-900 font-semibold">{problem.votes}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-slate-500">Teams Working</dt>
            <dd className="text-slate-900">{problem.teams || 0}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-slate-500">Solutions</dt>
            <dd className="text-slate-900">{problem.solutions || 0}</dd>
          </div>
        </dl>
      </section>

      {/* Reported by */}
      <section className="rounded-3xl border border-slate-100 bg-white p-5 text-sm text-slate-700 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-slate-900">
          Reported by
        </h2>
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-sm">
            {problem.authorInitials}
          </span>
          <div>
            <p className="text-sm font-medium text-slate-900">
              {problem.author}
            </p>
            <p className="text-xs text-slate-500">
              Student / Community member
            </p>
          </div>
        </div>
      </section>

      {/* Tags */}
      <section className="rounded-3xl border border-slate-100 bg-white p-5 text-sm text-slate-700 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-slate-900">
          Tags
        </h2>
        <div className="flex flex-wrap gap-2 text-xs">
          {problem.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-3 py-0.5 text-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
