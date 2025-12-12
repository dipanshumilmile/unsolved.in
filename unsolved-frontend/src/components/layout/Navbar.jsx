// src/components/Navbar.jsx
"use client";

import { useEffect, useState, useRef } from "react";
import { Bell, Search, UserRound } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getCurrentUser, logout } from "@/lib/fakeAuth";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const current = getCurrentUser();
    setUser(current);
  }, []);

  // close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const isLoggedIn = !!user;

  const handleLogout = () => {
    logout();
    setUser(null);
    setOpen(false);
    router.push("/auth/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-100/80 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-sky-500 text-sm font-bold text-white shadow-sm">
            U
          </div>
          <a href="/" className="text-sm font-semibold tracking-tight">
            Unsolved<span className="text-cyan-500">.in</span>
          </a>
        </div>

        {/* Center nav */}
        <nav className="hidden items-center gap-6 text-sm text-slate-800 md:flex">
          <a href="/discover" className="hover:text-slate-900">
            Discover
          </a>
          <a href="/report-problem" className="hover:text-slate-900">
            Report Problem
          </a>
          <a href="/dashboard" className="hover:text-slate-900">
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
            <Search color="#14191a" width={20}/>
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

          {/* Profile / Auth */}
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              {/* Avatar button */}
              <button
                onClick={() => setOpen((o) => !o)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xs text-slate-600 shadow-sm hover:bg-slate-100 overflow-hidden"
                aria-label="Profile"
              >
                <Image
                  src={user?.photo || "/images/image.png"}
                  alt="Profile"
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover"
              />

              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60 text-sm overflow-hidden">
                  {/* Top: name + email */}
                  <div className="border-b border-slate-100 px-4 py-3">
                    <p className="text-sm font-semibold text-slate-900">
                      {user?.name || "User"}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {user?.email}
                    </p>
                  </div>

                  {/* My Profile */}
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-slate-700 hover:bg-slate-50"
                  >
                    <UserRound className="h-4 w-4" />
                    <span>My Profile</span>
                  </Link>

                  {/* Sign Out */}
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-[13px] font-medium text-rose-600 hover:bg-rose-50"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth/login">
              <button
                className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                aria-label="Login or register"
              >
                Login / Register
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
