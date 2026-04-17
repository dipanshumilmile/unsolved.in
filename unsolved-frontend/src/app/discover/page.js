"use client";

import { useState, useEffect } from "react";
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

  // 🔥 NEW: backend data
  const [problems, setProblems] = useState([]);

  // 🔥 FETCH PROBLEMS FROM BACKEND
  const fetchProblems = async () => {
    try {
      const res = await fetch("http://localhost:8080/problems");
      const data = await res.json();
      setProblems(data);
    } catch (err) {
      console.error("Error fetching problems:", err);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  // 🔥 FILTER + SEARCH + SORT
  const filteredProblems = problems
    .filter((p) => {
      const { statuses = [], severities = [] } = filters;

      if (statuses.length > 0 && !statuses.includes(p.status)) return false;

      // (you don’t have severity in backend yet — safe to ignore)
      if (severities.length > 0) return true;

      if (!query.trim()) return true;

      const q = query.toLowerCase();

      return (
        p.title?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        `${p.city}, ${p.state}`.toLowerCase().includes(q) ||
        p.tags?.some((tag) => tag.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      if (sort === "upvotes") return (b.upvoteCount || 0) - (a.upvoteCount || 0);
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

        {/* Search + sort */}
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

            <ProblemCardList
              problems={filteredProblems}
              view={view}
            />
          </div>
        </div>
      </div>
    </main>
  );
}