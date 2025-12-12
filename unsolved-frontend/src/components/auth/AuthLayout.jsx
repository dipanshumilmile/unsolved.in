// src/components/auth/AuthLayout.jsx
import React from "react";

export default function AuthLayout({ children }) {
  return (
    <main className="min-h-screen w-full flex bg-white">
      {/* Left gradient panel */}
      <section className="hidden md:flex w-1/2 flex-col justify-between bg-gradient-to-br from-cyan-400 to-sky-500 px-16 py-10 text-white">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 mb-16">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm font-bold shadow-sm">
              U
            </div>
            <span className="text-sm font-semibold">
              Unsolved<span className="text-white/80">.in</span>
            </span>
          </div>

          {/* Heading + text */}
          <h1 className="text-4xl font-semibold leading-tight mb-4 max-w-md">
            Join the community solving
            <br />
            real-world problems
          </h1>
          <p className="text-lg text-white/85 max-w-sm">
            Report issues, form teams, and build solutions that make a
            difference in your community.
          </p>
        </div>

        <p className="text-[11px] text-white/70">
          © 2024 Unsolved.in • Privacy • Terms
        </p>
      </section>

      {/* Right side (login / signup form) */}
      <section className="flex w-full md:w-1/2 items-center justify-center bg-white">
        <div className="w-full max-w-md px-6 md:px-10">{children}</div>
      </section>
    </main>
  );
}
