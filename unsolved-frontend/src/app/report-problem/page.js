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
import { api } from "@/lib/api";

export default function Page() {
  const router = useRouter();

  // Step control
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const isLastStep = currentStep === totalSteps;

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [city, setCity] = useState("");
  const [stateValue, setStateValue] = useState("");

  const [user, setUser] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Authentication
  useEffect(() => {
    async function checkUser() {
      const currentUser = await getCurrentUser();

      if (!currentUser) {
        router.replace("/auth/login?next=/report-problem");
        return;
      }

      setUser(currentUser);
    }

    checkUser();
  }, [router]);

  // Submit Problem
  const handleSubmitProblem = async () => {
    if (submitting) return;

    if (title.trim().length < 5) {
      return toast.error("Title must be at least 5 characters.");
    }

    if (description.trim().length < 40) {
      return toast.error("Description must be at least 40 characters.");
    }

    if (!city.trim() || !stateValue.trim()) {
      return toast.error("Please provide both city and state.");
    }

    try {
      setSubmitting(true);

      await api.createProblem({
        title: title.trim(),
        description: description.trim(),
        city: city.trim(),
        state: stateValue.trim(),
        tags,
      });

      toast.success("Problem submitted successfully!");

      router.replace("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to submit problem.");
    } finally {
      setSubmitting(false);
    }
  };

  // Next button
  const handleNextClick = () => {
    if (currentStep === 1) {
      if (title.trim().length < 5) {
        return toast.error("Title must be at least 5 characters.");
      }
    }

    if (currentStep === 2) {
      if (description.trim().length < 40) {
        return toast.error(
          "Description must be at least 40 characters."
        );
      }
    }

    if (currentStep === 3) {
      if (!city.trim() || !stateValue.trim()) {
        return toast.error("Please provide both city and state.");
      }
    }

    if (isLastStep) {
      handleSubmitProblem();
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  if (!user) {
    return (
      <p className="p-6 text-sm text-gray-500">
        Checking authentication...
      </p>
    );
  }

  const locationForReview =
    city || stateValue
      ? `${city}${city && stateValue ? ", " : ""}${stateValue}`
      : "";

  return (
    <div>
      <HeadingOfPage />

      <ReportProgressBar currentStep={currentStep} />

      {currentStep === 1 && (
        <TitleBoxDetail
          title={title}
          onChange={setTitle}
        />
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
        <TagBoxDetail
          selectedTags={tags}
          onChange={setTags}
        />
      )}

      {currentStep === 5 && (
        <ReviewDetails
          title={title}
          description={description}
          location={locationForReview}
          tags={tags}
        />
      )}

      <div className="mx-auto mt-6 flex max-w-4xl justify-between">
        <button
          disabled={currentStep === 1 || submitting}
          onClick={() => setCurrentStep((prev) => prev - 1)}
          className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40"
        >
          Back
        </button>

        <button
          disabled={submitting}
          onClick={handleNextClick}
          className="rounded-lg bg-teal-500 px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          {isLastStep
            ? submitting
              ? "Submitting..."
              : "Submit Problem"
            : "Next"}
        </button>
      </div>
    </div>
  );
}