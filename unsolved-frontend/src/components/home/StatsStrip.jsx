"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function StatsStrip() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await api.getPlatformStats();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch platform stats", error);
    }
  };

  if (!stats) {
    return (
      <section className="mt-10 border-t border-slate-100 pt-6 text-center text-sm text-slate-500">
        Loading statistics...
      </section>
    );
  }

  return (
    <section className="mt-10 grid gap-6 border-t border-slate-100/70 pt-6 text-center md:grid-cols-4">
      <StatCard value={stats.totalProblems} label="Problems Reported" />

      <div className="opacity-60">
        <StatCard value={stats.activeTeams} label="Active Teams" />

        <p className="mt-1 text-[10px] text-slate-400">Coming Soon</p>
      </div>

      <StatCard value={stats.totalSolutions} label="Solutions Submitted" />

      <StatCard value={stats.totalUsers} label="Community Members" />
    </section>
  );
}

function StatCard({ value, label }) {
  return (
    <div>
      <div className="text-xl font-bold text-slate-900 md:text-2xl">
        {value}
      </div>

      <div className="mt-1 text-xs text-slate-500">{label}</div>
    </div>
  );
}
