"use client";

import Link from "next/link";
import { useState } from "react";
import { Bookmark, Share2 } from "lucide-react";
import { api } from "@/lib/api";

function Pill({ label, color = "gray" }) {
  const colorMap = {
    gray: "bg-gray-100 text-gray-700",
    blue: "bg-sky-100 text-sky-700",
    green: "bg-emerald-100 text-emerald-700",
    yellow: "bg-amber-100 text-amber-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorMap[color]}`}
    >
      {label}
    </span>
  );
}

export default function ProblemCard({ problem }) {
  const [saved, setSaved] = useState(problem.saved ?? false);
  const [liked, setLiked] = useState(problem.upvoted ?? false);
  const [voteCount, setVoteCount] = useState(problem.upvoteCount ?? 0);

  const [copied, setCopied] = useState(false);

  // -------------------------
  // UPVOTE
  // -------------------------
  const handleToggleLike = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `http://localhost:8080/problems/${problem.id}/upvote`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed");

      setLiked((prevLiked) => {
        const next = !prevLiked;

        setVoteCount((count) => (next ? count + 1 : Math.max(count - 1, 0)));

        return next;
      });
    } catch (err) {
      console.error("Upvote failed", err);
    }
  };

  // -------------------------
  // SAVE
  // -------------------------
  const handleToggleSave = async () => {
    try {
      if (saved) {
        await api.unsaveProblem(problem.id);
      } else {
        await api.saveProblem(problem.id);
      }

      setSaved((prev) => !prev);
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  // -------------------------
  // SHARE
  // -------------------------
  const handleShare = async () => {
    try {
      const url =
        typeof window !== "undefined"
          ? `${window.location.origin}/problems/${problem.id}`
          : "";

      if (navigator.share) {
        await navigator.share({
          title: problem.title,
          text: problem.description,
          url,
        });
      } else if (navigator.clipboard && url) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
    } catch {
      // ignore
    }
  };
  const STATUS_CONFIG = {
    OPEN: {
      label: "Open",
      color: "blue",
    },
    IN_PROGRESS: {
      label: "In Progress",
      color: "yellow",
    },
    SOLVED: {
      label: "Solved",
      color: "green",
    },
  };

  const status = STATUS_CONFIG[problem.status] ?? {
    label: problem.status,
    color: "gray",
  };

  return (
    <Link href={`/problems/${problem.id}`} className="block">
      <article className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer">
        {/* HEADER */}
        <header className="mb-3 flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <Pill label={status.label} color={status.color} />
          </div>

          <span className="text-xs text-gray-400">
            {problem.createdAt
              ? new Date(problem.createdAt).toLocaleDateString()
              : ""}
          </span>
        </header>

        {/* TITLE */}
        <div className="mb-3">
          <h3 className="mb-1 text-sm font-semibold text-sky-700">
            {problem.title}
          </h3>

          <p className="text-xs text-gray-600 line-clamp-2">
            {problem.description}
          </p>
        </div>

        {/* LOCATION */}
        <div className="mb-3 flex items-center gap-1 text-xs text-gray-500">
          <span className="text-lg">📍</span>

          <span>
            {problem.city && problem.state
              ? `${problem.city}, ${problem.state}`
              : "Location unavailable"}
          </span>
        </div>

        {/* TAGS */}
        <div className="mb-3 flex flex-wrap gap-1">
          {problem.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* FOOTER */}
        <footer className="mt-auto flex items-center justify-between border-t border-gray-50 pt-3">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            {/* UPVOTE */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleToggleLike();
              }}
              className={`flex items-center gap-1 rounded-full px-2 py-0.5 transition-colors ${
                liked ? "bg-sky-50 text-sky-600" : "hover:bg-slate-50"
              }`}
            >
              <span className={liked ? "text-sky-600" : "text-slate-500"}>
                ⬆
              </span>

              <span>{voteCount}</span>
            </button>

            {/* SAVE */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleToggleSave();
              }}
              className={`ml-2 flex items-center gap-1 text-xs transition-colors ${
                saved ? "text-amber-500" : "text-gray-400 hover:text-amber-500"
              }`}
            >
              <Bookmark
                size={14}
                className={saved ? "fill-amber-500 text-amber-500" : ""}
              />

              <span className="hidden sm:inline">
                {saved ? "Saved" : "Save"}
              </span>
            </button>

            {/* SHARE */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleShare();
              }}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-sky-600 transition-colors"
            >
              <Share2 size={14} />

              <span className="hidden sm:inline">
                {copied ? "Copied!" : "Share"}
              </span>
            </button>
          </div>

          {/* AUTHOR */}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-[10px]">
              {problem.createdByName
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase() || "U"}
            </span>

            <span>{problem.createdByName}</span>
          </div>
        </footer>
      </article>
    </Link>
  );
}