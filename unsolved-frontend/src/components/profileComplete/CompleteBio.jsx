"use client";

export default function CompleteBio({ bio, setBio }) {
  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <p className="mb-3 text-sm font-semibold text-slate-800">Short Bio</p>
      <textarea
        rows={3}
        maxLength={200}
        placeholder="Write a short introduction about yourself..."
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
      />
    </section>
  );
}
