"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getCurrentUser } from "@/lib/fakeAuth";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileSkills from "@/components/profile/ProfileSkills";
import ProfileAccountSettings from "@/components/profile/ProfileAccountSettings";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const u = getCurrentUser();
    if (!u) {
      router.push("/auth/login");
      return;
    }
    setUser(u);
  }, [router]);

  if (!user) return <div className="p-8 text-sm">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-5xl px-4 pb-10 pt-6 md:px-6 md:pt-8">
        <button
          onClick={() => router.push("/dashboard")}
          className="mb-4 flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-slate-900"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </button>

        <ProfileHeader user={user} />
        <ProfileSkills user={user} />
        <ProfileAccountSettings user={user} />
      </main>
    </div>
  );
}
