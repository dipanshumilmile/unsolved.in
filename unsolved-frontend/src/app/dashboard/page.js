"use client";

import React, { useState } from "react";

import problemsData from "@/data/problems";
import teamsData from "@/data/team";
import { savedProblemIds } from "@/data/savedProblems";

import UserProfileHeader from "@/components/dashboard/UserProfileHeader";
import StatsSection from "@/components/dashboard/StatsSection";
import ProblemFilters from "@/components/dashboard/ProblemFilters";
import ProblemsList from "@/components/dashboard/ProblemsList";
import TeamsList from "@/components/dashboard/TeamsList";
import SidePanel from "@/components/dashboard/SidePanel";

export default function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState("my-submissions");

  // later this will come from auth
  const currentUserName = "Priya Sharma";

  const mySubmissions = problemsData.filter(
    (p) => p.author === currentUserName
  );

  const savedProblems = problemsData.filter((p) =>
    savedProblemIds.includes(p.id)
  );

  const isMyTeams = activeFilter === "my-teams";
  const isMySubmissions = activeFilter === "my-submissions";

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-6 px-4 space-y-6">
        <UserProfileHeader />
        <StatsSection />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: filters + main content */}
          <section className="lg:col-span-2 space-y-4">
            <ProblemFilters
              active={activeFilter}
              onChange={setActiveFilter}
            />

            {isMyTeams ? (
              <TeamsList teams={teamsData} />
            ) : (
              <ProblemsList
                problems={isMySubmissions ? mySubmissions : savedProblems}
              />
            )}
          </section>

          {/* RIGHT: notifications + impact */}
          <aside className="lg:col-span-1">
            <SidePanel />
          </aside>
        </div>
      </div>
    </main>
  );
}
