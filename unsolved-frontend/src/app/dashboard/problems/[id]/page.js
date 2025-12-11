// src/app/dashboard/problems/[id]/page.js
"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";

import problemsData from "@/data/problems";
import solutionsData from "@/data/solutionsData";

import ProblemDetailHeader from "@/components/dashboard/ProblemDetailHeader";
import SolutionsSection from "@/components/dashboard/SolutionsSection";

export default function ProblemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id, 10);

  const problem = problemsData.find((p) => p.id === id);
  const solutions = solutionsData.filter((s) => s.problemId === id);

  if (!problem) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto py-6 px-4">
          <button
            onClick={() => router.back()}
            className="mb-3 text-xs text-sky-600"
          >
            ← Back
          </button>
          <div className="rounded-xl bg-white p-6 text-sm text-gray-600 shadow-sm">
            Problem not found.
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-6 px-4 space-y-4">
        <button
          onClick={() => router.back()}
          className="text-xs text-sky-600"
        >
          ← Back to Dashboard
        </button>

        <ProblemDetailHeader problem={problem} />
        <SolutionsSection solutions={solutions} />
      </div>
    </main>
  );
}
