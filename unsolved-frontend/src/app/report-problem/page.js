"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import HeadingOfPage from "@/components/report-problem/HeadingOfPage";
import ReportProgressBar from "@/components/report-problem/ReportProgressBar";
import TitleBoxDetail from "@/components/report-problem/TitleBoxDetail";
import DescriptionBoxDetail from "@/components/report-problem/DescriptionBoxDetail";
import TagBoxDetail from "@/components/report-problem/TagBoxDetail";
import SeverityBoxDetail from "@/components/report-problem/SeverityBoxDetail";
import ReviewDetails from "@/components/report-problem/ReviewDetails";
import LocationBoxDetail from "@/components/report-problem/LocationBoxDetail";

import { getCurrentUser } from "@/lib/fakeAuth";

export default function Page() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);

  // NEW LOCATION STATES
  const [city, setCity] = useState("");
  const [stateValue, setStateValue] = useState("");

  const [severity, setSeverity] = useState("");

  const [user, setUser] = useState(null);
  const totalSteps = 6;
  const isLastStep = currentStep === totalSteps;

  useEffect(() => {
    const u = getCurrentUser();
    if (!u) {
      router.push(`/auth/login?next=/report-problem`);
      return;
    }
    setUser(u);
  }, [router]);

  const loadProblemsFromStorage = () => {
    try {
      const raw = localStorage.getItem("problems");
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const saveProblemsToStorage = (arr) => {
    localStorage.setItem("problems", JSON.stringify(arr));
  };

  const initialsFromName = (name = "") => {
    if (!name) return "";
    const p = name.trim().split(" ");
    if (p.length === 1) return p[0].slice(0, 2).toUpperCase();
    return (p[0][0] + p[p.length - 1][0]).toUpperCase();
  };

  const handleSubmitProblem = () => {
    if (!title.trim()) return toast.error("Please add a title");
    if (!description.trim()) return toast.error("Please add a description");
    if (!city.trim() || !stateValue.trim())
      return toast.error("Please provide both city and state");
    if (!severity) return toast.error("Please select severity");

    const reporter = getCurrentUser() || user;
    if (!reporter) {
      toast.error("You must be signed in to submit a problem");
      return router.push(`/auth/login?next=/report-problem`);
    }

    const problems = loadProblemsFromStorage();

    const newProblem = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      tags,
      severity,
      city: city.trim(),
      state: stateValue.trim(),
      location: `${city.trim()}, ${stateValue.trim()}`,
      status: "Open",
      votes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
      reporterId: reporter.id,
      author: reporter.name,
      authorInitials: initialsFromName(reporter.name),
    };

    saveProblemsToStorage([newProblem, ...problems]);

    toast.success("Problem Submitted!", { duration: 2000 });

    setTimeout(() => router.push("/dashboard"), 700);
  };

  const handleNextClick = () => {
    if (currentStep === 1 && !title.trim())
      return toast.error("Enter a title");
    if (currentStep === 2 && !description.trim())
      return toast.error("Enter a description");
    if (currentStep === 4 && (!city.trim() || !stateValue.trim()))
      return toast.error("Enter both city and state");
    if (currentStep === 5 && !severity)
      return toast.error("Select severity");

    if (isLastStep) return handleSubmitProblem();

    setCurrentStep((s) => s + 1);
  };

  if (!user) return <p className="p-6 text-sm">Checking authentication...</p>;

  // For Review Step
  const locationForReview =
    city || stateValue ? `${city}${city && stateValue ? ", " : ""}${stateValue}` : "";

  return (
    <div>
      <HeadingOfPage />
      <ReportProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      {currentStep === 1 && (
        <TitleBoxDetail title={title} onChange={setTitle} />
      )}

      {currentStep === 2 && (
        <DescriptionBoxDetail
          description={description}
          onChange={setDescription}
        />
      )}
      {currentStep === 3 && (
        <LocationBoxDetail
          city={city}
          state={stateValue}
          onCityChange={setCity}
          onStateChange={setStateValue}
        />
      )}

      {currentStep === 4 && (
        <TagBoxDetail selectedTags={tags} onChange={setTags} />
      )}

      

      {currentStep === 5 && (
        <SeverityBoxDetail severity={severity} onChange={setSeverity} />
      )}

      {currentStep === 6 && (
        <ReviewDetails
          title={title}
          description={description}
          tags={tags}
          location={locationForReview}
          severity={severity}
        />
      )}

      <div className="mt-6 flex justify-between max-w-4xl mx-auto">
        <button
          disabled={currentStep === 1}
          onClick={() => setCurrentStep((s) => s - 1)}
          className="px-4 py-2 text-sm border rounded-lg disabled:opacity-40"
        >
          Back
        </button>

        <button
          onClick={handleNextClick}
          className="px-4 py-2 text-sm bg-teal-500 text-white rounded-lg"
        >
          {isLastStep ? "Submit Problem" : "Next"}
        </button>
      </div>
    </div>
  );
}
