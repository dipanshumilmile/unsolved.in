// src/components/discover/SearchBar.jsx

"use client";
import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex-1 max-w-xl flex items-center gap-2"
    >
      <div className="relative w-full">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
          <Search color="#14191a" width={20}/>
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by title, description, or tags..."
          className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm text-gray-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
      </div>
      <button
        type="submit"
        className="rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-600"
      >
        Search
      </button>
    </form>
  );
}
