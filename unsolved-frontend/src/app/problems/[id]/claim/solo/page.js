"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import SoloPage from "@/components/problem-claim/SoloPage";
import { api } from "@/lib/api";

export default function SoloPageWrapper() {
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
        setProblem(null);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadProblem();
    }
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

  return <SoloPage problem={problem} />;
}