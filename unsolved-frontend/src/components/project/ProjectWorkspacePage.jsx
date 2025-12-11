// src/components/project/ProjectWorkspacePage.jsx
"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

const INITIAL_SECTIONS = [
  {
    id: "research",
    title: "Research & Planning",
    number: 1,
    tasks: [
      { id: "analyze", label: "Analyze the problem thoroughly", completed: true },
      { id: "research-solutions", label: "Research existing solutions", completed: true },
      { id: "roadmap", label: "Create solution roadmap", completed: false },
    ],
  },
  {
    id: "development",
    title: "Development",
    number: 2,
    tasks: [
      { id: "repo", label: "Set up project repository", completed: false },
      { id: "mvp", label: "Build MVP/prototype", completed: false },
      { id: "test", label: "Test and iterate", completed: false },
    ],
  },
  {
    id: "docs",
    title: "Documentation & Submission",
    number: 3,
    tasks: [
      { id: "write-docs", label: "Write documentation", completed: false },
      { id: "demo", label: "Record demo video", completed: false },
      { id: "submit", label: "Submit solution", completed: false },
    ],
  },
];

export default function ProjectWorkspacePage({ problem, project }) {
  const router = useRouter();
  const [tab, setTab] = useState("progress"); // "progress" | "submit"
  const [sections, setSections] = useState(INITIAL_SECTIONS);

  const { percent } = useMemo(() => {
    const allTasks = sections.flatMap((s) => s.tasks);
    const total = allTasks.length;
    const done = allTasks.filter((t) => t.completed).length;
    const pct = total === 0 ? 0 : Math.round((done / total) * 100);
    return { percent: pct };
  }, [sections]);

  const toggleTask = (sectionId, taskId) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id !== sectionId
          ? section
          : {
              ...section,
              tasks: section.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }
                  : task
              ),
            }
      )
    );
  };

  return (
    <main className="bg-slate-50/60 py-10">
      <div className="mx-auto max-w-6xl px-6 space-y-6">
        {/* Breadcrumbs + Back */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>›</span>
            <Link href="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <span>›</span>
            <span>Project Workspace</span>
          </div>

          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-800"
          >
            ← Back
          </button>
        </div>

        {/* Header */}
        <section className="flex flex-col justify-between gap-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:flex-row md:items-center">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full bg-sky-50 px-3 py-0.5 font-medium text-sky-700">
                {project.type === "team" ? "Team Project" : "Solo Project"}
              </span>
              <span className="rounded-full bg-violet-50 px-3 py-0.5 font-medium text-violet-700">
                In Progress
              </span>
            </div>
            <h1 className="text-xl font-semibold text-slate-900 md:text-2xl">
              {project.title}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Working on a solution for the reported problem.
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-700">
            <span className="font-semibold text-slate-900">Progress</span>
            <div className="flex items-center gap-2">
              <div className="h-2 w-32 rounded-full bg-slate-100">
                <div
                  className="h-2 rounded-full bg-sky-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="text-sky-600 font-semibold">
                {percent}%
              </span>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setTab("progress")}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              tab === "progress"
                ? "bg-slate-900 text-white"
                : "bg-transparent text-slate-600 hover:bg-slate-100"
            }`}
          >
            Progress
          </button>
          <button
            type="button"
            onClick={() => setTab("submit")}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              tab === "submit"
                ? "bg-slate-900 text-white"
                : "bg-transparent text-slate-600 hover:bg-slate-100"
            }`}
          >
            Submit Solution
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)]">
          {/* LEFT: main area (tabs) */}
          <section className="space-y-4">
            {tab === "progress" ? (
              <>
                {sections.map((section) => {
                  const done = section.tasks.filter(
                    (t) => t.completed
                  ).length;
                  const total = section.tasks.length;
                  const isFirst = section.number === 1;

                  return (
                    <div
                      key={section.id}
                      className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                              isFirst
                                ? "bg-sky-50 text-sky-700"
                                : "bg-slate-50 text-slate-600"
                            }`}
                          >
                            {section.number}
                          </span>
                          <h2 className="text-sm font-semibold text-slate-900">
                            {section.title}
                          </h2>
                        </div>
                        <span className="text-xs text-slate-400">
                          {done}/{total}
                        </span>
                      </div>

                      <ul className="space-y-2 text-sm">
                        {section.tasks.map((task) => (
                          <li key={task.id}>
                            <label
                              className={`flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-2 ${
                                task.completed
                                  ? "bg-sky-50/60 text-sky-700 line-through"
                                  : "bg-slate-50 text-slate-700"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() =>
                                  toggleTask(section.id, task.id)
                                }
                                className="h-4 w-4 rounded border-slate-300 text-sky-500 focus:ring-sky-500"
                              />
                              <span>{task.label}</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </>
            ) : (
              /* Submit Solution tab */
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm space-y-6">
                <h2 className="text-sm font-semibold text-slate-900">
                  Submit Your Solution
                </h2>

                {/* Summary */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-800">
                    Solution Summary <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Describe your solution, how it works, and its impact..."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                  <p className="mt-1 text-[11px] text-slate-400">
                    0/2000 characters
                  </p>
                </div>

                {/* Repo URL */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-800">
                    Repository URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/username/repo"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                {/* Demo URL */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-800">
                    Demo URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://your-demo-site.com"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                {/* Attachments */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-slate-800">
                    Attachments
                  </p>
                  <div className="grid gap-3 md:grid-cols-4 text-xs text-slate-600">
                    {["Documents", "Images", "Videos", "Other"].map(
                      (label) => (
                        <button
                          key={label}
                          type="button"
                          className="flex h-24 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/40 hover:bg-slate-100"
                        >
                          <span className="mb-1 text-2xl">
                            {label === "Documents"
                              ? "📄"
                              : label === "Images"
                              ? "🖼"
                              : label === "Videos"
                              ? "🎥"
                              : "⬆"}
                          </span>
                          <span>{label}</span>
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Submit button */}
                <div className="border-t border-slate-100 pt-4">
                  <button className="w-full rounded-full bg-sky-500 py-2.5 text-sm font-medium text-white hover:bg-sky-600">
                    Submit Solution
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* RIGHT column */}
          <section className="space-y-4">
            {/* Problem */}
            <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
              <h2 className="mb-3 text-sm font-semibold text-slate-900">
                Problem
              </h2>
              <Link
                href={`/problems/${problem.id}`}
                className="block text-sm font-medium text-sky-700 hover:underline"
              >
                {problem.title}
              </Link>
              <p className="mt-1 text-xs text-slate-500">
                {problem.description}
              </p>
            </div>

            {/* Team members: only for team projects */}
            {project.type === "team" && (
              <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
                <h2 className="mb-3 text-sm font-semibold text-slate-900">
                  Team Members
                </h2>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center justify-between">
                    <span>Priya Sharma</span>
                    <span className="text-slate-400">Lead</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Arjun Patel</span>
                    <span className="text-slate-400">Member</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Meera Krishnan</span>
                    <span className="text-slate-400">Member</span>
                  </li>
                </ul>
                <button className="mt-3 w-full rounded-full border border-slate-200 bg-slate-50 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100">
                  + Invite Member
                </button>
              </div>
            )}

            {/* Timeline */}
            <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
              <h2 className="mb-3 text-sm font-semibold text-slate-900">
                Timeline
              </h2>
              <dl className="space-y-2 text-xs text-slate-700">
                <div className="flex items-center justify-between">
                  <dt>Started</dt>
                  <dd>{project.startDate}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>Target</dt>
                  <dd>{project.targetDate}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>Time Left</dt>
                  <dd className="flex items-center gap-1 text-emerald-600">
                    <span className="text-[10px]">⏱</span>
                    <span>{project.timeLeft}</span>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Quick Actions */}
            <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
              <h2 className="mb-3 text-sm font-semibold text-slate-900">
                Quick Actions
              </h2>
              <div className="space-y-2 text-xs">
                <button className="flex w-full items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2 hover:bg-slate-100">
                  <span>📁 Connect Repository</span>
                </button>
                <button className="flex w-full items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2 hover:bg-slate-100">
                  <span>🎥 Record Demo</span>
                </button>
                <button className="flex w-full items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2 hover:bg-slate-100">
                  <span>📄 View Guidelines</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
