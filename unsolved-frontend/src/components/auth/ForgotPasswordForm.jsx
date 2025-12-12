// src/components/auth/ForgotPasswordForm.jsx
"use client";

import React from "react";
import Link from "next/link";
import { Mail } from "lucide-react";

export default function ForgotPasswordForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: hook this to real password reset flow later
    console.log("Password reset request submitted");
  };

  return (
    <>
      {/* Title */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">
          Forgot password?
        </h2>
        <p className="text-sm text-slate-500">
          Enter the email associated with your account and we&apos;ll send you a
          link to reset your password.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700">Email</label>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
            <Mail size={16} className="text-slate-400" />
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full border-none bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-3 w-full rounded-lg bg-cyan-500 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-cyan-600"
        >
          Send reset link
        </button>
      </form>

      {/* Bottom links */}
      <p className="mt-6 text-xs text-slate-500">
        Remembered your password?{" "}
        <Link
          href="/auth/login"
          className="text-sky-600 font-medium hover:underline"
        >
          Back to sign in
        </Link>
      </p>

      <p className="mt-2 text-xs text-slate-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/signup"
          className="text-sky-600 font-medium hover:underline"
        >
          Create account
        </Link>
      </p>
    </>
  );
}
