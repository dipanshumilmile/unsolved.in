
// "use client";
// import problemsData from "@/data/problems";
// import SearchBar from "@/components/discover/SearchBar";
// import FiltersSidebar from "@/components/discover/FiltersSidebar";
// import ProblemCardList from "@/components/discover/ProblemCardList";
// import SortAndViewToggle from "@/components/discover/SortAndViewToggle";
// import { useState } from "react";


// export default function DiscoverPage() {
//   const [query, setQuery] = useState("");
//   const [filters, setFilters] = useState({ status: "Open", severity: null });
//   const [sort, setSort] = useState("newest");
//   const [view, setView] = useState("grid");


//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     // trigger search/filter logic or URL params here
//   };


//   const filteredProblems = problemsData; // apply query + filters + sort


//   return (
//     <main className="px-8 py-6">
//       <header className="mb-6 flex items-center justify-between gap-4">
       
//         <div>
//           <h1 className="text-2xl font-semibold text-gray-900">
//             Discover Problems
//           </h1>
//           <p className="text-sm text-gray-500">
//             Find issues in your community that need solving.
//           </p>
//         </div>
//       </header>


//       <div className="mb-4 flex items-center justify-between gap-4 ">
//         <SearchBar
//           value={query}
//           onChange={setQuery}
//           onSubmit={handleSearchSubmit}
//         />
//        <SortAndViewToggle
//           sort={sort}
//           onSortChange={setSort}
//           view={view}
//           onViewChange={setView}
//         />
//       </div>
     
     


//       <div className="flex gap-6 ">
//         <FiltersSidebar filters={filters} onChange={setFilters} />
//         <div className="flex-1">
//           <p className="mb-3 text-xs text-gray-500">
//             {filteredProblems.length} problems found
//           </p>
//           <ProblemCardList problems={filteredProblems} view={view} />
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";

import { useState } from "react";
import problemsData from "@/data/problems.js";
import SearchBar from "@/components/discover/SearchBar";
import FiltersSidebar from "@/components/discover/FiltersSidebar";
import SortAndViewToggle from "@/components/discover/SortAndViewToggle";
import ProblemCardList from "@/components/discover/ProblemCardList";

export default function DiscoverPage() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "Open",
    severity: null,
  });
  const [sort, setSort] = useState("newest");
  const [view, setView] = useState("grid");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  // FILTERING + SEARCH + SORT
  const filteredProblems = problemsData
    .filter((p) => {
      // status filter (always applied)
      if (filters.status && p.status !== filters.status) return false;

      // severity filter (optional)
      if (filters.severity && p.severity !== filters.severity) return false;

      // search query
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
      // you can later add real date sorting here
      return 0;
    });

  return (
    <main className="bg-slate-50/60 py-10">
      <div className="mx-auto max-w-6xl px-6">
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
          <FiltersSidebar filters={filters} onChange={setFilters} />

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
