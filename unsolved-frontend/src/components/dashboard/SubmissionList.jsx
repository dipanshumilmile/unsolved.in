"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import SubmissionCard from "@/components/solutions/SubmissionCard";

export default function SubmissionList() {

  const [solutions, setSolutions] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {

    async function loadSolutions() {

      try {

        const data = await api.getMySolutions();

        setSolutions(data);

      } catch (err) {

        setError(err.message);

      } finally {

        setLoading(false);

      }

    }

    loadSolutions();

  }, []);

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-8 text-center">
        Loading solutions...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-white p-8 text-red-600">
        {error}
      </div>
    );
  }

  if (solutions.length === 0) {
    return (
      <div className="rounded-xl bg-white p-8 text-center">
        <h2 className="text-lg font-semibold">
          No solutions submitted yet
        </h2>

        <p className="text-gray-500 mt-2">
          Submit a solution and it will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {solutions.map((solution) => (
        <SubmissionCard
          key={solution.id}
          solution={solution}
        />
      ))}
    </div>
  );
}