"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

import ProblemHeader from "@/components/problem-detail/ProblemHeader";
import ProblemRightColumn from "@/components/problem-detail/ProblemRightColumn";
import ProblemDescription from "@/components/problem-detail/ProblemDescription";
import ProblemComments from "@/components/problem-detail/ProblemComments";

import { api } from "@/lib/api";

export default function ProblemDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProblem() {
      try {
        const data = await api.getProblem(id);
        setProblem(data);
      } catch (err) {
        console.error("Failed to load problem:", err);
        setProblem(null);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadProblem();
    }
  }, [id]);

  // Loading
  if (loading) {
    return (
      <main className="py-10 text-center text-sm text-slate-500">
        Loading problem...
      </main>
    );
  }

  // Not found
  if (!problem) {
    return (
      <main className="bg-slate-50/60 py-10">
        <div className="mx-auto max-w-5xl px-6">
          <p className="mb-4 text-sm text-slate-600">
            Problem not found.
          </p>

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
      <div className="mx-auto max-w-6xl space-y-6 px-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1 text-xs text-slate-500">
          <Link href="/" className="hover:underline">
            Home
          </Link>

          <span>›</span>

          <Link href="/discover" className="hover:underline">
            Problems
          </Link>

          <span>›</span>

          <span className="max-w-xs truncate md:max-w-sm">
            {problem.title}
          </span>
        </nav>

        {/* Header */}
        <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)]">
          <ProblemHeader problem={problem} />
          <ProblemRightColumn problem={problem} />
        </div>

        {/* Description */}
        <ProblemDescription problem={problem} />

        {/* Comments */}
        <ProblemComments problemId={problem.id} />
      </div>
    </main>
  );
}