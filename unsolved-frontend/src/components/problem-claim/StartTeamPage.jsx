// src/components/problem-claim/StartTeamPage.jsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StartTeamPage({ problem }) {
  const router = useRouter();
  const [teamName, setTeamName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [maxSize, setMaxSize] = useState("5");

  const isValid = teamName.trim() !== "" && startDate && targetDate;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    const projectId = 1; // replace with real id later
    const params = new URLSearchParams({
      startDate,
      targetDate,
      type: "team",
    });

    router.push(`/dashboard/projects/${projectId}?${params.toString()}`);
  };

  return (
    <main className="bg-slate-50/60 py-10">
      <div className="mx-auto max-w-3xl px-6 space-y-8">
        {/* Breadcrumbs + back */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>›</span>
            <Link href="/discover" className="hover:underline">
              Problems
            </Link>
            <span>›</span>
            <Link
              href={`/problems/${problem.id}`}
              className="hover:underline"
            >
              {problem.title}
            </Link>
            <span>›</span>
            <Link
              href={`/problems/${problem.id}/claim`}
              className="hover:underline"
            >
              Claim
            </Link>
            <span>›</span>
            <span>Start Team</span>
          </div>

          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-800"
          >
            ← Back
          </button>
        </div>

        {/* Card */}
        <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500 text-2xl text-white">
              👥
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                Start a Team
              </h1>
              <p className="text-xs text-slate-500">
                For:{" "}
                <span className="font-medium">{problem.title}</span>
              </p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Team Name */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-800">
                Team Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g., Green Warriors, Tech Innovators"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
              <p className="mt-1 text-[11px] text-slate-400">
                0/50 characters
              </p>
            </div>

            {/* Start / Target dates */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-800">
                  Start Date <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-800">
                  Target Date <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>

            {/* Team Description (old field) */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-800">
                Team Description
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your approach and what kind of teammates you're looking for..."
                className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
              <p className="mt-1 text-[11px] text-slate-400">
                0/500 characters
              </p>
            </div>

            {/* Required Skills (old field) */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-800">
                Required Skills
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="e.g., React, Python, Design"
                  className="flex-1 rounded-2xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-lg text-slate-600 hover:bg-slate-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Maximum Team Size (old field) */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-800">
                Maximum Team Size
              </label>
              <select
                value={maxSize}
                onChange={(e) => setMaxSize(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
              >
                {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-[11px] text-slate-400">
                How many people can join your team (2–10)
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => router.back()}
                className="w-full rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 sm:w-32"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isValid}
                className={`w-full rounded-full px-4 py-2.5 text-sm font-medium text-white sm:w-40 ${
                  isValid
                    ? "bg-sky-500 hover:bg-sky-600"
                    : "bg-slate-300 cursor-not-allowed"
                }`}
              >
                Create Team
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
