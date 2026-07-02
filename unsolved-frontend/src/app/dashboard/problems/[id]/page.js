"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { api } from "@/lib/api";

import ProblemDetailHeader from "@/components/dashboard/ProblemDetailHeader";
import SolutionsList from "@/components/dashboard/SolutionsList";

export default function ProblemDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [problem, setProblem] = useState(null);
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
      const [problemData, solutionData] = await Promise.all([
        api.getProblem(id),
        api.getSolutions(id),
      ]);

      setProblem(problemData);
      setSolutions(solutionData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [id]);

  async function handleAccept(solutionId) {
    try {
      await api.acceptSolution(solutionId);
      await loadData();
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) {
    return (
      <main className="p-6">
        Loading...
      </main>
    );
  }

  if (!problem) {
    return (
      <main className="p-6">
        Problem not found.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl space-y-6 px-6 py-6">

        <button
          onClick={() => router.back()}
          className="text-sm text-sky-600"
        >
          ← Back
        </button>

        <ProblemDetailHeader problem={problem} />

        <SolutionsList
          solutions={solutions}
          onAccept={handleAccept}
        />

      </div>
    </main>
  );
}