const API_BASE_URL = "http://localhost:8080";

class ApiService {
  getHeaders() {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async request(endpoint, options = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: this.getHeaders(),
      ...options,
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("token");
        throw new Error("Session expired");
      }
      const err = await response.text();
      throw new Error(err);
    }

    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  }

  async signup(data) {
    const role =
      data.category === "student" ? "STUDENT" : "PROFESSIONAL";

    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        role,
      }),
    });

    if (!res.ok) throw new Error("Signup failed");
    return res.text(); // JWT
  }

  async login(data) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Login failed");
    return res.text(); // JWT
  }

  completeStudentProfile(data) {
    return this.request("/profile/student", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  completeProfessionalProfile(data) {
    return this.request("/profile/professional", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}

export const api = new ApiService();
