import { createSlice } from "@reduxjs/toolkit";

// Helper function to load user data from localStorage (parsed as JSON)
const loadUserFromLocalStorage = () => {
  try {
    const serializedUser = localStorage.getItem("user");
    return serializedUser ? JSON.parse(serializedUser) : {}; // Return parsed object or empty object
  } catch (err) {
    console.error("Error loading user from localStorage", err);
    return {}; // Return empty object on error
  }
};

// Helper function to load token from localStorage (as a string)
const loadTokenFromLocalStorage = () => {
  try {
    return localStorage.getItem("token") || ""; // Return token as a string
  } catch (err) {
    console.error("Error loading token from localStorage", err);
    return ""; // Return empty string on error
  }
};

// Helper function to save data to localStorage
const saveToLocalStorage = (key, value) => {
  try {
    const serializedValue = typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (err) {
    console.error("Error saving to localStorage", err);
  }
};

// Helper function to remove data from localStorage
const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error("Error removing from localStorage", err);
  }
};

// Load user and token from localStorage
const initialUser = loadUserFromLocalStorage();
const initialToken = loadTokenFromLocalStorage();

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    user: initialUser, // Load user from localStorage
    token: initialToken, // Load token from localStorage
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload; // Set user data
      saveToLocalStorage("user", action.payload); // Save user to localStorage
    },
    setToken: (state, action) => {
      state.token = action.payload; // Set token
      saveToLocalStorage("token", action.payload); // Save token to localStorage
    },
    logout: (state) => {
      state.user = {}; // Clear user data
      state.token = ""; // Clear token
      removeFromLocalStorage("user"); // Remove user from localStorage
      removeFromLocalStorage("token"); // Remove token from localStorage
    }
  }
});

export const { login, setToken, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
