"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const OPTIONS = [
  {
    id: "start-team",
    title: "Start a Team",
    description: "Create a new team and invite others to collaborate.",
    iconBg: "bg-cyan-500",
    iconEmoji: "👥",
    disabled: true,
  },
  {
    id: "join-team",
    title: "Join Existing Team",
    description: "Browse existing teams and request to join.",
    iconBg: "bg-sky-500",
    iconEmoji: "➕",
    disabled: true,
  },
  {
    id: "work-solo",
    title: "Work Solo",
    description: "Work independently and submit your solution.",
    iconBg: "bg-violet-500",
    iconEmoji: "✋",
    disabled: false,
  },
];

export default function ClaimProblemPage({ problem }) {
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
            <Link href={`/problems/${problem.id}`} className="hover:underline">
              {problem.title}
            </Link>
            <span>›</span>
            <span>Claim</span>
          </div>
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-800"
          >
            ← Back
          </button>
        </div>

        {/* Heading */}
        <section className="text-center space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            How would you like to solve this?
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            Choose how you want to approach{" "}
            <span className="font-medium">“{problem.title}”</span>.
          </p>
        </section>

        {/* Options list */}
        <section className="space-y-4">
          {OPTIONS.map((opt) => {
            const href =
              opt.id === "work-solo"
                ? `/problems/${problem.id}/claim/solo`
                : null;

            if (opt.disabled) {
              return (
                <div
                  key={opt.id}
                  className="flex w-full cursor-not-allowed items-center justify-between rounded-3xl border border-slate-100 bg-white px-5 py-4 text-left opacity-60 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl text-white ${opt.iconBg}`}
                    >
                      {opt.iconEmoji}
                    </div>

                    <div>
                      <h2 className="text-sm font-semibold text-slate-900">
                        {opt.title}
                      </h2>

                      <p className="mt-1 text-xs text-slate-500">
                        {opt.description}
                      </p>

                      <p className="mt-2 text-[11px] font-medium text-amber-600">
                        🚧 Available in a future update
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-semibold text-amber-700">
                    Coming Soon
                  </span>
                </div>
              );
            }

            return (
              <Link
                key={opt.id}
                href={href}
                className="flex w-full items-center justify-between rounded-3xl border border-slate-100 bg-white px-5 py-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl text-white ${opt.iconBg}`}
                  >
                    {opt.iconEmoji}
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold text-slate-900">
                      {opt.title}
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      {opt.description}
                    </p>
                  </div>
                </div>

                <span className="text-slate-400">›</span>
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
}
