"use client";

import { useParams } from "next/navigation";
import problemsData from "@/data/problems.js";
import JoinTeamPage from "@/components/problem-claim/JoinTeamPage";

export default function JoinTeamPageWrapper() {
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

  return <JoinTeamPage problem={problem} />;
}
