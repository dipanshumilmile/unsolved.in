"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProblemCard from "@/components/discover/ProblemCard";
import { api } from "@/lib/api";

export default function FeaturedProblemsSection() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProblems();
  }, []);

  const fetchFeaturedProblems = async () => {
    try {
      const data = await api.request("/problems");

      // For now show latest 3 problems.
      // Later we can replace this with a dedicated featured endpoint.
      setFeatured(data.slice(0, 3));
    } catch (err) {
      console.error("Failed to load featured problems", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="border-b border-slate-100 bg-slate-50/60">
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-12">
        <div className="flex items-center justify-between">
          <div>
            <span className="inline-flex rounded-full bg-cyan-50 px-3 py-1 text-[11px] font-medium text-cyan-700">
              Featured
            </span>

            <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 md:text-[1.4rem]">
              Problems that need your help
            </h2>
          </div>

          <Link
            href="/discover"
            className="text-sm font-medium text-sky-600 hover:text-sky-700"
          >
            View all →
          </Link>
        </div>

        <div className="mt-6">
          {loading ? (
            <p className="text-sm text-slate-500">
              Loading featured problems...
            </p>
          ) : featured.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white py-10 text-center">
              <p className="text-sm text-slate-500">
                No problems available yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {featured.map((problem) => (
                <ProblemCard key={problem.id} problem={problem} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
