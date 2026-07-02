"use client";

import MyProblemCard from "./MyProblemCard";

export default function MyProblemsList({ problems }) {
  if (problems.length === 0) {
    return (
      <div className="rounded-xl bg-white p-8 text-center text-gray-500">
        You haven't reported any problems yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {problems.map((problem) => (
        <MyProblemCard key={problem.id} problem={problem} />
      ))}
    </div>
  );
}
