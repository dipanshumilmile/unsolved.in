// src/components/auth/LoginForm.jsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/fakeAuth";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    try {
      login({ email, password });
      router.push("/dashboard"); // change later if needed
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <>
      {/* Title */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">
          Welcome back
        </h2>
        <p className="text-sm text-slate-500">
          Enter your credentials to access your account
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700">Email</label>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
            <Mail size={16} className="text-slate-400" />
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full border-none bg-transparent text-sm outline-none placeholder:text-slate-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-slate-700">
              Password
            </label>
            <button
              type="button"
              className="text-[11px] text-sky-600 hover:underline"
              onClick={() => router.push("/auth/forgot-password")}
            >
              Forgot password?
            </button>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
            <Lock size={16} className="text-slate-400" />
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="••••••••"
              className="w-full border-none bg-transparent text-sm outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-xs text-red-500 mt-1">
            {error}
          </p>
        )}

        {/* Sign in button */}
        <button
          type="submit"
          className="mt-3 w-full rounded-lg bg-cyan-500 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-cyan-600"
        >
          Sign In
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3 text-[11px] text-slate-400">
        <div className="h-px flex-1 bg-slate-200" />
        <span>OR CONTINUE WITH</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      {/* Social buttons */}
      <div className="flex gap-3">
        <button className="flex-1 rounded-lg border border-slate-200 bg-white py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50">
          Google
        </button>
        <button className="flex-1 rounded-lg border border-slate-200 bg-white py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50">
          GitHub
        </button>
      </div>

      {/* Bottom text */}
      <p className="mt-6 text-xs text-slate-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/signup"
          className="text-sky-600 font-medium hover:underline"
        >
          Sign up
        </Link>
      </p>
    </>
  );
}
