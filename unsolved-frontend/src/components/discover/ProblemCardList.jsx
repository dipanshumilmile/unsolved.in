// src/components/discover/ProblemCardList.jsx
"use client";

import ProblemCard from "./ProblemCard";

export default function ProblemCardList({ problems, view = "grid" }) {
  const layoutClass =
    view === "grid"
      ? "grid grid-cols-1 md:grid-cols-2 gap-4"
      : "space-y-3";

  return (
    <section className={layoutClass}>
      {problems.map((p) => (
        <ProblemCard key={p.id} problem={p} />
      ))}
    </section>
  );
}
