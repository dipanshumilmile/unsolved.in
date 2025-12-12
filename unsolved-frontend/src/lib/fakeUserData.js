// src/lib/fakeUserData.js
import { getCurrentUser } from "./fakeAuth";

function keyForUser(userId) {
  return `user_data_${userId}`;
}

export function getUserData() {
  const user = getCurrentUser();
  if (!user) return null;

  const key = keyForUser(user.id);
  const raw = localStorage.getItem(key);

  if (!raw) {
    const initial = { savedProblems: [], solvedProblems: [] };
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  }

  return JSON.parse(raw);
}

function setUserData(data) {
  const user = getCurrentUser();
  if (!user) return;
  const key = keyForUser(user.id);
  localStorage.setItem(key, JSON.stringify(data));
}

export function saveProblem(problemId) {
  const data = getUserData();
  if (!data) return;

  if (!data.savedProblems.includes(problemId)) {
    data.savedProblems.push(problemId);
    setUserData(data);
  }
}

export function markProblemSolved(problemId) {
  const data = getUserData();
  if (!data) return;

  if (!data.solvedProblems.includes(problemId)) {
    data.solvedProblems.push(problemId);
  }

  data.savedProblems = data.savedProblems.filter((id) => id !== problemId);
  setUserData(data);
}
