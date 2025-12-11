"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const OPTIONS = [
  {
    id: "start-team",
    title: "Start a Team",
    description:
      "Create a new team and invite others to collaborate on solving this problem together.",
    iconBg: "bg-cyan-500",
    iconEmoji: "👥",
  },
  {
    id: "join-team",
    title: "Join Existing Team",
    description:
      "Browse teams already working on this problem and request to join one.",
    iconBg: "bg-sky-500",
    iconEmoji: "➕",
  },
  {
    id: "work-solo",
    title: "Work Solo",
    description:
      "Take on this challenge independently while still sharing updates with the community.",
    iconBg: "bg-violet-500",
    iconEmoji: "✋",
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
            <Link
              href={`/problems/${problem.id}`}
              className="hover:underline"
            >
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
            let href = null;
            if (opt.id === "start-team") {
              href = `/problems/${problem.id}/claim/start-team`;
            } else if (opt.id === "join-team") {
              href = `/problems/${problem.id}/claim/join-team`;
            } else if (opt.id === "work-solo") {
              href = `/problems/${problem.id}/claim/solo`;
            }

            const Wrapper = href ? Link : "button";
            const wrapperProps = href ? { href } : { type: "button" };

            return (
              <Wrapper
                key={opt.id}
                {...wrapperProps}
                className="flex w-full items-center justify-between rounded-3xl border border-slate-100 bg-white px-5 py-4 text-left shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
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
              </Wrapper>
            );
          })}
        </section>
      </div>
    </main>
  );
}
