"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import HeadingOfPage from "@/components/report-problem/HeadingOfPage";
import ReportProgressBar from "@/components/report-problem/ReportProgressBar";
import TitleBoxDetail from "@/components/report-problem/TitleBoxDetail";
import DescriptionBoxDetail from "@/components/report-problem/DescriptionBoxDetail";
import TagBoxDetail from "@/components/report-problem/TagBoxDetail";
import ReviewDetails from "@/components/report-problem/ReviewDetails";
import LocationBoxDetail from "@/components/report-problem/LocationBoxDetail";

import { getCurrentUser } from "@/lib/auth";

export default function Page() {
const router = useRouter();

// STEP CONTROL
const [currentStep, setCurrentStep] = useState(1);
const totalSteps = 5;
const isLastStep = currentStep === totalSteps;

// FORM STATES
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [tags, setTags] = useState([]);

const [city, setCity] = useState("");
const [stateValue, setStateValue] = useState("");

const [user, setUser] = useState(null);

// AUTH CHECK
useEffect(() => {
const u = getCurrentUser();
if (!u) {
router.push(`/auth/login?next=/report-problem`);
return;
}
setUser(u);
}, [router]);

// FINAL SUBMIT (API CALL)
  const handleSubmitProblem = async () => {
  const token = localStorage.getItem("token");
// VALIDATIONS
if (!title.trim()) {
return toast.error("Please add a title");
}


if (!description.trim()) {
  return toast.error("Please add a description");
}

if (!city.trim() || !stateValue.trim()) {
  return toast.error("Please provide both city and state");
}

try {
  const response = await fetch("http://localhost:8080/problems", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: title.trim(),
      description: description.trim(),
      city: city.trim(),
      state: stateValue.trim(),
      tags,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to create problem");
  }

  toast.success("Problem Submitted 🚀");

  setTimeout(() => {
    router.push("/dashboard");
  }, 700);
} catch (error) {
  console.error("Error submitting problem:", error);
  toast.error("Something went wrong while submitting");
}


};

// STEP NAVIGATION
const handleNextClick = () => {
if (currentStep === 1 && !title.trim()) {
return toast.error("Enter a title");
}


if (currentStep === 2 && !description.trim()) {
  return toast.error("Enter a description");
}

if (currentStep === 3 && (!city.trim() || !stateValue.trim())) {
  return toast.error("Enter both city and state");
}

if (isLastStep) {
  handleSubmitProblem();
  return;
}

setCurrentStep((prev) => prev + 1);


};

if (!user) {
return <p className="p-6 text-sm">Checking authentication...</p>;
}

// REVIEW LOCATION FORMAT
const locationForReview =
city || stateValue
? `${city}${city && stateValue ? ", " : ""}${stateValue}`
: "";

return ( <div> <HeadingOfPage />


  <ReportProgressBar currentStep={currentStep} totalSteps={totalSteps} />

  {/* STEP 1: TITLE */}
  {currentStep === 1 && (
    <TitleBoxDetail title={title} onChange={setTitle} />
  )}

  {/* STEP 2: DESCRIPTION */}
  {currentStep === 2 && (
    <DescriptionBoxDetail
      description={description}
      onChange={setDescription}
    />
  )}

  {/* STEP 3: LOCATION */}
  {currentStep === 3 && (
    <LocationBoxDetail
      city={city}
      state={stateValue}
      onCityChange={setCity}
      onStateChange={setStateValue}
    />
  )}

  {/* STEP 4: TAGS */}
  {currentStep === 4 && (
    <TagBoxDetail selectedTags={tags} onChange={setTags} />
  )}

  {/* STEP 5: REVIEW */}
  {currentStep === 5 && (
    <ReviewDetails
      title={title}
      description={description}
      tags={tags}
      location={locationForReview}
    />
  )}

  {/* BUTTONS */}
  <div className="mt-6 flex justify-between max-w-4xl mx-auto">
    <button
      disabled={currentStep === 1}
      onClick={() => setCurrentStep((prev) => prev - 1)}
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
