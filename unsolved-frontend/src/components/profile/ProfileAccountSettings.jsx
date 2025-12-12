"use client";

import { Mail, Lock } from "lucide-react";

export default function ProfileAccountSettings({ user }) {
  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm md:p-8 mt-6">
      <h2 className="mb-4 text-base font-semibold text-slate-900">
        Account Settings
      </h2>

      <div className="flex flex-col gap-4 p-2">
        {/* Email row */}
        <div className="flex flex-col items-start gap-3 py-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border bg-gray-100 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50">
              <Mail className="h-4 w-4 text-slate-500" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-800">
                Email Address
              </p>
              <p className="text-xs text-slate-500">
                {user.email || "example@mail.com"}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            Change Email
          </button>
        </div>

        {/* Password row */}
        <div className="flex flex-col items-start gap-3 py-4 sm:flex-row sm:items-center sm:justify-between rounded-lg border bg-gray-100 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50">
              <Lock className="h-4 w-4 text-slate-500" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-800">Password</p>
              <p className="text-xs text-slate-500">••••••••</p>
            </div>
          </div>
          <button
            type="button"
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            Change Password
          </button>
        </div>
      </div>
    </section>
  );
}
