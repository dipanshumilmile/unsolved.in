"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

import { api } from "@/lib/api";
import ProjectWorkspacePage from "@/components/project/ProjectWorkspacePage";

function diffInDays(startISO, endISO) {
  const start = new Date(startISO);
  const end = new Date(endISO);

  if (isNaN(start) || isNaN(end)) return null;

  return Math.ceil(
    (end.getTime() - start.getTime()) /
      (1000 * 60 * 60 * 24)
  );
}

export default function ProjectWorkspaceWrapper() {

  const params = useParams();
  const searchParams = useSearchParams();

  const id = Number(params.id);

  const [problem, setProblem] = useState(null);

  useEffect(() => {

    async function loadProblem() {

      try {

        const data = await api.getProblem(id);

        setProblem(data);

      } catch (err) {

        console.error(err);

      }

    }

    loadProblem();

  }, [id]);

  if (!problem) {

    return <div>Loading...</div>;

  }

  const startDate =
    searchParams.get("startDate") || "2024-12-01";

  const targetDate =
    searchParams.get("targetDate") || "2024-12-31";

  const type =
    searchParams.get("type") || "team";

  const daysLeft =
    diffInDays(startDate, targetDate);

  const project = {

    id,

    title:
      (type === "team"
        ? "Team Solution: "
        : "Solo Project: ") + problem.title,

    type,

    startDate,

    targetDate,

    timeLeft:
      daysLeft == null
        ? "-"
        : `${daysLeft} day${daysLeft === 1 ? "" : "s"}`,

  };

  return (
    <ProjectWorkspacePage
      problem={problem}
      project={project}
    />
  );

}