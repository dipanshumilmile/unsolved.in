
"use client";

import ProblemCard from "./ProblemCard";

export default function ProblemCardList({ problems }) {
  if (!problems.length) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-sm">
        <div className="text-5xl mb-4">📭</div>

        <h3 className="text-lg font-semibold text-gray-800">
          No problems found
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {problems.map((problem) => (
        <ProblemCard key={problem.id} problem={problem} />
      ))}
    </section>
  );
}
