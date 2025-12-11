"use client";

import { useParams } from "next/navigation";
import problemsData from "@/data/problems.js";
import ClaimProblemPage from "@/components/problem-claim/ClaimProblemPage";

export default function ClaimPageWrapper() {
  const params = useParams();
  const id = Number(params.id);
  const problem = problemsData.find((p) => p.id === id);

  if (!problem) {
    return (
      <div className="p-8 text-sm text-slate-600">
        Problem not found.
      </div>
    );
  }

  return <ClaimProblemPage problem={problem} />;
}
