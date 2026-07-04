"use client";

import { useEffect, useState } from "react";

import StatsCard from "./StatsCard";

import NotepadTextIcon from "@/components/icons/NotepadTextIcon";
import UsersIcon from "../icons/UsersIcon";
import BookmarkIcon from "../icons/BookmarkIcon";
import Tickmark from "../icons/Tickmark";

import { api } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";

export default function StatsSection() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const currentUser = await getCurrentUser();

        // 🔒 Don't call protected API if user isn't logged in
        if (!currentUser) {
          return;
        }

        setUser(currentUser);

        const dashboardStats = await api.getDashboardStats();
        setStats(dashboardStats);
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      }
    }

    loadDashboard();
  }, []);

  if (!stats || !user) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4">
      {/* Common */}
      <StatsCard
        title="Problems Reported"
        value={String(stats.reportedProblems)}
        icon={NotepadTextIcon}
      />

      {user.role === "STUDENT" ? (
        <>
          <StatsCard
            title="Solutions Submitted"
            value={String(stats.submittedSolutions)}
            icon={Tickmark}
          />

          <StatsCard
            title="Saved Problems"
            value={String(stats.savedProblems)}
            icon={BookmarkIcon}
          />

          <div className="opacity-60">
            <StatsCard title="Teams Joined" value="0" icon={UsersIcon} />

            <p className="mt-2 text-center text-xs text-slate-400">
              Coming Soon
            </p>
          </div>
        </>
      ) : (
        <>
          <StatsCard
            title="Saved Problems"
            value={String(stats.savedProblems)}
            icon={BookmarkIcon}
          />

          <StatsCard
            title="Accepted Solutions"
            value={String(stats.acceptedSolutions)}
            icon={Tickmark}
          />

          <StatsCard
            title="Pending Problems"
            value={String(stats.pendingProblems)}
            icon={UsersIcon}
          />
        </>
      )}
    </div>
  );
}
