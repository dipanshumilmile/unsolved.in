// src/components/discover/ProblemCard.jsx
"use client";

import { useState } from "react";
import { Bookmark, Share2 } from "lucide-react";

function Pill({ label, color = "gray" }) {
  const colorMap = {
    gray: "bg-gray-100 text-gray-700",
    green: "bg-emerald-50 text-emerald-700",
    yellow: "bg-amber-50 text-amber-700",
    red: "bg-rose-50 text-rose-700",
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
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const [voteCount, setVoteCount] = useState(problem.votes);
  const [copied, setCopied] = useState(false);

  const handleToggleLike = () => {
    setLiked((prev) => !prev);
    setVoteCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleShare = async () => {
    try {
      const url =
        typeof window !== "undefined"
          ? `${window.location.origin}/discover?problem=${problem.id}`
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
      // ignore errors (user cancelled share, etc.)
    }
  };

  return (
    <article className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">
      <header className="mb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <Pill label={problem.status} color="green" />
          <Pill label={problem.severity} color={severityColor} />
        </div>
        <span className="text-xs text-gray-400">{problem.timeAgo}</span>
      </header>

      <div className="mb-3">
        <h3 className="mb-1 text-sm font-semibold text-sky-700">
          {problem.title}
        </h3>
        <p className="text-xs text-gray-600 line-clamp-2">
          {problem.description}
        </p>
      </div>

      <div className="mb-3 flex items-center gap-1 text-xs text-gray-500">
        <span className="text-lg">📍</span>
        <span>{problem.location}</span>
      </div>

      <div className="mb-3 flex flex-wrap gap-1">
        {problem.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-700"
          >
            {tag}
          </span>
        ))}
      </div>

      <footer className="mt-auto flex items-center justify-between border-t border-gray-50 pt-3">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          {/* Upvote */}
          <button
            type="button"
            onClick={handleToggleLike}
            className={`flex items-center gap-1 rounded-full px-2 py-0.5 transition-colors ${
              liked ? "bg-sky-50 text-sky-600" : "hover:bg-slate-50"
            }`}
          >
            <span className={liked ? "text-sky-600" : "text-slate-500"}>⬆</span>
            <span>{voteCount}</span>
          </button>

          <span>💬 {problem.comments}</span>

          {/* Save */}
          <button
            type="button"
            onClick={() => setSaved((prev) => !prev)}
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

          {/* Share */}
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-sky-600 transition-colors"
          >
            <Share2 size={14} />
            <span className="hidden sm:inline">
              {copied ? "Copied!" : "Share"}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-[10px]">
            {problem.authorInitials}
          </span>
          <span>{problem.author}</span>
        </div>
      </footer>
    </article>
  );
}
