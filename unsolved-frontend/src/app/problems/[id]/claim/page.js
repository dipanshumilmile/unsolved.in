"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import ClaimProblemPage from "@/components/problem-claim/ClaimProblemPage";
import { api } from "@/lib/api";

export default function ClaimPageWrapper() {
  const { id } = useParams();

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProblem() {
      try {
        const data = await api.getProblem(id);
        setProblem(data);
      } catch (err) {
        console.error("Failed to load problem:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProblem();
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 text-sm text-slate-500">
        Loading problem...
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="p-8 text-sm text-slate-600">
        Problem not found.
      </div>
    );
  }

  return <ClaimProblemPage problem={problem} />;
}