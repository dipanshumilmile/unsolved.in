"use client";

import { useRouter } from "next/navigation";
import StatsStrip from "./StatsStrip";



export default function HeroSection() {
  const router = useRouter();
  return (
    <section
      id="hero"
      className="border-b border-slate-100/70 bg-gradient-to-b from-transparent via-white/60 to-white"
    >
      <div className="mx-auto max-w-5xl px-4 pb-12 pt-10 md:px-6 md:pb-16 md:pt-12">
        {/* Badge */}
        <div className="flex justify-center">
          <button className="rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 px-4 py-1 text-xs font-medium text-white shadow shadow-indigo-400/40">
            Join the Community
          </button>
        </div>

        {/* Heading */}
        <div className="mt-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-[2.9rem]">
            Real problems.{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-sky-500 bg-clip-text text-transparent">
              Real solutions.
            </span>
            <br />
            <div className="mt-3">Built by your community.</div>
          </h1>
          <p className="mx-auto mt-10 mb-20 max-w-2xl text-sm text-slate-600 md:text-[0.93rem]">
            Report issues in your neighborhood. Students and volunteers team up
            to build solutions. Together, we solve what&apos;s unsolved.
          </p>
        </div>

        

        {/* Primary CTAs */}
        <div className="flex flex-wrap justify-center gap-x-20 mt-10 mb-20 scale-150">
          <button
            onClick={() => router.push("/report")}
            className="rounded-full bg-cyan-500 px-5 py-2 text-xs font-semibold text-white shadow-md shadow-cyan-400/40 hover:bg-cyan-600"
          >
            Report a Problem →
          </button>
          <button
            onClick={() => router.push("/discover")}
            className="rounded-full border border-cyan-200 bg-white px-5 py-2 text-xs font-semibold text-cyan-700 hover:bg-cyan-50"
          >
            Browse Problems
          </button>
        </div>

        {/* Stats */}
        <div className="scale-125">
          <StatsStrip />
        </div>
      </div>
    </section>
  );
}
