"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, updateUser } from "@/lib/auth";

import CompletePhoto from "@/components/profileComplete/CompletePhoto";
import CompleteProgress from "@/components/profileComplete/CompleteProgress";
import CompleteProfession from "@/components/profileComplete/CompleteProfession";
import CompleteLocation from "@/components/profileComplete/CompleteLocation";
import CompleteSkills from "@/components/profileComplete/CompleteSkills";
import CompleteBio from "@/components/profileComplete/CompleteBio";

export default function CompleteProfilePage() {
  const router = useRouter();

  const [role, setRole] = useState("");       // STUDENT | PROFESSIONAL
  const [category, setCategory] = useState(""); // student | professional

  const [profession, setProfession] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [skills, setSkills] = useState([]);
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
  async function init() {
    const u = await getCurrentUser();

    console.log("🟢 USER FROM /profile/me:", u);

    if (!u) {
      console.log("❌ No user, redirecting to login");
      router.push("/auth/login");
      return;
    }

    if (u.profileCompleted) {
      console.log("ℹ️ Profile already completed, redirecting to profile");
      router.push("/profile");
      return;
    }

    if (u.role === "STUDENT") {
      console.log("🎓 Detected STUDENT");
      setRole("STUDENT");
      setCategory("student");
    } else if (u.role === "PROFESSIONAL") {
      console.log("💼 Detected PROFESSIONAL");
      setRole("PROFESSIONAL");
      setCategory("professional");
    } else {
      console.error("🚨 INVALID ROLE:", u.role);
    }
  }

  init();
}, []);


  const requiredFields = [
    city,
    state,
    category === "student" ? skills.length > 0 : true,
    category === "professional" ? profession : true,
  ];

  const progress = Math.round(
    (requiredFields.filter(Boolean).length / requiredFields.length) * 100
  );

  const handleSave = async () => {
    try {
      await updateUser(
        {
          city,
          state,
          bio,
          photo,
          ...(category === "student" && { skills }),
          ...(category === "professional" && {
            professionType: profession,
          }),
          profileCompleted: true,
        },
        role
      );

      router.replace("/profile");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert(err.message || "Profile save failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <CompleteProgress progress={progress} />

        <CompletePhoto photo={photo} setPhoto={setPhoto} />

        <CompleteProfession
          category={category}
          profession={profession}
          setProfession={setProfession}
        />

        <CompleteLocation
          city={city}
          state={state}
          setCity={setCity}
          setState={setState}
        />

        {category === "student" && (
          <CompleteSkills skills={skills} setSkills={setSkills} />
        )}

        <CompleteBio bio={bio} setBio={setBio} />

        <button
          type="button"
          onClick={handleSave}
          className="mt-8 w-full rounded-xl bg-cyan-500 py-3 text-sm font-semibold text-white shadow-sm hover:bg-cyan-600"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}
