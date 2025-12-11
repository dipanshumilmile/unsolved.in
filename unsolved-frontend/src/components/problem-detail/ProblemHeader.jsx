"use client";

import { useState } from "react";
import { Bookmark, Share2 } from "lucide-react";
import ProblemDescription from "./ProblemDescription";

export default function ProblemHeader({ problem }) {
  const [liked, setLiked] = useState(false);
  const [votes, setVotes] = useState(problem.votes);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleToggleLike = () => {
    setLiked((prev) => !prev);
    setVotes((prev) => (liked ? prev - 1 : prev + 1));
  };

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
    } catch {}
  };

  return (
    <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      {/* Title */}
      <h1 className="mb-3 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
        {problem.title}
      </h1>

      {/* Meta row */}
      <div className="mb-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-[11px]">
            {problem.authorInitials}
          </span>
          <span className="font-medium text-slate-800">
            {problem.author}
          </span>
        </div>
        <span>• {problem.timeAgo}</span>
        <div className="flex items-center gap-1">
          <span>📍</span>
          <span>{problem.location}</span>
        </div>
      </div>

      {/* Actions + tags together (removes big white gap) */}
      <div className="space-y-2">
        {/* Actions */}
        <div className="flex flex-wrap gap-3 text-xs">
          <button
            type="button"
            onClick={handleToggleLike}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 transition-colors ${
              liked
                ? "bg-slate-900 text-white"
                : "bg-slate-900 text-white hover:bg-slate-800"
            }`}
          >
            <span>⬆</span>
            <span>{votes}</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-700 hover:bg-slate-50"
          >
            <Share2 size={14} />
            <span>{copied ? "Copied!" : "Share"}</span>
          </button>

          <button
            type="button"
            onClick={() => setSaved((prev) => !prev)}
            className={`inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 transition-colors ${
              saved
                ? "bg-amber-50 text-amber-600 border-amber-200"
                : "bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Bookmark
              size={14}
              className={saved ? "fill-amber-500 text-amber-500" : ""}
            />
            <span>{saved ? "Saved" : "Save"}</span>
          </button>
        </div>

        {/* Tags directly below buttons */}
        <div className="flex flex-wrap gap-2 text-xs gap-y-8">
          <span className="rounded-full bg-emerald-50 px-3 py-0.5 font-medium text-emerald-700">
            {problem.status.toLowerCase()}
          </span>
          <span className="rounded-full bg-rose-50 px-3 py-0.5 font-medium text-rose-700">
            {problem.severity.toLowerCase()}
          </span>
          {problem.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-3 py-0.5 text-slate-700"
            >
              {tag}
            </span>
          ))}
          <ProblemDescription problem={problem}/>
        </div>
      </div>
    </section>
  );
}
