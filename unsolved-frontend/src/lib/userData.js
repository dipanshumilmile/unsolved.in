// src/lib/userData.js
import { api } from './api';
import { getCurrentUser } from './auth';

export async function getUserData() {
  const user = getCurrentUser();
  if (!user) return { savedProblems: [], solvedProblems: [] };
  
  // Replace with real backend endpoint later
  // return await api.getUserData(user.id);
  const data = localStorage.getItem(`user_data_${user.id}`);
  return data ? JSON.parse(data) : { savedProblems: [], solvedProblems: [] };
}

export async function saveProblem(problemId) {
  const data = await getUserData();
  if (!data.savedProblems.includes(problemId)) {
    data.savedProblems.push(problemId);
    await setUserData(data);
  }
}

export async function markProblemSolved(problemId) {
  const data = await getUserData();
  if (!data.solvedProblems.includes(problemId)) {
    data.solvedProblems.push(problemId);
  }
  data.savedProblems = data.savedProblems.filter((id) => id !== problemId);
  await setUserData(data);
}

async function setUserData(data) {
  const user = getCurrentUser();
  if (!user) return;
  localStorage.setItem(`user_data_${user.id}`, JSON.stringify(data));
}
