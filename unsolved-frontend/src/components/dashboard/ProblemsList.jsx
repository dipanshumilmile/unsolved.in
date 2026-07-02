// src/components/dashboard/(components)/ProblemsList.jsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ProblemCard from "@/components/discover/ProblemCard";
import EmptyState from "@/components/shared/EmptyState";

export default function ProblemsList({ problems }) {


  if (!problems || problems.length === 0) {
    return <EmptyState message="No problems found for this filter." />;
  }

  return (
    <div className="grid gap-4">
      {problems.map((p) => (
        <ProblemCard
          key={p.id}
          problem={p}
          
        />
      ))}
    </div>
  );
}
