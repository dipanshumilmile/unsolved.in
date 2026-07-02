"use client";

import { Bell, TrendingUp } from "lucide-react";

function ComingSoonCard({ icon, title, description }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm opacity-80">
      <div className="flex items-center gap-2">
        {icon}

        <h3 className="font-semibold text-slate-800">{title}</h3>
      </div>

      <p className="mt-3 text-sm text-gray-500">{description}</p>

      <span className="mt-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
        Coming Soon
      </span>
    </div>
  );
}

export default function SidePanel() {
  return (
    <div className="flex flex-col gap-5">
      <ComingSoonCard
        icon={<Bell size={18} />}
        title="Notifications"
        description="Stay updated with comments, accepted solutions and activity related to your problems."
      />

      <ComingSoonCard
        icon={<TrendingUp size={18} />}
        title="Your Impact"
        description="Track your contributions, accepted solutions and community engagement."
      />
    </div>
  );
}
