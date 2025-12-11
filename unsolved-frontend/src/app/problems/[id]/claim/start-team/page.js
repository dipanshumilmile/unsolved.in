"use client";

import { useParams } from "next/navigation";
import problemsData from "@/data/problems.js";
import StartTeamPage from "@/components/problem-claim/StartTeamPage";

export default function StartTeamPageWrapper() {
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

  return <StartTeamPage problem={problem} />;
}
