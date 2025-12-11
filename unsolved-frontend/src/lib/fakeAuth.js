const USERS_KEY = "fake_users";
const CURRENT_USER_KEY = "current_user";

export function getUsers() {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function setUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function signup({ name, email, password }) {
  const users = getUsers();
  const exists = users.find((u) => u.email === email);
  if (exists) throw new Error("User already exists");

  const newUser = {
  id: Date.now().toString(),
  name,
  email,
  password,
  category: null,
  profession: null,
  city: "",
  state: "",
  skills: [],
  bio: "",
  photo: null,  // 👈 ADD THIS
  createdAt: new Date().toISOString(),
};


  users.push(newUser);
  setUsers(users);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
  return newUser;
}

export function updateUser(updatedData) {
  const users = getUsers();
  const current = getCurrentUser();
  const updatedUser = { ...current, ...updatedData };

  const newUsers = users.map((u) => (u.id === current.id ? updatedUser : u));
  localStorage.setItem(USERS_KEY, JSON.stringify(newUsers));
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
  return updatedUser;
}

export function login({ email, password }) {
  const users = getUsers();
  const user = users.find(
    (u) => u.email === email && u.password === password
  );
  if (!user) throw new Error("Invalid email or password");
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return user;
}

export function getCurrentUser() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(CURRENT_USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CURRENT_USER_KEY);
}
