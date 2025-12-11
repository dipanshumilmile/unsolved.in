// src/components/dashboard/TeamsList.jsx
"use client";

import React from "react";
import TeamCard from "./TeamCard";
import EmptyState from "@/components/shared/EmptyState";

export default function TeamsList({ teams }) {
  if (!teams || teams.length === 0) {
    return <EmptyState message="You haven't joined or created any teams yet." />;
  }

  return (
    <div className="flex flex-col gap-3">
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} />
      ))}
    </div>
  );
}
