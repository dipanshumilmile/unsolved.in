"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SoloPage({ problem }) {
  const router = useRouter();

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
            <span>Solo</span>
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
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500 text-2xl text-white">
              🙋
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                Work Solo
              </h1>
              <p className="text-xs text-slate-500">
                For:{" "}
                <span className="font-medium">{problem.title}</span>
              </p>
            </div>
          </div>

          {/* Info banner */}
          <div className="mb-6 rounded-2xl bg-amber-50 px-4 py-3 text-xs text-amber-800">
            <span className="font-semibold">Going solo?</span> That&apos;s
            brave! You&apos;ll have full control over your solution, but
            remember you can always convert to a team later if you need help.
          </div>

          <form className="space-y-6">
            {/* Project Name */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-800">
                Project Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Drain Flow Monitor, Smart Alert System"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
              <p className="mt-1 text-[11px] text-slate-400">
                0/50 characters
              </p>
            </div>

            {/* Your Approach */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-800">
                Your Approach (Optional)
              </label>
              <textarea
                rows={4}
                placeholder="Briefly describe how you plan to tackle this problem..."
                className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
              <p className="mt-1 text-[11px] text-slate-400">
                0/500 characters
              </p>
            </div>

            {/* Confirmation */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-xs text-slate-700">
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="mt-0.5 h-3.5 w-3.5 text-sky-500 focus:ring-sky-500"
                />
                <span>
                  <span className="font-medium">
                    I understand I&apos;m working independently
                  </span>
                  <br />
                  <span className="text-slate-500">
                    You can always invite team members later or convert to a
                    team project.
                  </span>
                </span>
              </label>
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
                className="w-full rounded-full bg-sky-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-sky-600 sm:w-40"
              >
                Start Project
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
