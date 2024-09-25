import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    role: null,
    shouldLoadUser: true, // Initially set to true since we need to load the user data
  },
  reducers: {
    setCredentials: (state, action) => {
      const accessToken = action.payload?.accessToken || action.payload;
      const userData = action.payload?.data?.user;
      
      console.log(state);
      console.log(userData, 'login data');

      // Only update state if userData is valid
      if (userData) {
        state.accessToken = accessToken;
        state.user = userData.fullName; // Add user data to the state
        state.role = userData.role || "user";
        state.isAuthenticated = true;
        state.shouldLoadUser = false; // Set to false once the user data is loaded
      } else {
        console.error("Invalid user data in setCredentials");
      }
    },

    loadUser: (state, action) => {
      const userData = action.payload?.data?.user;
      console.log(userData, 'check user');

      // Safely handle invalid data
      if (userData) {
        state.user = userData.fullName;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        state.role = userData.role || 'user';
        state.shouldLoadUser = false; // Set to false once the user data is loaded
      } else {
        console.error("Invalid user data in loadUser");
        state.shouldLoadUser = false; // Reset flag if the data is invalid
      }
    },

    triggerLoadUser: (state) => {
      state.shouldLoadUser = true; // Set the flag to true when data needs to be loaded
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.role = null;
      state.shouldLoadUser = false; // Reset the flag on logout
    },
  },
});

export const { setCredentials, loadUser, triggerLoadUser, logout } = authSlice.actions;
export default authSlice.reducer;
