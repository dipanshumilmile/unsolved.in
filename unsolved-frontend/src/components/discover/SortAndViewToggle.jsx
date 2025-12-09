"use client";

export default function SortAndViewToggle({
  sort,
  onSortChange,
  view,
  onViewChange,
}) {
  return (
    <div className="flex items-center gap-3">
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="upvotes">Most upvoted</option>
      </select>

      <div className="inline-flex rounded-full border border-gray-200 bg-white p-0.5">
        <button
          type="button"
          onClick={() => onViewChange("grid")}
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            view === "grid"
              ? "bg-sky-500 text-white"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Grid
        </button>
        <button
          type="button"
          onClick={() => onViewChange("list")}
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            view === "list"
              ? "bg-sky-500 text-white"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          List
        </button>
      </div>
    </div>
  );
}
