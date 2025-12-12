"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, updateUser } from "@/lib/fakeAuth";
import CompletePhoto from "@/components/profileComplete/CompletePhoto";


import CompleteProgress from "@/components/profileComplete/CompleteProgress";
import CompleteCategory from "@/components/profileComplete/CompleteCategory";
import CompleteProfession from "@/components/profileComplete/CompleteProfession";
import CompleteLocation from "@/components/profileComplete/CompleteLocation";
import CompleteSkills from "@/components/profileComplete/CompleteSkills";
import CompleteBio from "@/components/profileComplete/CompleteBio";

export default function CompleteProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const [category, setCategory] = useState("");
  const [profession, setProfession] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [skills, setSkills] = useState([]);
    const [bio, setBio] = useState("");
    const [photo, setPhoto] = useState("");


  useEffect(() => {
    const u = getCurrentUser();
    if (!u) return router.push("/auth/login");
    if (u.category) return router.push("/profile");
    setUser(u);
  }, []);

  if (!user) return <div className="p-6 text-sm">Loading...</div>;

  // Progress Logic
  const requiredFields = [
  category,
  category === "professional" ? profession : true,
  city,
  state,
  category === "student" ? skills.length > 0 : true,
];

  const filled = requiredFields.filter(Boolean).length;
  const progress = Math.round((filled / requiredFields.length) * 100);

  const handleSave = () => {
    if (progress < 100) return alert("Please fill required fields!");
    updateUser({
    category,
    profession: category === "student" ? "B.Tech" : profession,
    city,
    state,
    skills: category === "student" ? skills : [],
    bio,
    photo,
  });

    router.push("/profile");
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-xl font-bold text-slate-900">
          Complete Your Profile ✨
        </h1>
        <p className="mb-6 text-sm text-slate-600">
          Tell us more about yourself to personalize your experience!
        </p>

        <CompleteProgress progress={progress} />
              <div className="space-y-6">
                  <CompletePhoto photo={photo} setPhoto={setPhoto} />

          <CompleteCategory category={category} setCategory={setCategory} />
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
        </div>

        <button
          onClick={handleSave}
          className="mt-8 w-full rounded-xl bg-cyan-500 py-3 text-sm font-semibold text-white shadow-sm hover:bg-cyan-600"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}
