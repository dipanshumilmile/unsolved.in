"use client";

import { useParams, useSearchParams } from "next/navigation";
import problemsData from "@/data/problems.js";
import ProjectWorkspacePage from "@/components/project/ProjectWorkspacePage";

function diffInDays(startISO, endISO) {
  const start = new Date(startISO);
  const end = new Date(endISO);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;
  const ms = end.getTime() - start.getTime();
  const days = Math.ceil(ms / (1000 * 60 * 60 * 24));
  return days;
}

export default function ProjectWorkspaceWrapper() {
  const params = useParams();
  const searchParams = useSearchParams();

  const id = Number(params.id);

  const problem = problemsData.find((p) => p.id === 1) || problemsData[0];

  // dates are coming from Start Team / Work Solo pages (type="date" => ISO yyyy‑mm‑dd)
  const startDateRaw = searchParams.get("startDate");
  const targetDateRaw = searchParams.get("targetDate");

  // fallback (optional pretty strings)
  const startDate = startDateRaw || "2024-12-01";
  const targetDate = targetDateRaw || "2024-12-31";

  const type = searchParams.get("type") || "team";

  const daysLeft = diffInDays(startDate, targetDate);
  const timeLeft =
    daysLeft == null ? "-" : `${daysLeft} day${daysLeft === 1 ? "" : "s"}`;

  const project = {
    id,
    title:
      (type === "team" ? "Team Solution: " : "Solo Project: ") +
      problem.title,
    type,
    startDate,   // ProjectWorkspacePage shows these as text
    targetDate,
    timeLeft,
  };

  return <ProjectWorkspacePage problem={problem} project={project} />;
}
