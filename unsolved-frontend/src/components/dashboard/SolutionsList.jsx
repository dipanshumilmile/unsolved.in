"use client";

import SolutionCard from "./SolutionCard";

export default function SolutionsList({ solutions, onAccept }) {
  if (!solutions.length) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <h2 className="text-lg font-semibold">No Solutions Yet</h2>

        <p className="mt-2 text-gray-500">
          Nobody has submitted a solution for this problem.
        </p>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Submitted Solutions</h2>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
          {solutions.length} Solution{solutions.length > 1 ? "s" : ""}
        </span>
      </div>

      <div className="space-y-5">
        {solutions.map((solution) => (
          <SolutionCard
            key={solution.id}
            solution={solution}
            onAccept={onAccept}
          />
        ))}
      </div>
    </section>
  );
}
