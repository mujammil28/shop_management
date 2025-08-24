// src/context/authcontext.js
import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem("token");
    const r = localStorage.getItem("role");
    const n = localStorage.getItem("name");

    if (t && r) {
      setToken(t);
      setRole(r);
      setName(n || "");
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });

      setToken(data.token);
      setRole(data.role);
      setName(data.name || "");

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name || "");

      return data.role; // 🔑 ensure role is always returned
    } catch (err) {
      throw err.response?.data?.message || "Login failed. Please try again.";
    }
  };

  const signup = async (payload) => {
    try {
      const { data } = await api.post("/auth/signup", payload);
      return data; // 🔑 return response so Signup.js can show success/error
    } catch (err) {
      throw err.response?.data?.message || "Signup failed. Please try again.";
    }
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
    setName(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, role, name, loading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
