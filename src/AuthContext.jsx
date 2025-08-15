import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");
  const [username, setUsername] = useState("");
//--
  // TODO: signup
  async function signup(name, password) {
    try {
    const response = await fetch(`${API}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: name, password }),
    });
    const data = await response.json();
    setToken(data.token);
  } catch (error) {
    console.error(error);
  }
  }

  // TODO: authenticate
  async function authenticate() {
    try {
    const response = await fetch(`${API}/authenticate`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
  };

  const value = { location, token, setLocation, username, setUsername, signup, authenticate,  }
//--
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}

