"use client";

import { useState, useEffect, useMemo } from "react";
import SearchBar from "@/components/discover/SearchBar";
import FiltersSidebar from "@/components/discover/FiltersSidebar";
import SortAndViewToggle from "@/components/discover/SortAndViewToggle";
import ProblemCardList from "@/components/discover/ProblemCardList";
import Link from "next/link";
import { api } from "@/lib/api";

export default function DiscoverPage() {
  const [query, setQuery] = useState("");

  const [filters, setFilters] = useState({
    statuses: [],
  });

  const [sort, setSort] = useState("newest");

  const [problems, setProblems] = useState([]);

  const fetchProblems = async () => {
    try {
      const data = await api.request("/problems");
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

  const filteredProblems = useMemo(() => {
    return [...problems]
      .filter((p) => {
        const { statuses = [] } = filters;

        if (statuses.length > 0 && !statuses.includes(p.status)) {
          return false;
        }

        if (!query.trim()) {
          return true;
        }

        const q = query.toLowerCase();

        return (
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          `${p.city ?? ""} ${p.state ?? ""}`.toLowerCase().includes(q) ||
          p.tags?.some((tag) => tag.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => {
        switch (sort) {
          case "upvotes":
            return (b.upvoteCount || 0) - (a.upvoteCount || 0);

          default:
            return 0;
        }
      });
  }, [problems, filters, query, sort]);

  return (
    <main className="bg-slate-50/60 py-8">
      <div className="mx-auto max-w-6xl px-6">

        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-1 text-xs text-slate-500">
          <Link href="/" className="hover:underline">
            Home
          </Link>

          <span>›</span>

          <span className="text-slate-700">
            Discover
          </span>
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

        {/* Search + Sort */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <SearchBar
            value={query}
            onChange={setQuery}
            onSubmit={handleSearchSubmit}
          />

          <SortAndViewToggle
            sort={sort}
            onSortChange={setSort}
          />
        </div>

        {/* Sidebar + Content */}
        <div className="flex flex-col gap-6 lg:flex-row">

          <div className="w-full lg:w-64">
            <FiltersSidebar
              filters={filters}
              onChange={setFilters}
            />
          </div>

          <div className="flex-1">

            <p className="mb-4 text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filteredProblems.length}
              </span>{" "}
              problem{filteredProblems.length !== 1 && "s"}
            </p>

            <ProblemCardList
              problems={filteredProblems}
            />

          </div>

        </div>

      </div>
    </main>
  );
}