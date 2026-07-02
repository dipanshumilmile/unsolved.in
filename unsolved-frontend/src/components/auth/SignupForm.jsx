// src/components/auth/SignupForm.jsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { signup } from "@/lib/auth";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await signup({
        name: fullName,
        email,
        password,
        category,
      });

      router.push("/profile/complete");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Title */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">
          Create account
        </h2>
        <p className="text-sm text-slate-500">
          Fill in your details to get started
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full name */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700">
            Full Name
          </label>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
            <User size={16} className="text-slate-400" />
            <input
              type="text"
              required
              placeholder="John Doe"
              className="w-full border-none bg-transparent text-sm outline-none placeholder:text-slate-400"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700">Category</label>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
            <User size={16} className="text-slate-400" />
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-transparent text-sm outline-none text-slate-700"
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="student">Student</option>
              <option value="professional">Professional</option>
            </select>
          </div>
        </div>

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
          <label className="text-xs font-medium text-slate-700">Password</label>
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
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

        {/* Create account button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-3 w-full rounded-lg bg-cyan-500 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-cyan-600 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Creating Account..." : "Create Account"}
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
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="text-sky-600 font-medium hover:underline"
        >
          Sign in
        </Link>
      </p>
    </>
  );
}
