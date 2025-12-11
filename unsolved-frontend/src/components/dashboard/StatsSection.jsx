// src/components/StatsSection.jsx
"use client";

import React, { useMemo } from "react";
import StatsCard from "./StatsCard";
import NotepadTextIcon from "@/components/icons/NotepadTextIcon";
import UsersIcon from "../icons/UsersIcon";
import BookmarkIcon from "../icons/BookmarkIcon";
import Tickmark from "../icons/Tickmark";
import problemsDataStatic from "@/data/problems";
import { getCurrentUser } from "@/lib/fakeAuth";
import { getUserData } from "@/lib/fakeUserData";

/**
 * StatsSection - dynamic:
 * - Problems Reported: count of problems where reporterId === user.id OR author matches
 * - Teams Joined: user.teams length (or 0)
 * - Saved Problems: userMeta.savedProblems length
 * - Solutions Submitted: userMeta.solvedProblems length
 *
 * It reads 'problems' from localStorage if present (so your report-problem flow will be picked up).
 * Falls back to static problems list if localStorage not present.
 */

function loadProblems() {
  if (typeof window === "undefined") return problemsDataStatic;
  try {
    const raw = localStorage.getItem("problems");
    if (!raw) return problemsDataStatic;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : problemsDataStatic;
  } catch (err) {
    console.warn("Failed to parse local problems:", err);
    return problemsDataStatic;
  }
}

export default function StatsSection() {
  const user = getCurrentUser();
  const userMeta = getUserData() || { savedProblems: [], solvedProblems: [], teams: [] };

  const problems = useMemo(() => loadProblems(), []);

  // reported: match reporterId or author fallback
  const reportedCount = useMemo(() => {
    if (!user) return 0;
    const uid = String(user.id);
    const uname = (user.name || "").toLowerCase();
    return problems.filter((p) => {
      if (!p) return false;
      // prefer reporterId
      if (p.reporterId && String(p.reporterId) === uid) return true;
      // fallback: author string
      if (p.author && String(p.author).toLowerCase() === uname) return true;
      // fallback: reportedBy
      if (p.reportedBy && String(p.reportedBy) === uid) return true;
      return false;
    }).length;
  }, [problems, user]);

  const teamsCount = (userMeta && Array.isArray(userMeta.teams)) ? userMeta.teams.length : 0;
  const savedCount = (userMeta && Array.isArray(userMeta.savedProblems)) ? userMeta.savedProblems.length : 0;
  const solvedCount = (userMeta && Array.isArray(userMeta.solvedProblems)) ? userMeta.solvedProblems.length : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4">
      <StatsCard title="Problems Reported" value={String(reportedCount)} icon={NotepadTextIcon} />
      <StatsCard title="Teams Joined" value={String(teamsCount)} icon={UsersIcon} />
      <StatsCard title="Saved Problems" value={String(savedCount)} icon={BookmarkIcon} />
      <StatsCard title="Solutions Submitted" value={String(solvedCount)} icon={Tickmark} />
    </div>
  );
}
