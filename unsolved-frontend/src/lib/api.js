const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

class ApiService {

  // =========================================================
  // INTERNAL METHODS
  // =========================================================

  /**
   * Returns default headers for every authenticated request.
   * Used internally by request().
   */
  getHeaders() {
    let token = null;

    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }

    return {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  /**
   * Generic request wrapper.
   *
   * Used by almost every API call in this file.
   * Handles:
   * - Authorization header
   * - JSON parsing
   * - Error handling
   * - Session expiration
   */
 async request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...this.getHeaders(),
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("token");
      throw new Error("Session expired");
    }

    const errorText = await response.text();

    console.error("==================================");
    console.error("API ERROR");
    console.error("URL:", `${API_BASE_URL}${endpoint}`);
    console.error("Status:", response.status);
    console.error("Response:", errorText);
    console.error("==================================");

    throw new Error(errorText || `HTTP ${response.status}`);
  }

  const text = await response.text();

  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

  // =========================================================
  // AUTHENTICATION
  // =========================================================

  /**
   * Registers a new user.
   *
   * Used in:
   * SignupForm.jsx
   */
  async signup(data) {
    const role =
      data.category === "student"
        ? "STUDENT"
        : "PROFESSIONAL";

    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        role,
      }),
    });

    if (!res.ok) throw new Error("Signup failed");

    return res.text();
  }

  /**
   * Logs a user in.
   *
   * Used in:
   * LoginForm.jsx
   */
async login(data) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.text();
    console.error("Login Error:", error);
    throw new Error(error || "Login failed");
  }

  return res.text();
}

  // =========================================================
  // PROFILE
  // =========================================================

  /**
   * Completes student profile.
   *
   * Used in:
   * Profile Completion Page
   */
  completeStudentProfile(data) {
    return this.request("/profile/student", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  /**
   * Completes professional profile.
   *
   * Used in:
   * Profile Completion Page
   */
  completeProfessionalProfile(data) {
    return this.request("/profile/professional", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // =========================================================
  // PROBLEMS
  // =========================================================

  /**
   * Creates a new problem.
   *
   * Used in:
   * Report Problem Page
   */
  createProblem(data) {
    return this.request("/problems", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  /**
   * Returns a single problem.
   *
   * Used in:
   * Problem Detail Page
   * Claim Problem Page
   */
  getProblem(problemId) {
    return this.request(`/problems/${problemId}`);
  }

  /**
   * Returns all problems created by current user.
   *
   * Used in:
   * MyProblemsList.jsx
   */
  getMyProblems() {
    return this.request("/problems/me");
  }

  // =========================================================
  // SAVED PROBLEMS
  // =========================================================

  /**
   * Saves a problem.
   *
   * Used in:
   * Problem Card
   * Problem Detail
   */
  saveProblem(problemId) {
    return this.request(`/saved/${problemId}`, {
      method: "POST",
    });
  }

  /**
   * Removes a saved problem.
   *
   * Used in:
   * Problem Card
   * Problem Detail
   */
  unsaveProblem(problemId) {
    return this.request(`/saved/${problemId}`, {
      method: "DELETE",
    });
  }

  /**
   * Returns all saved problems.
   *
   * Used in:
   * Dashboard
   */
  getSavedProblems() {
    return this.request("/saved");
  }

  // =========================================================
  // SOLUTIONS
  // =========================================================

  /**
   * Submits a solution.
   *
   * Used in:
   * Submit Solution Page
   */
  submitSolution(data) {
    return this.request("/solutions", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  /**
   * Returns current user's submitted solutions.
   *
   * Used in:
   * SubmissionList.jsx
   */
  getMySolutions() {
    return this.request("/solutions/me");
  }

  /**
   * Returns total submitted solution count.
   *
   * Used in:
   * Dashboard Stats (future)
   */
  getMySubmissionCount() {
    return this.request("/solutions/me/count");
  }

  /**
   * Returns all solutions for a problem.
   *
   * Used in:
   * Problem Owner Dashboard
   */
  getSolutions(problemId) {
    return this.request(`/solutions/problem/${problemId}`);
  }

  /**
   * Accepts a submitted solution.
   *
   * Used in:
   * SolutionCard.jsx
   */
  acceptSolution(solutionId) {
    return this.request(
      `/solutions/${solutionId}/accept`,
      {
        method: "POST",
      }
    );
  }

  // =========================================================
  // DASHBOARD
  // =========================================================

  /**
   * Returns dashboard statistics.
   *
   * Used in:
   * StatsSection.jsx
   */
  getDashboardStats() {
    return this.request("/dashboard/stats");
  }

  /**
   * Returns platform-wide statistics.
   *
   * Used in:
   * Home Page
   */
  getPlatformStats() {
    return this.request("/dashboard/platform-stats");
  }
}

export const api = new ApiService();