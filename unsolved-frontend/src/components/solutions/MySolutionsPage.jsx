"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import SubmissionCard from "./SubmissionCard";

export default function MySolutionsPage() {

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
      <div className="max-w-6xl mx-auto py-8">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto py-8 text-red-600">
        {error}
      </div>
    );
  }

  return (

    <main className="min-h-screen bg-gray-50">

      <div className="max-w-6xl mx-auto py-6 px-4">

        <h1 className="text-3xl font-bold mb-6">
          My Submitted Solutions
        </h1>

        {solutions.length === 0 ? (

          <div className="rounded-xl bg-white p-8 text-center shadow-sm">

            <h2 className="text-xl font-semibold">

              No solutions submitted yet

            </h2>

            <p className="mt-2 text-gray-500">

              Once you submit a solution, it will appear here.

            </p>

          </div>

        ) : (

          <div className="space-y-5">

            {solutions.map((solution) => (

              <SubmissionCard
                key={solution.id}
                solution={solution}
              />

            ))}

          </div>

        )}

      </div>

    </main>

  );

}