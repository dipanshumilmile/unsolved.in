"use client";

export default function ProblemComments() {
  return (
    <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold text-slate-900">
        Comments (0)
      </h2>

      <div className="mb-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-3">
        <textarea
          rows={3}
          placeholder="Share your thoughts or insights..."
          className="w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-800 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
      </div>

      <button className="rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-600">
        Post Comment
      </button>

      <p className="mt-6 text-center text-xs text-slate-400">
        No comments yet. Be the first to share your thoughts!
      </p>
    </section>
  );
}
