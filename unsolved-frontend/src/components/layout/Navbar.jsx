import { Bell } from "lucide-react";
import { Search } from "lucide-react";
import { UserRound } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-100/80 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-sky-500 text-sm font-bold text-white shadow-sm">
            U
          </div>
          <span className="text-sm font-semibold tracking-tight">
            Unsolved<span className="text-cyan-500">.in</span>
          </span>
        </div>

        {/* Center nav */}
        <nav className="hidden items-center gap-6 text-sm text-slate-800 md:flex">
          <a href="/discover" className="hover:text-slate-900">
            Discover
          </a>
          <a href="report-problem" className="hover:text-slate-900">
            Report Problem
          </a>
          <a href="dashboard" className="hover:text-slate-900">
            Dashboard
          </a>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-6">
          <Link href="/discover">
          <button href="/discover"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-xs text-slate-600 shadow-sm hover:bg-slate-50 md:flex"
            aria-label="Search"
          >
            <Search color="#14191a" />
          </button></Link>

          <button
            className="relative hidden h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-xs text-slate-600 shadow-sm hover:bg-slate-50 md:flex"
            aria-label="Notifications"
          >
            <Bell color="#ffea00" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white">
              2
            </span>
          </button>

         

          <button
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xs text-slate-600 shadow-sm hover:bg-slate-100"
            aria-label="Profile"
          >
            <UserRound />
          </button>
        </div>
      </div>
    </header>
  );
}
