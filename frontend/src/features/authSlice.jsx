import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Initialize user to null
  token: localStorage.getItem("token") || null, // Initialize token from localStorage if available
  isAuthenticated: !!localStorage.getItem("token"), // Check if the token exists to set authentication state
};

// Helper function to safely parse JSON from localStorage
const getParsedUserFromLocalStorage = () => {
  try {
    const user = localStorage.getItem("user");
    if (user && user !== "undefined") {
      return JSON.parse(user); // Only parse if 'user' is not "undefined"
    }
    return null; // Return null if 'user' is undefined or doesn't exist
  } catch (e) {
    console.error("Error parsing user from localStorage", e);
    return null; // Return null if there's an error parsing
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getParsedUserFromLocalStorage(), // Safely parse the user
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
  },
  reducers: {
    login: (state, { payload }) => {
      const { user, token } = payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      // Store user and token in localStorage for persistence
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      // Remove user and token from localStorage on logout
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    setAuthFromStorage: (state) => {
      // Helper action to set the state when app loads based on localStorage
      const storedUser = getParsedUserFromLocalStorage();
      const storedToken = localStorage.getItem("token");

      if (storedToken && storedUser) {
        state.user = storedUser;
        state.token = storedToken;
        state.isAuthenticated = true;
      }
    },
  },
});

export const { login, logout, setAuthFromStorage } = authSlice.actions;

export default authSlice.reducer;
