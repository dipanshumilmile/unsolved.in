// src/app/discover/page.js
"use client";

import { useState } from "react";
import problemsData from "@/data/problems.js";
import SearchBar from "@/components/discover/SearchBar";
import FiltersSidebar from "@/components/discover/FiltersSidebar";
import SortAndViewToggle from "@/components/discover/SortAndViewToggle";
import ProblemCardList from "@/components/discover/ProblemCardList";
import Link from "next/link";

export default function DiscoverPage() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    statuses: [],
    severities: [],
  });
  const [sort, setSort] = useState("newest");
  const [view, setView] = useState("grid");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const filteredProblems = problemsData
    .filter((p) => {
      const { statuses = [], severities = [] } = filters;

      if (statuses.length > 0 && !statuses.includes(p.status)) return false;
      if (severities.length > 0 && !severities.includes(p.severity)) return false;

      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      if (sort === "upvotes") return b.votes - a.votes;
      return 0;
    });

  return (
    <main className="bg-slate-50/60 py-8">
      <div className="mx-auto max-w-6xl px-6">
        {/* Breadcrumbs */}
        <nav className="mb-4 flex items-center gap-1 text-xs text-slate-500">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>›</span>
          <span className="text-slate-700">Discover</span>
        </nav>

        {/* Heading */}
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-900">
            Discover Problems
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Find issues in your community that need solving.
          </p>
        </header>

        {/* Search + sort row */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <SearchBar
            value={query}
            onChange={setQuery}
            onSubmit={handleSearchSubmit}
          />
          <SortAndViewToggle
            sort={sort}
            onSortChange={setSort}
            view={view}
            onViewChange={setView}
          />
        </div>

        {/* Filters + cards */}
        <div className="flex gap-6">
          <div className="w-64 shrink-0">
            <FiltersSidebar filters={filters} onChange={setFilters} />
          </div>

          <div className="flex-1">
            <p className="mb-3 text-xs text-slate-500">
              {filteredProblems.length} problems found
            </p>
            <ProblemCardList problems={filteredProblems} view={view} />
          </div>
        </div>
      </div>
    </main>
  );
}
