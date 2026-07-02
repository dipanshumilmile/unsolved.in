"use client";

import { useRouter } from "next/navigation";

export default function HeadingOfPage() {
  const router = useRouter();

  return (
    <header className="border-b border-slate-200 bg-slate-50 px-4 py-6">
      <div className="mx-auto flex max-w-4xl flex-col items-start gap-4">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
        >
          <span className="text-lg leading-none">←</span>
          <span>Back</span>
        </button>

        {/* Heading */}
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">
            Report a Problem
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Help your community by reporting issues that need attention.
          </p>
        </div>
      </div>
    </header>
  );
}
