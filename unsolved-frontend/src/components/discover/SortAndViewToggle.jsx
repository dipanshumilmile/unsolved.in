"use client";

export default function SortControl({ sort, onSortChange }) {
  return (
    <select
      value={sort}
      onChange={(e) => onSortChange(e.target.value)}
      className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
    >
      <option value="newest">Newest First</option>
      <option value="oldest">Oldest First</option>
      <option value="upvotes">Most Upvoted</option>
    </select>
  );
}
