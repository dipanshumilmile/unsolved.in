"use client";

import React, { useEffect, useMemo, useState } from "react";

import problemsDataStatic from "@/data/problems";
import teamsData from "@/data/team";
import { savedProblemIds as savedProblemIdsStatic } from "@/data/savedProblems";

import UserProfileHeader from "@/components/dashboard/UserProfileHeader";
import StatsSection from "@/components/dashboard/StatsSection";
import ProblemFilters from "@/components/dashboard/ProblemFilters";
import ProblemsList from "@/components/dashboard/ProblemsList";
import TeamsList from "@/components/dashboard/TeamsList";
import SidePanel from "@/components/dashboard/SidePanel";

import { getCurrentUser } from "@/lib/fakeAuth";
import { getUserData } from "@/lib/fakeUserData";

// Load problems from localStorage OR fallback to static
function loadProblems() {
  if (typeof window === "undefined") return problemsDataStatic;
  try {
    const raw = localStorage.getItem("problems");
    if (!raw) return problemsDataStatic;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : problemsDataStatic;
  } catch {
    return problemsDataStatic;
  }
}

export default function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState("my-submissions");
  const [user, setUser] = useState(null);
  const [problems, setProblems] = useState(() => loadProblems());

  // sync problems when updated from other tabs (localStorage event)
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "problems") setProblems(loadProblems());
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  // load user + default tab based on role
  useEffect(() => {
    const u = getCurrentUser();
    setUser(u || null);

    if (u) {
      if (u.category === "professional") {
        setActiveFilter("problems-reported");
      } else {
        setActiveFilter("my-submissions");
      }
    }
  }, []);

  // show name OR email OR fallback static
  const currentUserName =
    (user && (user.name || user.email)) || "Priya Sharma";

  // load saved problems for user
  const userMeta =
    getUserData() || {
      savedProblems: savedProblemIdsStatic,
      solvedProblems: [],
      teams: [],
    };

  // THE FIXED LOGIC:
  // Professional = reportedProblems
  // Student = mySubmissions
  const mySubmissions = useMemo(() => {
    return problems.filter((p) => {
      if (!p) return false;
      if (user && p.reporterId && String(p.reporterId) === String(user.id))
        return true;
      if (p.author && String(p.author) === String(currentUserName))
        return true;
      return false;
    });
  }, [problems, user, currentUserName]);

  const savedProblems = useMemo(() => {
    const savedIds = (userMeta.savedProblems || []).map(String);
    return problems.filter((p) => savedIds.includes(String(p.id)));
  }, [problems, userMeta]);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-6 px-4 space-y-6">
        <UserProfileHeader />
        <StatsSection />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN */}
          <section className="lg:col-span-2 space-y-4">
            <ProblemFilters active={activeFilter} onChange={setActiveFilter} />

            {activeFilter === "my-teams" ? (
              <TeamsList teams={teamsData} />
            ) : activeFilter === "my-submissions" ? (
              <ProblemsList problems={mySubmissions} />
            ) : activeFilter === "problems-reported" ? (
              <ProblemsList problems={mySubmissions} /> // Professionals see their reported problems
            ) : (
              <ProblemsList problems={savedProblems} />
            )}
          </section>

          {/* RIGHT COLUMN */}
          <aside className="lg:col-span-1">
            <SidePanel />
          </aside>
        </div>
      </div>
    </main>
  );
}
