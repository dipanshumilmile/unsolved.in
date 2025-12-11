"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

// dummy teams for now
const TEAMS = [
  {
    id: 1,
    name: "Drain Solvers",
    description:
      "Engineering students building a smart drainage monitoring solution.",
    membersCount: 1,
    status: "forming",
    statusColor: "bg-cyan-50 text-cyan-700",
    membersAvatars: ["PS"],
  },
  {
    id: 2,
    name: "Flood Watch",
    description:
      "Community volunteers focused on flood prevention and awareness.",
    membersCount: 2,
    status: "active",
    statusColor: "bg-violet-50 text-violet-700",
    membersAvatars: ["NG", "RM"],
  },
];

export default function JoinTeamPage({ problem }) {
  const router = useRouter();

  return (
    <main className="bg-slate-50/60 py-10">
      <div className="mx-auto max-w-4xl px-6 space-y-8">
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
            <span>Join Team</span>
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
        <section className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500 text-2xl text-white">
              👥
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                Join a Team
              </h1>
              <p className="text-xs text-slate-500">
                For:{" "}
                <span className="font-medium">
                  {problem.title}
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Team cards */}
        <section className="space-y-4">
          {TEAMS.map((team) => (
            <article
              key={team.id}
              className="flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition md:flex-row md:items-center"
            >
              <div className="flex-1 space-y-2">
                <h2 className="text-sm font-semibold text-slate-900">
                  {team.name}
                </h2>
                <p className="text-xs text-slate-500">
                  {team.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <span>👥</span>
                    <span>{team.membersCount} members</span>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${team.statusColor}`}
                  >
                    {team.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="text-slate-400">Members:</span>
                  <div className="flex -space-x-2">
                    {team.membersAvatars.map((initials) => (
                      <span
                        key={initials}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white bg-slate-200 text-[11px]"
                      >
                        {initials}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 md:mt-0 md:ml-6">
                <button className="w-full rounded-full bg-sky-500 px-4 py-2 text-xs font-medium text-white hover:bg-sky-600 md:w-32">
                  Apply to Join
                </button>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
