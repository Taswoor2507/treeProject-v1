import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../treeSlice/TreeSlice";
import axiosInstance from "@/axiosCofig/axiosInstance";

const UserSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    user: {},
    status: STATUSES.idle,
  },
  reducers: {
    setUserStatus: (state, action) => {
      state.status = action.payload;
    },
    getUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setUserStatus, getUsers } = UserSlice.actions;
export default UserSlice.reducer;

export const userThunk = () => {
  return async (dispatch) => {
    try {
      dispatch(setUserStatus(STATUSES.loading)); // Dispatch loading state
      
      const  req  = await axiosInstance.get("/users/all"); // Directly extract data
      const response =  req.data
      console.log("fetch all users", response);

      dispatch(getUsers(response));
      dispatch(setUserStatus(STATUSES.idle));
    } catch (error) {
      console.error("Error fetching users:", error); // Log the error for debugging
      dispatch(setUserStatus(STATUSES.error));
    }
  };
};
