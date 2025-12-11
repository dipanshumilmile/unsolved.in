"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import problemsData from "@/data/problems.js";
import ProblemHeader from "@/components/problem-detail/ProblemHeader";
import ProblemRightColumn from "@/components/problem-detail/ProblemRightColumn";
import ProblemDescription from "@/components/problem-detail/ProblemDescription";
import ProblemComments from "@/components/problem-detail/ProblemComments";

export default function ProblemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const problem = problemsData.find((p) => p.id === id);

  if (!problem) {
    return (
      <main className="bg-slate-50/60 py-10">
        <div className="mx-auto max-w-5xl px-6">
          <p className="mb-4 text-sm text-slate-600">Problem not found.</p>
          <button
            onClick={() => router.push("/discover")}
            className="rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-600"
          >
            Back to Discover
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-slate-50/60 py-8">
      <div className="mx-auto max-w-6xl px-6 space-y-6">
        {/* Breadcrumbs */}
        <nav className="text-xs text-slate-500 flex items-center gap-1">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>›</span>
          <Link href="/discover" className="hover:underline">
            Problems
          </Link>
          <span>›</span>
          <span className="truncate max-w-xs md:max-w-sm">
            {problem.title}
          </span>
        </nav>

        {/* Header + right column */}
        <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)]">
          <ProblemHeader problem={problem} />
          <ProblemRightColumn problem={problem} />
        </div>

      

        {/* Comments at bottom */}
        <ProblemComments />
      </div>
    </main>
  );
}
