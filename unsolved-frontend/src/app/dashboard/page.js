// src/app/dashboard/page.ts
'use client'
import React from "react";
import UserProfileHeader from "@/components/dashboard/UserProfileHeader";
import StatsSection from "@/components/dashboard/StatsSection";
import ProblemFilters from "@/components/dashboard/ProblemFilters";
import SidePanel from "@/components/dashboard/SidePanel";

const Page = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-6 px-4 space-y-6">

        {/* Profile header with name, description, report button, settings */}
        <UserProfileHeader />

        {/* Stats cards (Problems Reported, Teams Joined, etc.) */}
        <StatsSection />

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left: filters + problems list */}
          <section className="lg:col-span-2 space-y-4">
            <ProblemFilters />

            {/* Problems list goes here */}
            {/* TODO: replace with your ProblemList component */}
            <div className="bg-white rounded-xl shadow-sm p-4 text-sm text-gray-500">
              {/* Placeholder: Problem cards list */}
              {/* Map your problem data into cards here */}
              Problems list will be rendered here.
            </div>
          </section>

          {/* Right: notifications + impact */}
          <aside className="lg:col-span-1">
            <SidePanel />
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Page;
