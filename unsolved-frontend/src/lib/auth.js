import { api } from "./api";

export async function signup({ name, email, password, category }) {
  const token = await api.signup({ name, email, password, category });
  localStorage.setItem("token", token);
  return getCurrentUser();
}

export async function login({ email, password }) {
  const token = await api.login({ email, password });
  localStorage.setItem("token", token);

  return await api.request("/profile/me");
}

export async function getCurrentUser() {
  if (typeof window === "undefined") {
    return null;
  }

  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    return await api.request("/profile/me");
  } catch {
    localStorage.removeItem("token");
    return null;
  }
}

/**
 * 🔥 IMPORTANT:
 * Role is PASSED IN — never re-fetched here.
 */
export async function updateUser(data, role) {
  if (role === "STUDENT") {
    return api.completeStudentProfile(data);
  }

  if (role === "PROFESSIONAL") {
    return api.completeProfessionalProfile(data);
  }

  throw new Error("Invalid role");
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
}

export function isAuthenticated() {
  if (typeof window === "undefined") {
    return false;
  }

  return !!localStorage.getItem("token");
}
