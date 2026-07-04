"use client";

import { useEffect, useState } from "react";

import UserProfileHeader from "@/components/dashboard/UserProfileHeader";
import StatsSection from "@/components/dashboard/StatsSection";
import ProblemFilters from "@/components/dashboard/ProblemFilters";
import ProblemsList from "@/components/dashboard/ProblemsList";
import TeamsList from "@/components/dashboard/TeamsList";
import SidePanel from "@/components/dashboard/SidePanel";
import SubmissionList from "@/components/dashboard/SubmissionList";
import { useRouter } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import { api } from "@/lib/api";
import MyProblemsList from "@/components/dashboard/MyProblemsList";``

export default function DashboardPage() {

  const [user, setUser] = useState(null);

  const [activeFilter, setActiveFilter] =
    useState("my-problems");

  const [myProblems, setMyProblems] = useState([]);
  const [savedProblems, setSavedProblems] = useState([]);

  useEffect(() => {
  async function loadDashboard() {
    try {
      const currentUser = await getCurrentUser();

      // 🔒 Redirect if not logged in
      if (!currentUser) {
        router.push("/auth/login");
        return;
      }

      setUser(currentUser);

      setActiveFilter("my-problems");

      const problems = await api.getMyProblems();
      setMyProblems(problems);

      const saved = await api.getSavedProblems();
      setSavedProblems(saved);

    } catch (err) {
      console.error(err);

      // JWT expired or invalid
      router.push("/auth/login");
    }
  }

  loadDashboard();
  }, []);
  
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-50">

      <div className="max-w-6xl mx-auto py-6 px-4 space-y-6">

        <UserProfileHeader />

        <StatsSection />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <section className="lg:col-span-2 space-y-4">

            <ProblemFilters
              active={activeFilter}
              onChange={setActiveFilter}
            />

            {activeFilter === "my-problems" ? (

              <MyProblemsList
    problems={myProblems}
/>

            ) : activeFilter === "my-submissions" ? (

              <SubmissionList />

            ) : activeFilter === "saved" ? (

              <ProblemsList
                problems={savedProblems}
              />

            ) : (

              <TeamsList teams={[]} />

            )}

          </section>

          <aside className="lg:col-span-1">

            <SidePanel />

          </aside>

        </div>

      </div>

    </main>
  );
}